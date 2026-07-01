// Brosin OS — Cloudflare Pages middleware
// Atiende el proxy de IA en la ruta nueva (/api/claude) y también en la
// antigua (/.netlify/functions/claude), para que la app funcione sin tocar el index.html.
function json(obj, status) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}

async function handleClaude(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return json({ error: { message: "Bad JSON" } }, 400);
  }
  const { messages, system, max_tokens, key } = payload || {};
  const apiKey = key || env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ error: { message: "No API key" } }, 400);
  const body = { model: "claude-sonnet-5", max_tokens: max_tokens || 1200, messages: messages || [] };
  if (system) body.system = system;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify(body),
    });
    const text = await r.text();
    return new Response(text, { status: r.status, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return json({ error: { message: "Proxy error: " + String(e) } }, 502);
  }
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const p = url.pathname;
  if (request.method === "POST" && (p === "/api/claude" || p === "/.netlify/functions/claude")) {
    return handleClaude(request, env);
  }
  return context.next();
}
