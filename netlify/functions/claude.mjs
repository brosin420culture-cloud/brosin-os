// Brosin OS — proxy a Anthropic (evita el bloqueo CORS del navegador móvil)
export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: { message: "Method not allowed" } }), { status: 405, headers: { "Content-Type": "application/json" } });
  }
  let payload;
  try { payload = await req.json(); } catch (e) {
    return new Response(JSON.stringify({ error: { message: "Bad JSON" } }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  const { messages, system, model, max_tokens, key } = payload || {};
  const apiKey = key || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: { message: "No API key" } }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  const body = { model: model || "claude-sonnet-4-20250514", max_tokens: max_tokens || 1200, messages: messages || [] };
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
    return new Response(JSON.stringify({ error: { message: "Proxy error: " + String(e) } }), { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
