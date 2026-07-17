// Brosin OS — /api/tick : lo llama Supabase (pg_cron) cada minuto.
// Busca recordatorios que toca avisar y manda un "push" al móvil (aunque la app esté cerrada).
// Push SIN payload (solo despierta al móvil); el service-worker pide el texto a /api/pending.

const enc = new TextEncoder();
const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64urlToBytes = (s) => { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; const bin = atob(s); const a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; };

async function importVapidKey(env) {
  const pub = b64urlToBytes(env.VAPID_PUBLIC); // 65 bytes: 0x04 + X(32) + Y(32)
  const x = b64url(pub.slice(1, 33));
  const y = b64url(pub.slice(33, 65));
  return crypto.subtle.importKey("jwk", { kty: "EC", crv: "P-256", d: env.VAPID_PRIVATE, x, y, ext: true }, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
}
async function vapidHeaders(env, key, endpoint) {
  const aud = new URL(endpoint).origin;
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(enc.encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const payload = b64url(enc.encode(JSON.stringify({ aud, exp: now + 12 * 3600, sub: env.VAPID_SUBJECT || "mailto:brosin420culture@gmail.com" })));
  const signingInput = header + "." + payload;
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, enc.encode(signingInput));
  const jwt = signingInput + "." + b64url(sig);
  return { "Authorization": `vapid t=${jwt}, k=${env.VAPID_PUBLIC}`, "TTL": "1800" };
}

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

export async function onRequestPost(context) {
  const { request, env } = context;
  if ((request.headers.get("x-tick-secret") || "") !== (env.TICK_SECRET || "")) {
    return new Response("no", { status: 401 });
  }
  try {
    const nowISO = new Date().toISOString();
    // 1) recordatorios que ya toca (no enviados)
    const dueRes = await sb(env, `reminders?select=id,user_id&sent=eq.false&fire_at=lte.${encodeURIComponent(nowISO)}&limit=200`);
    const due = dueRes.ok ? await dueRes.json() : [];
    if (!due.length) return new Response(JSON.stringify({ ok: true, sent: 0 }), { headers: { "Content-Type": "application/json" } });

    const ids = [...new Set(due.map((r) => r.id))];
    const users = [...new Set(due.map((r) => r.user_id))];

    // 2) marcarlos como enviados (y pendientes de mostrar)
    await sb(env, `reminders?id=in.(${ids.join(",")})`, "PATCH", { sent: true, shown: false });

    // 3) suscripciones de esos usuarios
    const subsRes = await sb(env, `push_subs?select=endpoint,user_id&user_id=in.(${users.map((u) => `"${u}"`).join(",")})`);
    const subs = subsRes.ok ? await subsRes.json() : [];

    // 4) enviar push (sin payload) a cada dispositivo
    const key = await importVapidKey(env);
    let sent = 0;
    for (const s of subs) {
      try {
        const headers = await vapidHeaders(env, key, s.endpoint);
        const r = await fetch(s.endpoint, { method: "POST", headers });
        if (r.status === 404 || r.status === 410) {
          await sb(env, `push_subs?endpoint=eq.${encodeURIComponent(s.endpoint)}`, "DELETE");
        } else if (r.ok || r.status === 201) {
          sent++;
        }
      } catch (e) {}
    }
    return new Response(JSON.stringify({ ok: true, due: ids.length, sent }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
