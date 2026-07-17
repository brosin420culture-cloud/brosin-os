// Brosin OS — Cloudflare Pages Function: proxy a Anthropic
// Ruta pública: /api/claude  (mismo origen que la app => sin problemas de CORS)
function json(obj, status) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return json({ error: { message: "Bad JSON" } }, 400);
  }
  const { messages, system, max_tokens, key } = payload || {};
  const apiKey = key || env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({ error: { message: "No API key" } }, 400);
  }
  // El servidor decide el modelo (se actualiza aquí, en un solo sitio).
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

// Comprobación rápida en el navegador (GET) para ver que el ayudante está vivo.
export async function onRequestGet() {
  return json({ ok: true, service: "brosin-claude-proxy", host: "cloudflare" }, 200);
}
