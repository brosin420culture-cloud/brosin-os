// Brosin OS — /api/pending : lo llama el service-worker al recibir un push.
// Devuelve los recordatorios pendientes de mostrar para ese dispositivo y los marca como mostrados.
function sb(env, path, method, body) {
  return fetch(`${env.SUPABASE_URL}/rest/v1/${path}`, {
    method: method || "GET",
    headers: {
      "apikey": env.SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
const json = (o) => new Response(JSON.stringify(o), { headers: { "Content-Type": "application/json" } });

export async function onRequestPost(context) {
  const { request, env } = context;
  let body; try { body = await request.json(); } catch (e) { return json({ items: [] }); }
  const endpoint = body && body.endpoint;
  if (!endpoint) return json({ items: [] });
  try {
    const subRes = await sb(env, `push_subs?select=user_id&endpoint=eq.${encodeURIComponent(endpoint)}&limit=1`);
    const subs = subRes.ok ? await subRes.json() : [];
    if (!subs.length) return json({ items: [] });
    const uid = subs[0].user_id;
    const remRes = await sb(env, `reminders?select=id,title,body&user_id=eq.${uid}&sent=eq.true&shown=eq.false&order=fire_at.asc&limit=20`);
    const rem = remRes.ok ? await remRes.json() : [];
    if (rem.length) {
      const ids = rem.map((r) => r.id);
      await sb(env, `reminders?id=in.(${ids.join(",")})`, "PATCH", { shown: true });
    }
    return json({ items: rem.map((r) => ({ title: r.title, body: r.body, tag: String(r.id) })) });
  } catch (e) {
    return json({ items: [] });
  }
}
