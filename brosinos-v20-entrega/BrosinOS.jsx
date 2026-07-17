import React, { useReducer, useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Home, CalendarDays, Wallet, Package, Brain, Plus, Check, X, Bell,
  Target, TrendingUp, TrendingDown, HandCoins, Boxes, StickyNote,
  Pin, Trash2, ChevronRight, ChevronLeft, Lock, Sparkles, Send,
  Clock, ArrowUpRight, ArrowDownRight, Coins, Landmark, Gift,
  Pencil, Star, Flag, Delete, RefreshCcw, Settings, Sun, Moon,
  Camera, Image as ImageIcon, BarChart3, BellRing, Maximize2, PieChart,
  Car, Smartphone, Activity, Gauge, Watch, Phone, MessageCircle, Power,
  Hourglass, LineChart, ArrowUp, ArrowDown, Copy, Zap,
  Users, Share2, Download, UserPlus, ClipboardList,
  Mic, Volume2, Calculator, Utensils, Receipt, Square, Lightbulb,
  Cake, Heart, Quote,
} from "lucide-react";

/* ============================================================
   BROSIN OS — Tu segundo cerebro
   Bro, no te quedes sin.
   Single-file React artifact · default export · no props
   ============================================================ */

/* ---------- Brand tokens (tema noche / claro) ----------
   C es mutable: applyTheme() vuelca la paleta activa sobre él (y sobre los
   átomos de estilo capturados a nivel de módulo) en cada render del root.
   C.ink es SIEMPRE tinta oscura (texto/iconos sobre amarillo); el fondo de
   página es C.bg0 y las superficies hundidas C.well. */
const DARK = {
  mode: "dark",
  yellow: "#FFD400",
  purple: "#9013FE",
  ink: "#0d0d0d",
  ink2: "#141414",
  ink3: "#1c1c1c",
  line: "#262626",
  cream: "#f4f1ea",
  textHi: "#ffffff",
  textLo: "#9a9a9a",
  good: "#3ddc84",
  bad: "#ff5c5c",
  bg0: "#0a0a0a",
  well: "#0c0c0c",
  outer: "#000000",
  surf: "linear-gradient(180deg,#181818 0%,#131313 100%)",
  surfDeep: "linear-gradient(160deg,#1a1a1a 0%,#101010 100%)",
  surfSheet: "linear-gradient(180deg,#1a1a1a 0%,#111111 100%)",
  surfBtn: "linear-gradient(180deg,#232323 0%,#191919 100%)",
  tileTool: "linear-gradient(180deg,#1e1e1e 0%,#151515 100%)",
  btnDark: "linear-gradient(180deg,#242424 0%,#1a1a1a 60%,#151515 100%)",
  keyNum: "linear-gradient(180deg,#1f1f1f 0%,#141414 100%)",
  keyOp: "linear-gradient(180deg,#2a2a2a 0%,#1d1d1d 100%)",
  keyPin: "linear-gradient(180deg,#212121 0%,#161616 100%)",
  glass: "rgba(8,8,8,.8)",
  edge: "rgba(255,255,255,.07)",
  edgeHi: "rgba(255,255,255,.13)",
  edgeSoft: "rgba(255,255,255,.03)",
  rail: "rgba(0,0,0,.45)",
  keycapIn: "rgba(0,0,0,.42)",
  dropBtn: "rgba(0,0,0,.4)",
  dropSheet: "rgba(0,0,0,.55)",
  wellShadow: "0 2px 5px rgba(0,0,0,.4) inset, 0 1px 0 rgba(255,255,255,.04)",
  shadCard: "0 1px 0 rgba(255,255,255,.05) inset, 0 1px 2px rgba(0,0,0,.5), 0 10px 26px rgba(0,0,0,.34)",
  shadBtn: "0 1px 0 rgba(255,255,255,.07) inset, 0 -1.5px 0 rgba(0,0,0,.35) inset, 0 3px 8px rgba(0,0,0,.35)",
  tintY: "linear-gradient(135deg,#211b00 0%,#131313 70%)",
  tintP: "linear-gradient(135deg,#1c0d31 0%,#131313 65%)",
  tintG: "linear-gradient(135deg,#0f2016 0%,#131313 70%)",
  accentText: "#FFD400",
};
const LIGHT = {
  mode: "light",
  yellow: "#FFD400",
  purple: "#9013FE",
  ink: "#0d0d0d",
  ink2: "#f1ecdf",
  ink3: "#e8e1cf",
  line: "#ddd5c2",
  cream: "#f4f1ea",
  textHi: "#1b1708",
  textLo: "#6f6851",
  good: "#1fa860",
  bad: "#e04444",
  bg0: "#f4f1ea",
  well: "#eae4d3",
  outer: "#e3dcc9",
  surf: "linear-gradient(180deg,#fffdf6 0%,#f7f2e4 100%)",
  surfDeep: "linear-gradient(160deg,#fffdf6 0%,#f2ecdb 100%)",
  surfSheet: "linear-gradient(180deg,#fdfaf2 0%,#f3eee0 100%)",
  surfBtn: "linear-gradient(180deg,#fffef9 0%,#efe9d9 100%)",
  tileTool: "linear-gradient(180deg,#fffef8 0%,#eee8d7 100%)",
  btnDark: "linear-gradient(180deg,#fbf7ec 0%,#e9e2cf 100%)",
  keyNum: "linear-gradient(180deg,#ffffff 0%,#f1ebdc 100%)",
  keyOp: "linear-gradient(180deg,#f4efe2 0%,#e7dfcb 100%)",
  keyPin: "linear-gradient(180deg,#fffef8 0%,#efe8d7 100%)",
  glass: "rgba(248,244,234,.85)",
  edge: "rgba(60,50,20,.1)",
  edgeHi: "rgba(60,50,20,.16)",
  edgeSoft: "rgba(60,50,20,.04)",
  rail: "rgba(60,50,20,.13)",
  keycapIn: "rgba(60,50,20,.14)",
  dropBtn: "rgba(60,50,20,.16)",
  dropSheet: "rgba(60,50,20,.2)",
  wellShadow: "0 2px 5px rgba(60,50,20,.1) inset, 0 1px 0 rgba(255,255,255,.7)",
  shadCard: "0 1px 0 rgba(255,255,255,.85) inset, 0 1px 2px rgba(60,50,20,.06), 0 10px 26px rgba(60,50,20,.1)",
  shadBtn: "0 1px 0 rgba(255,255,255,.9) inset, 0 -1.5px 0 rgba(60,50,20,.08) inset, 0 3px 8px rgba(60,50,20,.12)",
  tintY: "linear-gradient(135deg,#fdf3c9 0%,#fbf7ec 70%)",
  tintP: "linear-gradient(135deg,#efe2fd 0%,#faf7ee 65%)",
  tintG: "linear-gradient(135deg,#ddf5e6 0%,#f9f6ec 70%)",
  accentText: "#9b7b00",
};
const THEMES = { dark: DARK, light: LIGHT };
const C = { ...DARK };
// Re-tokeniza C y los átomos de estilo de módulo (capturan valores al crearse).
function applyTheme(mode) {
  const T = THEMES[mode] || DARK;
  if (C.mode === T.mode) return;
  Object.assign(C, T);
  Object.assign(card, { background: C.surf, border: `1px solid ${C.edge}`, boxShadow: C.shadCard });
  Object.assign(iconBtn, { background: C.surfBtn, border: `1px solid ${C.edge}`, color: C.textHi, boxShadow: C.shadBtn });
  Object.assign(inputStyle, { background: C.well, border: `1px solid ${C.edgeHi}`, color: C.textHi, boxShadow: C.wellShadow });
  sectionH.color = C.textHi;
  linkBtn.color = C.accentText;
  Object.assign(settingRow, { background: C.surf, border: `1px solid ${C.edge}`, boxShadow: C.shadCard });
}

const AREAS = [
  { key: "agenda", label: "Agenda", icon: CalendarDays },
  { key: "dinero", label: "Dinero", icon: Wallet },
  { key: "coleccion", label: "Colecciones", icon: Package },
  { key: "cerebro", label: "Objetivos", icon: Target },
];

/* ---------- tiny utils ---------- */
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const todayISO = () => new Date().toISOString().slice(0, 10);
const nowISO = () => new Date().toISOString();
const money = (n) =>
  (Number(n) || 0).toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 2 });
const shortEur = (n) => { n = Number(n) || 0; const a = Math.abs(n); return a >= 1000 ? (n / 1000).toFixed(a >= 10000 ? 0 : 1).replace(".", ",") + "k€" : Math.round(n) + "€"; };
const fmtDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso.length <= 10 ? iso + "T00:00:00" : iso);
  return d.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
};
const fmtLong = (d = new Date()) =>
  d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
const fmtDateTime = (iso) => {
  if (!iso) return "";
  try { const d = new Date(iso); return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" }) + " · " + d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; }
};
const sameDay = (iso, ref) => iso && iso.slice(0, 10) === ref;
const daysFromNow = (iso) => {
  if (!iso) return null;
  const a = new Date(iso.slice(0, 10) + "T00:00:00");
  const b = new Date(todayISO() + "T00:00:00");
  return Math.round((a - b) / 86400000);
};
const eventDate = (e) => {
  if (!e || !e.date) return null;
  const time = e.time || "09:00";
  const d = new Date(`${e.date.slice(0, 10)}T${time}:00`);
  return isNaN(d.getTime()) ? null : d;
};
const leadLabel = (min) =>
  min === 0 ? "a la hora" : min < 60 ? `${min} min antes` : min < 1440 ? `${min / 60} h antes` : `${min / 1440} día${min / 1440 > 1 ? "s" : ""} antes`;

/* ---------- birthdays ---------- */
// bday stored as "MM-DD" or "YYYY-MM-DD". Returns days until the next occurrence (0 = today).
const daysUntilBirthday = (bday) => {
  if (!bday) return null;
  const parts = String(bday).split("-");
  const mm = Number(parts.length === 3 ? parts[1] : parts[0]);
  const dd = Number(parts.length === 3 ? parts[2] : parts[1]);
  if (!mm || !dd) return null;
  const now = new Date(); now.setHours(0, 0, 0, 0);
  let next = new Date(now.getFullYear(), mm - 1, dd);
  if (next < now) next = new Date(now.getFullYear() + 1, mm - 1, dd);
  return Math.round((next - now) / 86400000);
};
const bdayAge = (bday) => {
  const parts = String(bday || "").split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]); if (!y) return null;
  const now = new Date();
  let age = now.getFullYear() - y;
  const mm = Number(parts[1]), dd = Number(parts[2]);
  const passed = (now.getMonth() + 1 > mm) || (now.getMonth() + 1 === mm && now.getDate() >= dd);
  if (!passed) age -= 1;
  return age >= 0 && age < 130 ? age : null;
};
const bdayLabel = (bday) => {
  const parts = String(bday || "").split("-");
  const mm = Number(parts.length === 3 ? parts[1] : parts[0]);
  const dd = Number(parts.length === 3 ? parts[2] : parts[1]);
  if (!mm || !dd) return "";
  return new Date(2020, mm - 1, dd).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
};

/* ---------- frases motivadoras (rotan cada día) ---------- */
const MOTIVATION = [
  "Bro, no te quedes sin: hoy es un buen día para empezar eso que llevas posponiendo.",
  "La disciplina pesa gramos; el arrepentimiento pesa toneladas. Elige bien hoy.",
  "No tienes que hacerlo perfecto, solo tienes que empezar.",
  "El que da primero da dos veces. Muévete antes de pensarlo demasiado.",
  "Un paso pequeño hoy vale más que un plan enorme mañana.",
  "Tu yo de dentro de un año te está mirando. No le falles.",
  "Rodéate de gente que sume; el resto, que reste en otro sitio.",
  "El dinero se cuida solo cuando tú te cuidas primero.",
  "Hazlo con miedo, pero hazlo. El valor viene después.",
  "Lo que se mide, mejora. Lo que se ignora, empeora.",
  "Descansar también es producir. Un cuerpo cansado no gana batallas.",
  "No busques motivación cada día; construye hábitos que no la necesiten.",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  "Menos ruido, más constancia. Ahí está la diferencia.",
  "Si no te reta, no te cambia. Busca el reto de hoy.",
  "Ahorra como si fueras pobre, invierte como si fueras listo.",
  "Cuida a tu gente: los detalles pequeños construyen lazos grandes.",
  "Hoy siembras lo que dentro de meses vas a agradecer.",
  "La calma es una superpotencia. Respira y ejecuta.",
  "No compares tu capítulo 1 con el capítulo 20 de otro.",
  "Haz una cosa difícil antes de comer. El resto del día será cuesta abajo.",
  "El foco es decir 'no' a mil cosas buenas por una que importa.",
  "Tu palabra vale oro; cúmplela, empezando contigo mismo.",
  "Mejor hecho que perfecto. Perfecciona sobre la marcha.",
];
const quoteOfToday = () => {
  const d = new Date();
  const idx = (d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate()) % MOTIVATION.length;
  return MOTIVATION[idx];
};

/* ---------- share codes (export/import a project between phones) ---------- */
const encodeShare = (obj) => { try { return "BRSN1:" + btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); } catch (e) { return ""; } };
const decodeShare = (str) => { try { return JSON.parse(decodeURIComponent(escape(atob(String(str).trim().replace(/^BRSN1:/, ""))))); } catch (e) { return null; } };
const initials = (name) => (name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const MEMBER_COLORS = ["#FFD400", "#9013FE", "#3ddc84", "#ff8a3d", "#4db5ff", "#ff5c8a"];

/* ---------- backups (full export/restore) ---------- */
const encodeBackup = (obj) => { try { return "BRSNBAK1:" + btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); } catch (e) { return ""; } };
const decodeBackup = (str) => {
  try {
    // Strip the prefix AND every whitespace/newline — copied codes often get
    // line-wrapped by chat apps, which used to break the restore silently.
    const clean = String(str).trim().replace(/^BRSNBAK1:/, "").replace(/\s+/g, "");
    return JSON.parse(decodeURIComponent(escape(atob(clean))));
  } catch (e) { return null; }
};
function downloadFile(name, text, type = "application/json") {
  try {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name; a.rel = "noopener";
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
    return true;
  } catch (e) { return false; }
}
// Installed iOS PWAs ignore <a download> (they open the file inline instead of
// saving it) — that's why "descargar" seemed broken on the phone. The iOS share
// sheet ("Guardar en Archivos") is the reliable path, so try it first, then fall
// back to a real download, then to opening the data. Returns how it was saved.
async function saveBackup(name, text, type = "application/json") {
  try {
    if (typeof navigator !== "undefined" && navigator.canShare && typeof File !== "undefined") {
      const file = new File([text], name, { type });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Copia de seguridad Brosin" });
        return "shared";
      }
    }
  } catch (e) {
    if (e && e.name === "AbortError") return "cancel"; // user closed the share sheet — fine
  }
  if (downloadFile(name, text, type)) return "download";
  try { window.open("data:" + type + ";charset=utf-8," + encodeURIComponent(text), "_blank"); return "open"; } catch (e) {}
  return "fail";
}

/* ---------- automatic rolling snapshots (local safety net) ----------
   Keeps the last few full states in local storage so a bad sync, a wipe or a
   failed restore can always be rolled back. Written throttled from the root. */
const AUTOBAK_KEY = "brosin_autobak_v1";
async function readAutoBaks() { try { const a = await store.get(AUTOBAK_KEY); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
async function writeAutoBak(persist) {
  try {
    if (!persist || typeof persist !== "object") return;
    const arr = await readAutoBaks();
    if (arr[0] && JSON.stringify(arr[0].data) === JSON.stringify(persist)) return; // no change → skip dupe
    const next = [{ at: nowISO(), data: persist }, ...arr].slice(0, 6);
    await store.set(AUTOBAK_KEY, next);
  } catch (e) {}
}
const countData = (d) => ({
  Eventos: (d.events || []).length,
  Movimientos: (d.tx || []).length,
  Colecciones: (d.collections || []).length,
  Empresas: (d.orgs || []).length,
  Compartidas: (d.sharedInv || []).length,
  Objetivos: (d.goals || []).length,
  Notas: (d.notes || []).length,
  Proyectos: (d.teamProjects || []).length,
});

/* ---------- image compression (downscale before storing) ---------- */
async function compressImage(file, maxDim = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width >= height && width > maxDim) { height = Math.round((height * maxDim) / width); width = maxDim; }
        else if (height > maxDim) { width = Math.round((width * maxDim) / height); height = maxDim; }
        try {
          const canvas = document.createElement("canvas");
          canvas.width = width; canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch (e) { resolve(reader.result); }
      };
      img.onerror = () => resolve(reader.result);
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---------- notifications ---------- */
const notify = {
  async ensure() {
    try {
      if (typeof Notification === "undefined") return false;
      if (Notification.permission === "granted") return true;
      if (Notification.permission !== "denied") return (await Notification.requestPermission()) === "granted";
    } catch (e) {}
    return false;
  },
  fire(title, body) {
    try {
      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification(title, { body });
        return true;
      }
    } catch (e) {}
    return false;
  },
};

/* ---------- persistence (window.storage ONLY, never localStorage) ---------- */
const STATE_KEY = "brosin_os_v1";
const PIN_KEY = "brosin_pin_v1";
const _mem = {};
const store = {
  async get(key) {
    try {
      if (typeof window !== "undefined" && window.storage && window.storage.get) {
        const v = await window.storage.get(key, { shared: false });
        return v ?? null;
      }
    } catch (e) {}
    return key in _mem ? _mem[key] : null;
  },
  async set(key, value) {
    _mem[key] = value;
    try {
      if (typeof window !== "undefined" && window.storage && window.storage.set) {
        await window.storage.set(key, value, { shared: false });
      }
    } catch (e) {}
  },
};

/* ---------- cloud sync (Supabase, optional — only in the installed PWA) ---------- */
let _supa = null;
async function getSupa() {
  try {
    if (_supa) return _supa;
    if (typeof window === "undefined" || !window.__SB_URL || !window.__SB_KEY) return null;
    const mod = await import("@supabase/supabase-js");
    _supa = mod.createClient(window.__SB_URL, window.__SB_KEY);
    return _supa;
  } catch (e) { return null; }
}
async function cloudLoad(sb, userId) {
  try {
    const { data, error } = await sb.from("app_state").select("data").eq("user_id", userId).maybeSingle();
    if (error) return null;
    return data ? data.data : null;
  } catch (e) { return null; }
}
async function cloudSave(sb, userId, data) {
  try {
    const { error } = await sb.from("app_state").upsert({ user_id: userId, data, updated_at: new Date().toISOString() });
    return !error;
  } catch (e) { return false; }
}

/* ---------- Push notifications (avisos con la app cerrada) ---------- */
const pushSupported = () => typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && typeof Notification !== "undefined";
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}
async function enablePush(sb, userId) {
  if (!pushSupported()) return { ok: false, reason: "unsupported" };
  const vapid = typeof window !== "undefined" ? window.__VAPID_PUBLIC : null;
  if (!vapid) return { ok: false, reason: "novapid" };
  let perm = Notification.permission;
  if (perm !== "granted") perm = await Notification.requestPermission();
  if (perm !== "granted") return { ok: false, reason: "denied" };
  try {
    const reg = await navigator.serviceWorker.ready;
    let subObj = await reg.pushManager.getSubscription();
    if (!subObj) subObj = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(vapid) });
    const j = subObj.toJSON();
    const { error } = await sb.from("push_subs").upsert({ user_id: userId, endpoint: subObj.endpoint, sub: j }, { onConflict: "endpoint" });
    if (error) return { ok: false, reason: "save", detail: error.message };
    return { ok: true };
  } catch (e) { return { ok: false, reason: "sub", detail: String(e) }; }
}
const nextBirthdayDate = (bday) => {
  const parts = String(bday || "").split("-");
  const mm = Number(parts.length === 3 ? parts[1] : parts[0]);
  const dd = Number(parts.length === 3 ? parts[2] : parts[1]);
  if (!mm || !dd) return null;
  const now = new Date(); now.setHours(0, 0, 0, 0);
  let nb = new Date(now.getFullYear(), mm - 1, dd);
  if (nb < now) nb = new Date(now.getFullYear() + 1, mm - 1, dd);
  return nb;
};
function computeReminders(state) {
  const out = [];
  const now = Date.now();
  const horizon = now + 45 * 24 * 3600 * 1000;
  const push = (rkey, fire, title, body) => { const t = fire.getTime(); if (t > now + 30000 && t < horizon) out.push({ rkey, fire_at: fire, title, body: body || "" }); };
  (state.events || []).forEach((e) => {
    if (e.done || e.remind === false) return;
    const dt = eventDate(e); if (!dt) return;
    const start = dt.getTime();
    const leads = (e.lead != null) ? (e.lead === 0 ? [0] : [e.lead, 0]) : [1440, 60, 0];
    leads.forEach((lead) => push(`ev:${e.id}:${lead}`, new Date(start - lead * 60000), lead === 0 ? `Ahora: ${e.title}` : `Pronto: ${e.title}`, `${fmtDate(e.date)}${e.time ? ` · ${e.time}` : ""}`));
  });
  (state.people || []).forEach((p) => {
    if (p.remind === false || !p.birthday) return;
    const nb = nextBirthdayDate(p.birthday); if (!nb) return;
    [7, 1, 0].forEach((d) => { const fire = new Date(nb.getTime() - d * 24 * 3600 * 1000); fire.setHours(9, 0, 0, 0); push(`bd:${p.id}:${d}`, fire, d === 0 ? `🎂 Hoy cumple ${p.name}` : d === 1 ? `🎂 Mañana cumple ${p.name}` : `🎂 ${p.name} cumple en ${d} días`, (p.giftIdeas || []).some((g) => !g.done) ? "Tienes ideas de regalo apuntadas" : "Prepárale un detalle"); });
  });
  (state.goals || []).forEach((g) => {
    if (!g.deadline || g.notif === false) return;
    if (g.steps && g.steps.length && g.steps.every((s) => s.done)) return;
    [3, 1, 0].forEach((d) => { const gd = new Date(g.deadline + "T09:00:00"); if (isNaN(gd.getTime())) return; push(`gl:${g.id}:${d}`, new Date(gd.getTime() - d * 24 * 3600 * 1000), d === 0 ? `Hoy es la meta: ${g.title}` : `Se acerca: ${g.title}`, g.why ? "Recuerda: " + g.why : "A por ello."); });
  });
  return out;
}
async function syncReminders(sb, userId, state) {
  try {
    const items = computeReminders(state);
    await sb.from("reminders").delete().eq("user_id", userId).eq("sent", false).gt("fire_at", new Date().toISOString());
    const rows = items.map((it) => ({ user_id: userId, rkey: it.rkey, fire_at: it.fire_at.toISOString(), title: it.title, body: it.body }));
    for (let i = 0; i < rows.length; i += 100) { await sb.from("reminders").insert(rows.slice(i, i + 100)); }
    return true;
  } catch (e) { return false; }
}

/* ---------- Claude ----------
   Inside Claude.ai: direct keyless call (auto-auth).
   Installed PWA: routes through a same-origin serverless proxy (window.__BROSIN_PROXY)
   so the phone never calls api.anthropic.com directly — avoids browser/CORS blocking. */
async function callClaude(messages, system, keyOverride) {
  const model = "claude-sonnet-5";
  const key = keyOverride || (typeof window !== "undefined" ? window.__BROSIN_AI_KEY : null);
  const proxy = typeof window !== "undefined" ? window.__BROSIN_PROXY : null;
  const direct = () => {
    const headers = { "Content-Type": "application/json" };
    if (key) {
      headers["x-api-key"] = key;
      headers["anthropic-version"] = "2023-06-01";
      headers["anthropic-dangerous-direct-browser-access"] = "true";
    }
    const body = { model, max_tokens: 1200, messages };
    if (system) body.system = system;
    return fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers, body: JSON.stringify(body) });
  };
  const viaProxy = () => fetch(proxy, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, max_tokens: 1200, messages, system: system || undefined, key }),
  });
  let response;
  try {
    if (proxy && !callClaude._proxyDead) {
      // Try the server proxy; if it isn't deployed (404) or fails, remember and fall back to direct.
      try {
        response = await viaProxy();
        if (response.status === 404) { callClaude._proxyDead = true; response = await direct(); }
      } catch (e) {
        callClaude._proxyDead = true;
        response = await direct();
      }
    } else {
      response = await direct();
    }
  } catch (e) {
    const err = new Error("net"); err.code = "net"; err.raw = String(e); throw err;
  }
  if (!response.ok) {
    let code = "http", raw = "";
    try {
      const j = await response.json();
      raw = (j && j.error && j.error.message) || JSON.stringify(j).slice(0, 200);
      if (response.status === 401) code = "key";
      else if (response.status === 400 && /credit|balance/i.test(raw)) code = "credit";
      else if (response.status === 400 && /x-api-key|authentication|api key/i.test(raw)) code = "key";
      else if (response.status === 404 && /model/i.test(raw)) code = "model";
      else if (response.status === 429) code = "rate";
    } catch (e) {}
    if (!key) code = "nokey";
    const err = new Error(code); err.code = code; err.raw = raw; err.status = response.status; throw err;
  }
  const data = await response.json();
  return (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

/* ---------- vision: ask Claude about a photo (ticket / comida) ---------- */
async function askVision(dataUrl, prompt, system) {
  const m = /^data:(image\/[a-z0-9.+-]+);base64,(.*)$/i.exec(dataUrl || "");
  const media = m ? m[1] : "image/jpeg";
  const b64 = m ? m[2] : String(dataUrl || "").split(",").pop();
  const content = [
    { type: "image", source: { type: "base64", media_type: media, data: b64 } },
    { type: "text", text: prompt },
  ];
  return callClaude([{ role: "user", content }], system);
}

/* ---------- voice: text-to-speech (escuchar) ---------- */
const tts = {
  supported() { return typeof window !== "undefined" && "speechSynthesis" in window; },
  _voice() {
    try {
      const vs = window.speechSynthesis.getVoices() || [];
      return vs.find((v) => /es[-_]ES/i.test(v.lang)) || vs.find((v) => /^es/i.test(v.lang)) || null;
    } catch (e) { return null; }
  },
  speak(text, onEnd) {
    try {
      if (!this.supported() || !text) { onEnd && onEnd(); return; }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      u.lang = "es-ES"; u.rate = 1; u.pitch = 1;
      const v = this._voice(); if (v) u.voice = v;
      u.onend = () => onEnd && onEnd();
      u.onerror = () => onEnd && onEnd();
      window.speechSynthesis.speak(u);
    } catch (e) { onEnd && onEnd(); }
  },
  stop() { try { window.speechSynthesis.cancel(); } catch (e) {} },
};

/* ---------- voice: speech-to-text (dictar) ---------- */
const sttSupported = () => typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
function makeRecognizer() {
  try {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const r = new SR();
    r.lang = "es-ES"; r.interimResults = true; r.continuous = true; r.maxAlternatives = 1;
    return r;
  } catch (e) { return null; }
}
const fmtNum = (v) => {
  if (v == null || !isFinite(v)) return "0";
  const r = Math.round(v * 1e8) / 1e8;
  return r.toLocaleString("es-ES", { maximumFractionDigits: 8 });
};

const AI_ERR = {
  nokey: "No hay clave conectada. Ponla en Perfil → Conectar IA.",
  key: "La clave no es válida. Revísala en Perfil → Conectar IA.",
  credit: "Clave válida, pero sin saldo. Compra créditos en Anthropic.",
  model: "El modelo no está disponible para tu cuenta. Avísame y lo cambio.",
  rate: "Demasiadas peticiones seguidas. Espera un momento y reintenta.",
  http: "Algo falló al hablar con la IA. Reintenta en un momento.",
  net: "No llego a la IA (conexión bloqueada). Hace falta el intermediario del servidor.",
};
async function testAiKey(key) {
  try {
    await callClaude([{ role: "user", content: "ping" }], "Responde solo: ok", key);
    return { status: "ok" };
  } catch (e) {
    if (e.code === "credit") return { status: "nocredits" };
    if (e.code === "key" || e.code === "nokey") return { status: "invalid" };
    return { status: "error", code: e.code || "net", raw: e.raw || "" };
  }
}
/* ---------- markets ---------- */
const PRESET_ASSETS = [
  { name: "Bitcoin", sym: "BTC", type: "crypto", cg: "bitcoin" },
  { name: "Ethereum", sym: "ETH", type: "crypto", cg: "ethereum" },
  { name: "Solana", sym: "SOL", type: "crypto", cg: "solana" },
  { name: "Oro (onza)", sym: "XAU", type: "manual" },
  { name: "Plata (onza)", sym: "XAG", type: "manual" },
  { name: "Gasolina 95 (L)", sym: "GAS", type: "manual" },
  { name: "S&P 500", sym: "SPX", type: "manual" },
  { name: "EUR / USD", sym: "EURUSD", type: "manual" },
];
async function fetchCrypto(ids) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=eur&include_24hr_change=true`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("net");
  return r.json();
}
// Forex real (gratis, sin clave): rates.USD = dólares por 1 euro
async function fetchForex() {
  const r = await fetch("https://open.er-api.com/v6/latest/EUR");
  if (!r.ok) throw new Error("net");
  const j = await r.json();
  return (j && j.rates) ? j.rates : null;
}
// Metal real (gratis, sin clave): precio en USD por onza (XAU oro, XAG plata)
async function fetchMetalUsd(sym) {
  const r = await fetch(`https://api.gold-api.com/price/${sym}`);
  if (!r.ok) throw new Error("net");
  const j = await r.json();
  return (j && typeof j.price === "number") ? j.price : null;
}
const LIVE_SYMS = ["XAU", "XAG", "EURUSD"];
const isLiveAsset = (a) => a.type === "crypto" || LIVE_SYMS.includes(a.sym);
async function aiEstimatePrice(name) {
  const sys = `Eres un asistente de precios. Devuelve SOLO un JSON {"precio": number, "moneda": "EUR"} con tu mejor estimación del precio de mercado actual del activo en euros. Sin texto extra, sin markdown. Si no lo sabes, estima con tu conocimiento general.`;
  const txt = await callClaude([{ role: "user", content: `Activo: ${name}. Precio aproximado hoy en EUR.` }], sys);
  const j = parseClaudeJson(txt);
  return j && typeof j.precio === "number" ? j.precio : null;
}

function parseClaudeJson(text) {
  if (!text) return null;
  let t = String(text).trim();
  t = t.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const s = t.indexOf("{");
  const e = t.lastIndexOf("}");
  if (s !== -1 && e !== -1) t = t.slice(s, e + 1);
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}

/* ---------- memory: snapshot of EVERYTHING for the AI ---------- */
function buildMemory(state) {
  const p = state.profile || {};
  const t = todayISO();
  const L = [];
  L.push(`PERFIL: ${p.name || "usuario"}. Hoy es ${fmtLong()} (${t}).`);

  const balance = state.tx.reduce((s, x) => s + (x.type === "ingreso" ? 1 : -1) * Number(x.amount || 0), 0);
  const ym = t.slice(0, 7);
  const mIn = state.tx.filter((x) => x.type === "ingreso" && (x.date || "").slice(0, 7) === ym).reduce((s, x) => s + Number(x.amount || 0), 0);
  const mOut = state.tx.filter((x) => x.type === "gasto" && (x.date || "").slice(0, 7) === ym).reduce((s, x) => s + Number(x.amount || 0), 0);
  L.push(`DINERO: balance total ${money(balance)}. Este mes ingresos ${money(mIn)}, gastos ${money(mOut)}.`);
  const recent = [...state.tx].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 20);
  if (recent.length) L.push("MOVIMIENTOS RECIENTES (sé que esto pasó, no preguntes):\n" + recent.map((x) => `- ${fmtDate(x.date)}: ${x.type === "ingreso" ? "+" : "-"}${money(x.amount)} · ${x.category}${x.note ? ` · ${x.note}` : ""}`).join("\n"));

  const debts = state.debts.filter((d) => !d.settled);
  if (debts.length) L.push("DEUDAS PENDIENTES:\n" + debts.map((d) => `- ${d.person} ${d.dir === "meDeben" ? "TE DEBE" : "le debes"} ${money(d.amount)}${d.note ? ` · ${d.note}` : ""}`).join("\n"));

  if (state.investments.length) L.push("INVERSIONES:\n" + state.investments.map((i) => { const pnl = Number(i.current || 0) - Number(i.invested || 0); return `- ${i.name}: vale ${money(i.current)} (${pnl >= 0 ? "+" : ""}${money(pnl)})`; }).join("\n"));

  if (state.markets.length) L.push("MERCADOS QUE SIGUE:\n" + state.markets.map((a) => { const ch = a.price != null && a.prev != null && a.prev !== 0 ? ((a.price - a.prev) / a.prev) * 100 : null; return `- ${a.name}: ${a.price != null ? money(a.price) : "s/d"}${ch != null ? ` (${ch >= 0 ? "+" : ""}${ch.toFixed(1)}%)` : ""}`; }).join("\n"));

  if (state.collections.length) {
    const tot = state.collections.reduce((s, c) => s + (c.items || []).reduce((a, i) => a + Number(i.value || 0), 0), 0);
    L.push(`COLECCIONES (${state.collections.length}, valor total ${money(tot)}):\n` + state.collections.map((c) => { const v = (c.items || []).reduce((a, i) => a + Number(i.value || 0), 0); const top = (c.items || []).slice(0, 4).map((i) => i.name).join(", "); return `- ${c.name}: ${(c.items || []).length} piezas, ${money(v)}${top ? ` (${top})` : ""}`; }).join("\n"));
  }

  const fiados = state.fiados.filter((f) => !f.returned);
  if (fiados.length) L.push("FIADOS SIN DEVOLVER:\n" + fiados.map((f) => `- ${f.item} a ${f.person} (desde ${fmtDate(f.date)})`).join("\n"));

  if (state.goals.length) L.push("OBJETIVOS:\n" + state.goals.map((g) => { const d = g.steps.filter((s) => s.done).length; const pend = g.steps.filter((s) => !s.done).map((s) => s.text).slice(0, 3).join(", "); return `- ${g.title} (${d}/${g.steps.length})${g.deadline ? ` meta ${fmtDate(g.deadline)}` : ""}${pend ? ` · falta: ${pend}` : ""}`; }).join("\n"));

  const up = state.events.filter((e) => daysFromNow(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 12);
  if (up.length) L.push("PRÓXIMOS EVENTOS:\n" + up.map((e) => `- ${fmtDate(e.date)}${e.time ? ` ${e.time}` : ""}: ${e.title}${e.done ? " (hecho)" : ""}`).join("\n"));
  const past = state.events.filter((e) => daysFromNow(e.date) < 0).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  if (past.length) L.push("EVENTOS PASADOS RECIENTES:\n" + past.map((e) => `- ${fmtDate(e.date)}: ${e.title}`).join("\n"));

  if (state.notes.length) L.push("NOTAS GUARDADAS: " + state.notes.map((n) => n.title).slice(0, 15).join(" · "));

  const meals = [...(state.meals || [])].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 6);
  if (meals.length) L.push("COMIDAS RECIENTES (fotos que analizó la cámara):\n" + meals.map((m) => `- ${fmtDate(m.date)}: ${m.plato}${m.calorias ? ` (~${m.calorias} kcal)` : ""}`).join("\n"));

  const upBdays = (state.people || []).map((p) => ({ p, d: daysUntilBirthday(p.birthday) })).filter((x) => x.d != null && x.d <= 30).sort((a, b) => a.d - b.d);
  if (upBdays.length) L.push("CUMPLEAÑOS CERCANOS:\n" + upBdays.map(({ p, d }) => `- ${p.name}${p.relation ? ` (${p.relation})` : ""}: ${d === 0 ? "HOY" : `en ${d} días`}${(p.giftIdeas || []).filter((g) => !g.done).length ? ` · ideas de regalo: ${(p.giftIdeas || []).filter((g) => !g.done).map((g) => g.text).join(", ")}` : ""}`).join("\n"));

  if ((state.savings || []).length) L.push("HUCHAS DE AHORRO:\n" + state.savings.map((h) => { const sv = (h.log || []).reduce((s, e) => s + Number(e.amount || 0), 0); return `- ${h.name}: ${money(sv)} de ${money(h.target || 0)}${Number(h.target) ? ` (${Math.round(sv / Number(h.target) * 100)}%)` : ""}`; }).join("\n"));

  if ((state.habits || []).length) L.push("HÁBITOS (rachas):\n" + state.habits.map((h) => { const st = streakOf(new Set(h.done || [])); return `- ${h.name}: ${st} día(s) seguidos${(h.done || []).includes(t) ? " (hoy hecho)" : ""}`; }).join("\n"));

  if ((state.sharedInv || []).length) L.push("INVERSIONES COMPARTIDAS:\n" + state.sharedInv.map((si) => {
    const inv = (si.log || []).filter((e) => e.kind === "aporte").reduce((s, e) => s + Number(e.amount || 0), 0);
    const ben = Number(si.value || 0) - inv;
    return `- ${si.name} con ${(si.partners || []).map((p) => p.name).join(", ")}: invertido ${money(inv)}, vale ${money(si.value || 0)} (${ben >= 0 ? "+" : ""}${money(ben)})`;
  }).join("\n"));

  const scr = (state.screenApps || []).reduce((s, a) => s + Number(a.minutes || 0), 0);
  if (scr) L.push(`PANTALLA HOY: ${Math.round(scr)} min en ${(state.screenApps || []).length} apps.`);

  const sl = [...(state.sleepLog || [])].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);
  if (sl.length) {
    const avg = sl.reduce((s, e) => s + e.hours, 0) / sl.length;
    const smin = p.sleepMin || 7;
    L.push(`SUEÑO: última noche ${sl[0].hours}h, media 7 días ${avg.toFixed(1)}h${sl[0].hours < smin ? " — POR DEBAJO DE LO NORMAL, anímale con cariño a descansar" : ""}.`);
  }

  return L.join("\n\n");
}

/* ============================================================
   STATE
   ============================================================ */
const EMPTY = {
  ready: false,
  profile: { name: "", focus: [], created: null, notif: { enabled: false, leads: [1440, 60, 10, 0], nagMin: 30 }, sleepGoal: 8, sleepMin: 7 },
  events: [],
  sleepLog: [],
  tx: [],
  debts: [],
  investments: [],
  collections: [],
  orgs: [],
  fiados: [],
  goals: [],
  notes: [],
  chat: [],
  markets: [],
  meals: [],
  sharedInv: [],
  people: [],
  savings: [],
  habits: [],
  screenApps: [],
  drive: { active: false, defaultMsg: "¡Hola! Estoy conduciendo 🚗 Ten paciencia, en cuanto pare te contesto. ¡Gracias!", contacts: [] },
  teamProjects: [],
};

function reducer(state, a) {
  switch (a.type) {
    case "hydrate":
      return { ...state, ...a.payload, ready: true };
    case "ready":
      return { ...state, ready: true };
    case "profile":
      return { ...state, profile: { ...state.profile, ...a.payload } };
    case "add":
      return { ...state, [a.col]: [a.item, ...state[a.col]] };
    case "update":
      return {
        ...state,
        [a.col]: state[a.col].map((x) => (x.id === a.id ? { ...x, ...a.patch } : x)),
      };
    case "remove":
      return { ...state, [a.col]: state[a.col].filter((x) => x.id !== a.id) };
    case "setCol":
      return { ...state, [a.col]: a.items };
    case "drive":
      return { ...state, drive: { ...state.drive, ...a.payload } };
    default:
      return state;
  }
}

/* ============================================================
   PRIMITIVE UI
   ============================================================ */
const BROSIN_EYE = "data:image/png;base64,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";
function BeeMark({ size = 40, face, color }) {
  const muted = color === C.ink3 || color === C.line;
  return (
    <img src={BROSIN_EYE} alt="Brosin" draggable={false}
      style={{ width: size, height: size, objectFit: "contain", display: "block", userSelect: "none", pointerEvents: "none",
        opacity: muted ? 0.42 : 1, filter: muted ? (C.mode === "light" ? "grayscale(1) brightness(.75)" : "grayscale(1) brightness(1.7)") : "none" }} />
  );
}

/* The authentic Brosin wordmark — extracted from the official brand manual (PNG, transparent) */
const BROSIN_LOGO = "data:image/png;base64,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";
function BrosinLogo({ height = 60 }) {
  // el logo oficial (mascota bellota-cerebro, "logo amarillo.png") con halo dorado sutil
  return (
    <img src={BROSIN_LOGO} alt="Brosin" draggable={false}
      style={{ height, width: "auto", display: "block", userSelect: "none", pointerEvents: "none", filter: "drop-shadow(0 10px 26px rgba(255,212,0,.22))" }} />
  );
}

const card = {
  // "placa física": superficie con degradado vertical, canto de luz cenital
  // (inset superior) y caída suave sobre el fondo — 3 niveles: bg0 (fondo),
  // card (placa), well/overrides (superficie hundida).
  background: C.surf,
  border: `1px solid ${C.edge}`,
  borderRadius: 22,
  boxShadow: C.shadCard,
};

function Title({ kicker, children, accent = C.yellow }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {kicker && (
        <div
          style={{
            color: accent === C.yellow ? C.accentText : accent,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {kicker}
        </div>
      )}
      <h2
        style={{
          color: C.textHi,
          fontWeight: 900,
          fontSize: 26,
          lineHeight: 1.02,
          letterSpacing: -0.5,
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function FAB({ onClick, label = "Añadir" }) {
  // Rendered through a portal to <body> so it escapes the app's inner scroll
  // container. Inside that scroller iOS treats position:fixed like absolute and
  // the button "gets stuck in the middle". At body level it truly pins to the
  // viewport, bottom-right of the centered 440px phone frame.
  const node = (
    <button
      className="b3d bfab"
      onClick={onClick}
      style={{
        position: "fixed",
        right: "max(18px, calc((100vw - 440px) / 2 + 18px))",
        bottom: "calc(84px + env(safe-area-inset-bottom))",
        height: 56,
        paddingInline: 20,
        borderRadius: 999,
        background: C.yellow,
        color: C.ink,
        border: "none",
        fontWeight: 900,
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        zIndex: 60,
      }}
    >
      <Plus size={20} strokeWidth={3} /> {label}
    </button>
  );
  return typeof document !== "undefined" && document.body ? createPortal(node, document.body) : node;
}

function LoadingPulse({ lines = 3 }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 16,
            width: `${90 - i * 12}%`,
            borderRadius: 8,
            background: `linear-gradient(90deg,${C.ink3},${C.line},${C.ink3})`,
            backgroundSize: "200% 100%",
            animation: "bshimmer 1.2s linear infinite",
          }}
        />
      ))}
    </div>
  );
}

function EmptyState({ title, sub, face = "sleep", cta, onCta }) {
  return (
    <div style={{ textAlign: "center", padding: "44px 20px", opacity: 0.95 }}>
      <div style={{ display: "inline-block", marginBottom: 14, animation: "bfloat 3s ease-in-out infinite" }}>
        <BeeMark size={68} face={face} color={C.ink3} />
      </div>
      <div style={{ color: C.textHi, fontWeight: 800, fontSize: 17 }}>{title}</div>
      <div style={{ color: C.textLo, fontSize: 13.5, marginTop: 6, maxWidth: 260, marginInline: "auto", lineHeight: 1.5 }}>
        {sub}
      </div>
      {cta && (
        <button
          className="b3d"
          onClick={onCta}
          style={{
            marginTop: 16,
            background: C.yellow,
            color: C.ink,
            border: "none",
            borderRadius: 999,
            padding: "11px 20px",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {cta}
        </button>
      )}
    </div>
  );
}

/* Bottom sheet modal */
function Sheet({ open, onClose, title, children }) {
  if (!open) return null;
  // Portaled to <body> with position:fixed so it always covers the real
  // viewport and pins to its bottom, regardless of how far the page is
  // scrolled (the old position:absolute anchored to the scroll-top and made
  // the panel appear "stuck in the middle" after scrolling down).
  const node = (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.62)",
        zIndex: 80,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "bfade .18s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 440,
          background: C.surfSheet,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderTop: `1px solid ${C.edgeHi}`,
          boxShadow: `0 1px 0 rgba(255,255,255,.06) inset, 0 -18px 50px ${C.dropSheet}`,
          padding: "16px 18px calc(22px + env(safe-area-inset-bottom))",
          maxHeight: "86vh",
          overflowY: "auto",
          animation: "bsheet .32s cubic-bezier(.32,1.25,.45,1)",
        }}
      >
        <div style={{ width: 44, height: 5, borderRadius: 999, background: C.edgeHi, boxShadow: "0 1px 2px rgba(0,0,0,.2)", margin: "0 auto 14px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, color: C.textHi, fontWeight: 900, fontSize: 19, textTransform: "uppercase", letterSpacing: -0.3 }}>
            {title}
          </h3>
          <button onClick={onClose} style={iconBtn}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
  return typeof document !== "undefined" && document.body ? createPortal(node, document.body) : node;
}

const iconBtn = {
  background: C.surfBtn,
  border: `1px solid ${C.edge}`,
  color: C.textHi,
  borderRadius: 12,
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: C.shadBtn,
};

/* form atoms */
const inputStyle = {
  width: "100%",
  background: C.well,
  border: `1px solid ${C.edgeHi}`,
  borderRadius: 14,
  padding: "12px 14px",
  color: C.textHi,
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
  boxShadow: C.wellShadow,
  transition: "border-color .18s, box-shadow .18s",
};
function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <span style={{ display: "block", color: C.textLo, fontSize: 12, fontWeight: 700, marginBottom: 6, letterSpacing: 0.3 }}>
        {label}
      </span>
      {children}
    </label>
  );
}
function PrimaryBtn({ children, onClick, full, color = C.yellow }) {
  // el volumen 3D (gradiente, cantos, halo, hundimiento) vive en el styleTag (.b3d*)
  const cls = color === C.yellow ? "b3d" : color === C.purple ? "b3d-purple" : color === C.good ? "b3d-good" : color === C.bad ? "b3d-red" : "b3d-dark";
  return (
    <button
      className={cls}
      onClick={onClick}
      style={{
        width: full ? "100%" : "auto",
        background: color,
        color: C.ink,
        border: "none",
        borderRadius: 16,
        padding: "14px 18px",
        fontWeight: 900,
        fontSize: 15,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {children}
    </button>
  );
}
function Chip({ active, onClick, children, accent = C.yellow }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 999,
        border: `1.5px solid ${active ? accent : C.edgeHi}`,
        background: active ? accent : C.edgeSoft,
        color: active ? (accent === C.purple ? "#fff" : C.ink) : C.textLo,
        fontWeight: 800,
        fontSize: 13,
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
        boxShadow: active
          ? "0 1px 0 rgba(255,255,255,.35) inset, 0 -1.5px 0 rgba(0,0,0,.22) inset, 0 4px 12px rgba(0,0,0,.35)"
          : "0 1px 0 rgba(255,255,255,.04) inset",
      }}
    >
      {children}
    </button>
  );
}

/* photo picker + thumbnail + lightbox */
function PhotoPicker({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const pick = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setBusy(true);
    try { onChange(await compressImage(f)); } catch (err) {} finally { setBusy(false); e.target.value = ""; }
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <label style={{ width: 78, height: 78, borderRadius: 18, border: `1.5px dashed ${C.line}`, background: C.well, display: "grid", placeItems: "center", cursor: "pointer", overflow: "hidden", flexShrink: 0 }}>
        {value ? (
          <img src={value} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : busy ? (
          <div style={{ animation: "bspin 1s linear infinite" }}><RefreshCcw size={20} color={C.textLo} /></div>
        ) : (
          <Camera size={24} color={C.textLo} />
        )}
        <input type="file" accept="image/*" capture="environment" onChange={pick} style={{ display: "none" }} />
      </label>
      <div style={{ fontSize: 12.5, color: C.textLo }}>
        {value ? (
          <button onClick={() => onChange(null)} style={{ ...iconBtn, width: "auto", paddingInline: 12, gap: 6, fontSize: 13, color: C.textLo }}><X size={14} /> Quitar foto</button>
        ) : (
          "Toca para hacer o elegir una foto"
        )}
      </div>
    </div>
  );
}
const lightboxBus = { open: () => {} };
function Thumb({ src, size = 44, radius = 11 }) {
  if (!src) return null;
  return (
    <button onClick={(e) => { e.stopPropagation(); lightboxBus.open(src); }} style={{ width: size, height: size, borderRadius: radius, overflow: "hidden", border: `1px solid ${C.line}`, padding: 0, cursor: "pointer", flexShrink: 0, background: C.ink3 }}>
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </button>
  );
}
function Lightbox({ src, onClose }) {
  if (!src) return null;
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.92)", zIndex: 90, display: "grid", placeItems: "center", padding: 20, animation: "bfade .2s ease" }}>
      <img src={src} alt="" style={{ maxWidth: "100%", maxHeight: "84%", borderRadius: 18, objectFit: "contain" }} />
      <button onClick={onClose} style={{ ...iconBtn, position: "absolute", top: 18, right: 18 }}><X size={20} /></button>
    </div>
  );
}

/* ---------- voice UI: escuchar (TTS) + dictar (STT) ---------- */
function SpeakBtn({ text, size = 32, tone = C.yellow }) {
  const [on, setOn] = useState(false);
  useEffect(() => () => { if (on) tts.stop(); }, [on]);
  if (!tts.supported() || !text) return null;
  const toggle = (e) => {
    e && e.stopPropagation();
    if (on) { tts.stop(); setOn(false); return; }
    setOn(true);
    tts.speak(text, () => setOn(false));
  };
  return (
    <button type="button" onClick={toggle} title={on ? "Parar" : "Escuchar"} style={{
      ...iconBtn, width: size, height: size, flexShrink: 0,
      color: on ? C.ink : tone, background: on ? tone : C.ink3, borderColor: on ? tone : C.line,
    }}>
      {on ? <Square size={13} fill="currentColor" /> : <Volume2 size={16} />}
    </button>
  );
}

function MicButton({ onResult, base = "", size = 44 }) {
  const [rec, setRec] = useState(false);
  const ref = useRef(null);
  const baseRef = useRef("");
  useEffect(() => () => { try { ref.current && ref.current.stop(); } catch (e) {} }, []);
  if (!sttSupported()) return null;
  const stop = () => { try { ref.current && ref.current.stop(); } catch (e) {} setRec(false); };
  const start = () => {
    const r = makeRecognizer();
    if (!r) return;
    ref.current = r;
    baseRef.current = base;
    let finalTxt = "";
    r.onresult = (ev) => {
      let interim = "", fin = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const seg = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) fin += seg; else interim += seg;
      }
      if (fin) finalTxt += fin;
      const combined = (finalTxt + " " + interim).replace(/\s+/g, " ").trim();
      onResult((baseRef.current ? baseRef.current + " " : "") + combined);
    };
    r.onerror = () => setRec(false);
    r.onend = () => setRec(false);
    setRec(true);
    try { r.start(); } catch (e) { setRec(false); }
  };
  return (
    <button type="button" onClick={() => (rec ? stop() : start())} title={rec ? "Parar" : "Dictar"} style={{
      ...iconBtn, width: size, height: size, flexShrink: 0,
      background: rec ? C.bad : C.purple, borderColor: rec ? C.bad : C.purple,
      animation: rec ? "bpulse 1.1s ease-in-out infinite" : "none",
    }}>
      <Mic size={size > 40 ? 20 : 16} color="#fff" />
    </button>
  );
}

/* ---------- calculadora ---------- */
function Calc() {
  const [expr, setExpr] = useState("");
  const [out, setOut] = useState("0");
  const safeEval = (s) => {
    if (!s || !/^[0-9+\-*/.%() ]+$/.test(s)) return null;
    try {
      // eslint-disable-next-line no-new-func
      const v = Function('"use strict";return (' + s.replace(/%/g, "/100") + ")")();
      return typeof v === "number" && isFinite(v) ? v : null;
    } catch (e) { return null; }
  };
  const live = (s) => { const v = safeEval(s); if (v != null) setOut(fmtNum(v)); };
  const press = (k) => {
    if (k === "C") { setExpr(""); setOut("0"); return; }
    if (k === "back") { const n = expr.slice(0, -1); setExpr(n); if (!n) setOut("0"); else live(n); return; }
    if (k === "=") { const v = safeEval(expr); if (v != null) { setOut(fmtNum(v)); setExpr(String(v)); } return; }
    const last = expr.slice(-1);
    if (/[+\-*/.]/.test(k) && /[+\-*/.]/.test(last)) { const n = expr.slice(0, -1) + k; setExpr(n); return; }
    const next = expr + k; setExpr(next); live(next);
  };
  const keys = [
    ["C", "(", ")", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "%", "="],
  ];
  const opColor = (k) => (k === "=" ? C.yellow
    : ["+", "-", "*", "/", "%", "(", ")"].includes(k) ? C.keyOp
    : k === "C" ? "linear-gradient(180deg,rgba(255,92,92,.26) 0%,rgba(255,92,92,.12) 100%)"
    : C.keyNum);
  return (
    <div>
      <div style={{ ...card, padding: 16, marginBottom: 12, background: C.well, boxShadow: C.wellShadow, fontVariantNumeric: "tabular-nums" }}>
        <div style={{ color: C.textLo, fontSize: 15, minHeight: 20, textAlign: "right", wordBreak: "break-all", fontWeight: 600 }}>{expr || " "}</div>
        <div style={{ color: C.textHi, fontWeight: 900, fontSize: 38, textAlign: "right", lineHeight: 1.1, wordBreak: "break-all", letterSpacing: -1 }}>{out}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button className="b3d-dark" onClick={() => press("back")} style={{ ...iconBtn, width: "auto", paddingInline: 16, height: 40, gap: 6, fontWeight: 800, fontSize: 13 }}><Delete size={16} /> Borrar</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {keys.flat().map((k) => (
          <button key={k} className={k === "=" ? "b3d" : "bkeycap"} onClick={() => press(k)} style={{
            padding: "16px 0", borderRadius: 16, border: `1px solid ${C.edge}`,
            background: opColor(k), color: k === "=" ? C.ink : k === "C" ? C.bad : C.textHi,
            fontWeight: 900, fontSize: 20, cursor: "pointer", fontVariantNumeric: "tabular-nums",
          }}>{k === "*" ? "×" : k === "/" ? "÷" : k}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------- quick idea (dictado -> nota) ---------- */
function QuickIdea({ onSave }) {
  const [text, setText] = useState("");
  const title = text.trim().split(/\s+/).slice(0, 6).join(" ") || "Idea";
  return (
    <div>
      <Field label="Tu idea (dicta o escribe)">
        <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} value={text} onChange={(e) => setText(e.target.value)} placeholder="Pulsa el micro y habla; lo paso a texto…" />
      </Field>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <MicButton onResult={setText} base={text} size={54} />
        <span style={{ color: C.textLo, fontSize: 12.5, lineHeight: 1.4 }}>
          {sttSupported() ? "Pulsa el micro y habla — se transcribe solo. Vuelve a pulsar para parar." : "Este navegador no deja dictar; escribe la idea a mano."}
        </span>
      </div>
      <PrimaryBtn full color={C.purple} onClick={() => text.trim() && onSave({ title, body: text.trim() })}>
        <Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>Guardar como nota</span>
      </PrimaryBtn>
    </div>
  );
}

/* ---------- SVG charts ---------- */
const SLICE = [C.yellow, C.purple, "#ff8a3d", "#3ddc84", "#4db5ff", "#ff5c8a", "#c0c0c0", "#ffd98a"];

function MonthlyBars({ tx }) {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleDateString("es-ES", { month: "short" }) });
  }
  const data = months.map((m) => ({
    ...m,
    ing: tx.filter((x) => x.type === "ingreso" && (x.date || "").slice(0, 7) === m.key).reduce((s, x) => s + Number(x.amount || 0), 0),
    gas: tx.filter((x) => x.type === "gasto" && (x.date || "").slice(0, 7) === m.key).reduce((s, x) => s + Number(x.amount || 0), 0),
  }));
  const max = Math.max(1, ...data.map((d) => Math.max(d.ing, d.gas)));
  const totIng = data.reduce((s, d) => s + d.ing, 0);
  const totGas = data.reduce((s, d) => s + d.gas, 0);
  const net = totIng - totGas;
  return (
    <div style={{ ...card, padding: 16 }}>
      <ChartHead icon={BarChart3} title="Ingresos vs gastos" sub={`Neto ${net >= 0 ? "+" : ""}${money(net)}`} />
      <div style={{ position: "relative", marginTop: 10 }}>
        {/* faint mid gridline */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 52, height: 1, background: C.line, opacity: 0.5 }} />
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 132, position: "relative" }}>
          {data.map((d) => {
            const mNet = d.ing - d.gas;
            return (
              <div key={d.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 104, width: "100%", justifyContent: "center" }}>
                  <div title={`Ingresos ${money(d.ing)}`} style={{ width: "42%", height: `${Math.max(2, (d.ing / max) * 100)}%`, background: `linear-gradient(180deg,#5fe89c,${C.good} 30%,#27a15e)`, borderRadius: "5px 5px 2px 2px", transition: "height .5s", boxShadow: "0 1px 0 rgba(255,255,255,.3) inset, 0 2px 10px rgba(61,220,132,.22)" }} />
                  <div title={`Gastos ${money(d.gas)}`} style={{ width: "42%", height: `${Math.max(2, (d.gas / max) * 100)}%`, background: `linear-gradient(180deg,#ff8f8f,${C.bad} 30%,#d64040)`, borderRadius: "5px 5px 2px 2px", transition: "height .5s", boxShadow: "0 1px 0 rgba(255,255,255,.25) inset, 0 2px 10px rgba(255,92,92,.2)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.15 }}>
                  <span style={{ fontSize: 10.5, color: C.textLo, textTransform: "capitalize", fontWeight: 700 }}>{d.label}</span>
                  {(d.ing || d.gas) ? <span style={{ fontSize: 9.5, color: mNet >= 0 ? C.good : C.bad, fontWeight: 700 }}>{mNet >= 0 ? "+" : "−"}{money(Math.abs(mNet)).replace("−", "")}</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Legend items={[{ c: C.good, l: `Ingresos · ${money(totIng)}` }, { c: C.bad, l: `Gastos · ${money(totGas)}` }]} />
    </div>
  );
}

function CategoryDonut({ tx }) {
  const cats = {};
  tx.filter((x) => x.type === "gasto").forEach((x) => { cats[x.category || "Otro"] = (cats[x.category || "Otro"] || 0) + Number(x.amount || 0); });
  const entries = Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (!total) return null;
  const r = 52, circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ ...card, padding: 16 }}>
      <ChartHead icon={PieChart} title="Gastos por categoría" sub={money(total)} />
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 6 }}>
        <svg width="130" height="130" viewBox="0 0 130 130" style={{ flexShrink: 0 }}>
          <circle cx="65" cy="65" r={r} fill="none" stroke={C.ink3} strokeWidth="16" />
          {entries.map(([k, v], i) => {
            const frac = v / total;
            const dash = frac * circ;
            const el = (
              <circle key={k} cx="65" cy="65" r={r} fill="none" stroke={SLICE[i % SLICE.length]} strokeWidth="16"
                strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset} transform="rotate(-90 65 65)" strokeLinecap="butt" />
            );
            offset += dash;
            return el;
          })}
          <text x="65" y="60" textAnchor="middle" fill={C.textLo} fontSize="8.5" fontWeight="700" letterSpacing="0.5">TOTAL</text>
          <text x="65" y="74" textAnchor="middle" fill={C.textHi} fontSize="14" fontWeight="900" letterSpacing="-0.3" style={{ fontVariantNumeric: "tabular-nums" }}>{shortEur(total)}</text>
        </svg>
        <div style={{ flex: 1, display: "grid", gap: 7 }}>
          {entries.map(([k, v], i) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: SLICE[i % SLICE.length], flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: C.textHi, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k}</div>
                <div style={{ color: C.textLo, fontSize: 10.5 }}>{money(v)}</div>
              </div>
              <span style={{ color: C.textLo, fontSize: 12.5, fontWeight: 800 }}>{Math.round((v / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BalanceLine({ tx }) {
  const sorted = [...tx].filter((x) => x.date).sort((a, b) => a.date.localeCompare(b.date));
  if (sorted.length < 2) return null;
  let bal = 0;
  const pts = sorted.map((x) => { bal += (x.type === "ingreso" ? 1 : -1) * Number(x.amount || 0); return bal; });
  const min = Math.min(0, ...pts), max = Math.max(1, ...pts);
  const W = 300, H = 90, pad = 6;
  const span = max - min || 1;
  const coords = pts.map((p, i) => {
    const x = pad + (i / (pts.length - 1)) * (W - pad * 2);
    const y = H - pad - ((p - min) / span) * (H - pad * 2);
    return [x, y];
  });
  const line = coords.map((c, i) => `${i ? "L" : "M"}${c[0].toFixed(1)} ${c[1].toFixed(1)}`).join(" ");
  const area = `${line} L${coords[coords.length - 1][0].toFixed(1)} ${H} L${coords[0][0].toFixed(1)} ${H} Z`;
  const up = pts[pts.length - 1] >= 0;
  const last = coords[coords.length - 1];
  const zeroY = H - pad - ((0 - min) / span) * (H - pad * 2);
  const lastXpct = (last[0] / W) * 100, lastYpct = (last[1] / H) * 100;
  return (
    <div style={{ ...card, padding: 16 }}>
      <ChartHead icon={TrendingUp} title="Evolución del balance" sub={money(pts[pts.length - 1])} />
      <div style={{ position: "relative", marginTop: 6 }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block", height: 96 }}>
          <defs>
            <linearGradient id="bgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={up ? C.good : C.bad} stopOpacity="0.35" />
              <stop offset="100%" stopColor={up ? C.good : C.bad} stopOpacity="0" />
            </linearGradient>
          </defs>
          {min < 0 && <line x1={pad} x2={W - pad} y1={zeroY} y2={zeroY} stroke={C.line} strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />}
          <path d={area} fill="url(#bgrad)" />
          <path d={line} fill="none" stroke={up ? C.good : C.bad} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ filter: `drop-shadow(0 0 4px ${up ? "rgba(61,220,132,.5)" : "rgba(255,92,92,.5)"})` }} />
        </svg>
        <div style={{ position: "absolute", left: `${lastXpct}%`, top: `${lastYpct}%`, width: 9, height: 9, borderRadius: 999, background: up ? C.good : C.bad, transform: "translate(-50%,-50%)", boxShadow: `0 0 0 3px ${up ? "rgba(61,220,132,.22)" : "rgba(255,92,92,.22)"}, 0 0 10px ${up ? "rgba(61,220,132,.6)" : "rgba(255,92,92,.6)"}` }} />
      </div>
    </div>
  );
}

function HBars({ title, sub, icon, data, accent = C.purple }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  if (!data.length) return null;
  return (
    <div style={{ ...card, padding: 16 }}>
      <ChartHead icon={icon} title={title} sub={sub} />
      <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
        {data.map((d, i) => (
          <div key={d.label + i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: C.textHi, fontSize: 12.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "65%" }}>{d.label}</span>
              <span style={{ color: C.textLo, fontSize: 12, fontWeight: 700 }}>{d.display}</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: C.rail, boxShadow: "0 1px 2px rgba(0,0,0,.2) inset", overflow: "hidden" }}>
              <div style={{ width: `${(d.value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg,${accent}cc,${accent})`, borderRadius: 999, transition: "width .5s", boxShadow: `0 1px 0 rgba(255,255,255,.25) inset, 0 0 8px ${accent}44` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartHead({ icon: Ico, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <Ico size={16} color={C.yellow} />
      <div style={{ flex: 1 }}>
        <div style={{ color: C.textHi, fontWeight: 800, fontSize: 14 }}>{title}</div>
      </div>
      {sub && <div style={{ color: C.textLo, fontSize: 12, fontWeight: 700 }}>{sub}</div>}
    </div>
  );
}
function Legend({ items }) {
  return (
    <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 10 }}>
      {items.map((it) => (
        <div key={it.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: 3, background: it.c }} />
          <span style={{ color: C.textLo, fontSize: 12 }}>{it.l}</span>
        </div>
      ))}
    </div>
  );
}

/* in-app toasts */
function Toasts({ items, onDismiss }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: "calc(84px + env(safe-area-inset-bottom))", zIndex: 90, padding: "0 12px", display: "grid", gap: 8, pointerEvents: "none" }}>
      {items.map((t) => <ToastItem key={t.id} t={t} onDismiss={onDismiss} />)}
    </div>
  );
}
function ToastItem({ t, onDismiss }) {
  const [dx, setDx] = useState(0);
  const start = useRef(null);
  const dragging = useRef(false);
  return (
    <div
      onClick={() => onDismiss(t.id)}
      onTouchStart={(e) => { start.current = e.touches[0].clientX; dragging.current = true; }}
      onTouchMove={(e) => { if (start.current != null) setDx(e.touches[0].clientX - start.current); }}
      onTouchEnd={() => { dragging.current = false; if (Math.abs(dx) > 70) onDismiss(t.id); else setDx(0); start.current = null; }}
      style={{
        pointerEvents: "auto", cursor: "pointer", background: C.ink2, border: `1px solid ${C.line}`,
        borderRadius: 13, padding: "8px 10px 8px 12px", display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 8px 22px rgba(0,0,0,.45)", animation: "bdrop .28s cubic-bezier(.2,.9,.3,1)",
        transform: `translateX(${dx}px)`, opacity: Math.max(0, 1 - Math.abs(dx) / 170),
        transition: dragging.current ? "none" : "transform .18s ease, opacity .18s ease",
      }}>
      <div style={{ flexShrink: 0, width: 7, height: 7, borderRadius: 999, background: C.yellow }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.accentText, fontWeight: 800, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
        {t.body && <div style={{ color: C.textHi, fontSize: 11.5, marginTop: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{t.body}</div>}
      </div>
      <button onClick={(e) => { e.stopPropagation(); onDismiss(t.id); }} style={{ ...iconBtn, width: 26, height: 26, flexShrink: 0, borderRadius: 8 }}><X size={13} /></button>
    </div>
  );
}

/* ============================================================
   LOCK SCREEN
   ============================================================ */
function LockScreen({ mode, onUnlock, onSet }) {
  // mode: "set" (create pin), "enter" (unlock)
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [shake, setShake] = useState(false);
  const [err, setErr] = useState("");

  const press = (d) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) setTimeout(() => submit(next), 120);
  };
  const submit = (val) => {
    if (mode === "set") {
      if (confirm === null) {
        setConfirm(val);
        setPin("");
        return;
      }
      if (confirm === val) onSet(val);
      else {
        setErr("No coinciden. Otra vez, bro.");
        setConfirm(null);
        setPin("");
        bump();
      }
    } else {
      onUnlock(val, (ok) => {
        if (!ok) {
          setErr("PIN incorrecto");
          setPin("");
          bump();
        }
      });
    }
  };
  const bump = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };
  const del = () => setPin((p) => p.slice(0, -1));

  const label = mode === "set" ? (confirm === null ? "Crea tu PIN" : "Repite el PIN") : "Hola otra vez";

  return (
    <div style={{ position: "absolute", inset: 0, background: C.bg0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 95 }}>
      <div style={{ animation: shake ? "bshake .4s" : "bfloat 3.5s ease-in-out infinite" }}>
        <BrosinLogo height={120} />
      </div>
      <div style={{ color: C.textLo, fontSize: 13, marginTop: 18 }}>{label}</div>

      <div style={{ display: "flex", gap: 14, margin: "26px 0 8px" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: 16, height: 16, borderRadius: 999, background: i < pin.length ? "linear-gradient(180deg,#ffe561,#FFD400)" : "transparent", border: `2px solid ${i < pin.length ? C.yellow : C.edgeHi}`, boxShadow: i < pin.length ? "0 0 10px rgba(255,212,0,.55)" : "none", transform: i < pin.length ? "scale(1.08)" : "scale(1)", transition: "all .15s" }} />
        ))}
      </div>
      <div style={{ height: 18, color: C.bad, fontSize: 12.5, fontWeight: 700 }}>{err}</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 10 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <KeyBtn key={n} onClick={() => press(String(n))}>{n}</KeyBtn>
        ))}
        <div />
        <KeyBtn onClick={() => press("0")}>0</KeyBtn>
        <KeyBtn onClick={del} ghost>
          <Delete size={22} />
        </KeyBtn>
      </div>
      <div style={{ position: "absolute", bottom: 26, color: C.textLo, fontSize: 11, letterSpacing: 1 }}>
        Bro, no te quedes sin.
      </div>
    </div>
  );
}
function KeyBtn({ children, onClick, ghost }) {
  return (
    <button
      className={ghost ? undefined : "bkeycap"}
      onClick={onClick}
      style={{
        width: 70,
        height: 70,
        borderRadius: 999,
        background: ghost ? "transparent" : C.keyPin,
        border: `1px solid ${ghost ? "transparent" : C.edge}`,
        color: C.textHi,
        fontSize: 26,
        fontWeight: 800,
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}

/* ============================================================
   ONBOARDING (progressive stepper)
   ============================================================ */
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [focus, setFocus] = useState([]);
  const [ppl, setPpl] = useState([{ id: uid(), name: "", birthday: "" }]);
  const steps = ["Bienvenida", "Tu nombre", "Tu foco", "Tu gente", "Listo"];
  const toggle = (k) => setFocus((f) => (f.includes(k) ? f.filter((x) => x !== k) : [...f, k]));
  const setP = (id, field, v) => setPpl((ps) => ps.map((p) => p.id === id ? { ...p, [field]: v } : p));
  const addP = () => setPpl((ps) => [...ps, { id: uid(), name: "", birthday: "" }]);
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const finish = () => {
    const people = ppl.filter((p) => p.name.trim()).map((p) => ({ id: uid(), name: p.name.trim(), birthday: p.birthday || "", relation: "", giftIdeas: [], remind: true }));
    onDone({ name: name.trim() || "Bro", focus, created: nowISO() }, people);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: C.bg0, zIndex: 95, display: "flex", flexDirection: "column", padding: "26px 22px", paddingTop: "calc(26px + env(safe-area-inset-top))" }}>
      {/* progress */}
      <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i <= step ? "linear-gradient(90deg,#ffe561,#eec400)" : C.edgeHi, boxShadow: i <= step ? "0 0 8px rgba(255,212,0,.4)" : "0 1px 2px rgba(0,0,0,.2) inset", transition: "all .3s" }} />
        ))}
      </div>

      <div key={step} style={{ flex: 1, animation: "bslide .35s ease" }}>
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: 30 }}>
            <div style={{ animation: "bfloat 3s ease-in-out infinite" }}>
              <BrosinLogo height={150} />
            </div>
            <p style={{ color: C.textHi, fontWeight: 800, fontSize: 18, margin: "20px 0 0" }}>Tu segundo cerebro.</p>
            <p style={{ color: C.textLo, fontSize: 14.5, marginTop: 10, maxWidth: 300, lineHeight: 1.55 }}>
              Una conciencia que recuerda, planifica y guarda lo que importa. Agenda, dinero, colecciones, objetivos — todo tuyo, todo aquí.
            </p>
          </div>
        )}
        {step === 1 && (
          <div style={{ marginTop: 20 }}>
            <Title kicker="Empecemos">¿Cómo te llamo?</Title>
            <p style={{ color: C.textLo, fontSize: 13.5, marginBottom: 18 }}>Para hablarte de tú a tú, como un colega.</p>
            <input style={{ ...inputStyle, fontSize: 18, padding: "16px 16px" }} placeholder="Tu nombre o apodo" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </div>
        )}
        {step === 2 && (
          <div style={{ marginTop: 20 }}>
            <Title kicker="A medida">¿Qué quieres dominar?</Title>
            <p style={{ color: C.textLo, fontSize: 13.5, marginBottom: 18 }}>Elige lo que más te importa. Lo tendrás todo, pero esto va arriba.</p>
            <div style={{ display: "grid", gap: 12 }}>
              {AREAS.map((a) => {
                const Ico = a.icon;
                const on = focus.includes(a.key);
                return (
                  <button key={a.key} onClick={() => toggle(a.key)} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "16px 16px",
                    borderRadius: 18, cursor: "pointer", textAlign: "left",
                    background: on ? "linear-gradient(135deg,rgba(255,212,0,.14),rgba(255,212,0,.05))" : C.surf,
                    border: `1.5px solid ${on ? C.yellow : C.edge}`,
                    boxShadow: on
                      ? "0 1px 0 rgba(255,255,255,.08) inset, 0 6px 18px rgba(255,212,0,.16), 0 8px 20px rgba(0,0,0,.2)"
                      : C.shadCard,
                  }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: on ? "linear-gradient(180deg,#ffe561,#eec400)" : C.surfBtn, boxShadow: on ? "0 1px 0 rgba(255,255,255,.4) inset, 0 4px 12px rgba(255,212,0,.35)" : C.shadBtn, display: "grid", placeItems: "center" }}>
                      <Ico size={20} color={on ? C.ink : C.textHi} />
                    </div>
                    <span style={{ color: C.textHi, fontWeight: 800, fontSize: 15.5, flex: 1 }}>{a.label}</span>
                    {on && <Check size={20} color={C.yellow} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ marginTop: 20 }}>
            <Title kicker="Tu gente">¿Algún cumple que no quieras olvidar?</Title>
            <p style={{ color: C.textLo, fontSize: 13.5, marginBottom: 18 }}>Apunta a tu familia o amigos y Brosin te avisará con tiempo para preparar el regalo. Puedes saltarte esto y añadirlos luego.</p>
            <div style={{ display: "grid", gap: 10 }}>
              {ppl.map((p) => (
                <div key={p.id} style={{ display: "flex", gap: 8 }}>
                  <input style={{ ...inputStyle, flex: 1 }} value={p.name} onChange={(e) => setP(p.id, "name", e.target.value)} placeholder="Nombre" />
                  <input type="date" style={{ ...inputStyle, width: 150 }} value={p.birthday} onChange={(e) => setP(p.id, "birthday", e.target.value)} />
                </div>
              ))}
              <button onClick={addP} style={{ ...iconBtn, width: "auto", paddingInline: 14, height: 42, gap: 8, fontWeight: 700, fontSize: 13.5 }}><UserPlus size={16} /> Añadir otra persona</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: 40 }}>
            <BeeMark size={96} face="happy" />
            <h2 style={{ color: C.textHi, fontWeight: 900, fontSize: 26, margin: "20px 0 6px", textTransform: "uppercase" }}>
              Todo listo, {name.trim() || "bro"}
            </h2>
            <p style={{ color: C.textLo, fontSize: 14.5, maxWidth: 290, lineHeight: 1.55 }}>
              Tu colmena está montada. A partir de ahora, no te quedas sin nada.
            </p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        {step > 0 && (
          <button onClick={back} style={{ ...iconBtn, width: 54, height: 54, borderRadius: 16 }}>
            <ChevronLeft size={22} />
          </button>
        )}
        <div style={{ flex: 1 }}>
          {step < 4 ? (
            <PrimaryBtn full onClick={next}>
              {step === 3 ? "Casi está" : "Siguiente"} <ChevronRight size={18} strokeWidth={3} />
            </PrimaryBtn>
          ) : (
            <PrimaryBtn full onClick={finish}>
              Entrar a Brosin <Sparkles size={18} />
            </PrimaryBtn>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HOME / HOY
   ============================================================ */
/* Anillo del día — progreso de hoy (agenda + hábitos) estilo Apple Activity */
function RingLegend({ color, label, done, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 9, height: 9, borderRadius: 999, background: color, flexShrink: 0 }} />
      <span style={{ color: C.textHi, fontSize: 13, fontWeight: 700, flex: 1 }}>{label}</span>
      <span style={{ color: total ? C.textHi : C.textLo, fontSize: 13, fontWeight: 800 }}>{total ? `${done}/${total}` : "—"}</span>
    </div>
  );
}
function DayRing({ state, todayL }) {
  const t = todayISO();
  const evs = (state.events || []).filter((e) => sameDay(e.date, todayL));
  const evTotal = evs.length, evDone = evs.filter((e) => e.done).length;
  const habits = state.habits || [];
  const hbTotal = habits.length, hbDone = habits.filter((h) => (h.done || []).includes(t)).length;
  const totalItems = evTotal + hbTotal;

  if (totalItems === 0) {
    return (
      <div style={{ ...card, padding: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: C.ink3, display: "grid", placeItems: "center", flexShrink: 0 }}><Target size={20} color={C.yellow} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 800, fontSize: 14.5 }}>Tu día, en un anillo</div>
          <div style={{ color: C.textLo, fontSize: 12.5, marginTop: 2, lineHeight: 1.4 }}>Añade un evento o marca un hábito y verás tu progreso llenarse.</div>
        </div>
      </div>
    );
  }

  const evFrac = evTotal ? evDone / evTotal : 0;
  const hbFrac = hbTotal ? hbDone / hbTotal : 0;
  const overall = Math.round(((evDone + hbDone) / totalItems) * 100);
  const allDone = evDone + hbDone === totalItems;
  const R1 = 50, R2 = 35, sw = 11;
  const c1 = 2 * Math.PI * R1, c2 = 2 * Math.PI * R2;
  const status = allDone ? "¡Día completado!" : overall >= 66 ? "Casi lo tienes" : overall >= 33 ? "Vas en marcha" : overall > 0 ? "Buen comienzo" : "Empieza tu día";

  return (
    <div style={{ ...card, padding: 16, marginBottom: 14, background: C.surfDeep }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", flexShrink: 0, width: 122, height: 122 }}>
          {allDone && (
            <>
              {/* celebración única: pulso dorado + partículas (solo transform/opacity, se apagan solas) */}
              <div style={{ position: "absolute", inset: 8, borderRadius: 999, animation: "bcelepulse .9s ease-out .1s 1", pointerEvents: "none" }} />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <span key={i} style={{
                  position: "absolute", left: "50%", top: "50%", width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5,
                  borderRadius: 999, background: i % 2 ? "#ffe561" : C.yellow, pointerEvents: "none",
                  "--a": `${i * 45}deg`, animation: `bparty .85s ease-out ${0.12 + (i % 4) * 0.05}s 1 both`,
                }} />
              ))}
            </>
          )}
          <svg width={122} height={122} viewBox="0 0 122 122" style={{ display: "block" }}>
            <defs>
              <linearGradient id="bringY" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffe561" />
                <stop offset="100%" stopColor="#f0a500" />
              </linearGradient>
              <linearGradient id="bringP" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#b45cff" />
                <stop offset="100%" stopColor="#6c0bc4" />
              </linearGradient>
            </defs>
            <circle cx="61" cy="61" r={R1} fill="none" stroke={C.edge} strokeWidth={sw} />
            <circle cx="61" cy="61" r={R2} fill="none" stroke={C.edge} strokeWidth={sw} />
            {evTotal > 0 && (
              <circle cx="61" cy="61" r={R1} fill="none" stroke="url(#bringY)" strokeWidth={sw} strokeLinecap="round"
                strokeDasharray={`${(evFrac * c1).toFixed(1)} ${c1.toFixed(1)}`} transform="rotate(-90 61 61)"
                style={{ transition: "stroke-dasharray .6s cubic-bezier(.3,.9,.3,1)", filter: evFrac > 0 ? "drop-shadow(0 0 5px rgba(255,212,0,.5))" : "none" }} />
            )}
            {hbTotal > 0 && (
              <circle cx="61" cy="61" r={R2} fill="none" stroke="url(#bringP)" strokeWidth={sw} strokeLinecap="round"
                strokeDasharray={`${(hbFrac * c2).toFixed(1)} ${c2.toFixed(1)}`} transform="rotate(-90 61 61)"
                style={{ transition: "stroke-dasharray .6s cubic-bezier(.3,.9,.3,1)", filter: hbFrac > 0 ? "drop-shadow(0 0 5px rgba(144,19,254,.5))" : "none" }} />
            )}
            <text x="61" y="58" textAnchor="middle" fill={C.textHi} fontSize="23" fontWeight="900" letterSpacing="-0.5" style={{ fontVariantNumeric: "tabular-nums" }}>{overall}%</text>
            <text x="61" y="74" textAnchor="middle" fill={C.textLo} fontSize="9" fontWeight="700" letterSpacing="0.5">DE HOY</text>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 900, fontSize: 17, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span>{status}</span>
            {allDone && <span style={{ display: "inline-flex", animation: "bpop .5s cubic-bezier(.34,1.56,.64,1) backwards, bfloat 3s .5s ease-in-out infinite" }}><BeeMark size={26} face="happy" /></span>}
          </div>
          <div style={{ display: "grid", gap: 9 }}>
            <RingLegend color={C.yellow} label="Agenda" done={evDone} total={evTotal} />
            <RingLegend color={C.purple} label="Hábitos" done={hbDone} total={hbTotal} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* iOS-style segmented control with a fluid sliding highlight */
function Segmented({ tabs, value, onChange }) {
  const n = tabs.length;
  const idx = Math.max(0, tabs.findIndex((t) => t.k === value));
  return (
    <div style={{ position: "relative", display: "flex", background: C.well, borderRadius: 999, padding: 4, border: `1px solid ${C.edge}`, boxShadow: C.wellShadow }}>
      <div style={{ position: "absolute", top: 4, bottom: 4, left: `calc(4px + (100% - 8px) * ${idx} / ${n})`, width: `calc((100% - 8px) / ${n})`, background: "linear-gradient(180deg,#ffe561 0%,#FFD400 60%,#ecc400 100%)", borderRadius: 999, transition: "left .38s cubic-bezier(.34,1.56,.64,1)", boxShadow: "0 1px 0 rgba(255,255,255,.5) inset, 0 -1.5px 0 rgba(0,0,0,.2) inset, 0 5px 16px rgba(255,212,0,.32)" }} />
      {tabs.map((t) => (
        <button key={t.k} onClick={() => onChange(t.k)} style={{ position: "relative", zIndex: 1, flex: 1, background: "none", border: "none", cursor: "pointer", padding: "9px 4px", fontWeight: 800, fontSize: 13.5, color: value === t.k ? C.ink : C.textLo, transition: "color .25s", whiteSpace: "nowrap" }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* compact app-style tool button (icon tile + caption) */
function ToolButton({ icon: Ico, label, accent, onClick, active, anim }) {
  // micro-animación con personalidad: la herramienta "actúa" al tocarla y luego navega
  const [playing, setPlaying] = useState(false);
  const isPurple = accent === C.purple;
  const fire = () => {
    if (!anim) { onClick && onClick(); return; }
    if (playing) return;
    setPlaying(true);
    setTimeout(() => { setPlaying(false); onClick && onClick(); }, 430);
  };
  return (
    <button onClick={fire} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "2px 0" }}>
      <div className={playing && anim ? `banim-${anim}` : undefined} style={{
        position: "relative", overflow: "hidden",
        width: 54, height: 54, borderRadius: 17,
        background: active
          ? (isPurple ? "linear-gradient(180deg,#a844ff,#8210e6)" : "linear-gradient(180deg,#ffe561,#eec400)")
          : C.tileTool,
        display: "grid", placeItems: "center",
        border: `1px solid ${active ? "rgba(255,255,255,.18)" : C.edge}`,
        boxShadow: active
          ? `0 1px 0 rgba(255,255,255,.35) inset, 0 -2px 0 rgba(0,0,0,.25) inset, 0 6px 16px ${isPurple ? "rgba(144,19,254,.4)" : "rgba(255,212,0,.35)"}`
          : `0 1px 0 rgba(255,255,255,.07) inset, 0 -2px 0 ${C.keycapIn} inset, 0 5px 12px ${C.dropBtn}`,
        transition: "transform .15s",
      }}>
        <Ico size={22} color={active ? (isPurple ? "#fff" : C.ink) : C.textHi} />
        {playing && anim === "camera" && <span className="bflashfx" />}
        {playing && anim === "team" && <><span className="bpeep bpeepL" /><span className="bpeep bpeepR" /></>}
        {playing && anim === "car" && <span className="broadfx" />}
      </div>
      <span style={{ color: C.textLo, fontSize: 10.5, fontWeight: 600, textAlign: "center", lineHeight: 1.15 }}>{label}</span>
    </button>
  );
}

function HomeScreen({ state, dispatch, go, ai, openMarkets, toast }) {
  const [calcOpen, setCalcOpen] = useState(false);
  const [ideaOpen, setIdeaOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [homeTab, setHomeTab] = useState("hoy"); // hoy | semana | vistazo

  const pad = (n) => String(n).padStart(2, "0");
  const localISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const now = new Date();
  const todayL = localISO(now);
  const evByDay = (iso) => state.events.filter((e) => sameDay(e.date, iso)).sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  const todays = evByDay(todayL);
  const week = [];
  for (let i = 0; i < 7; i++) { const d = new Date(now); d.setDate(now.getDate() + i); week.push(d); }

  const balance = state.tx.reduce((s, x) => s + (x.type === "ingreso" ? 1 : -1) * Number(x.amount || 0), 0);
  const owedToMe = state.debts.filter((d) => d.dir === "meDeben" && !d.settled).reduce((s, d) => s + Number(d.amount || 0), 0);
  const goalsActive = state.goals.filter((g) => g.steps.some((s) => !s.done)).length;
  const fiadosOut = state.fiados.filter((f) => !f.returned).length;

  const hour = now.getHours();
  const greet = hour < 6 ? "De madrugada" : hour < 14 ? "Buenos días" : hour < 21 ? "Buenas tardes" : "Buenas noches";
  const weekdayLong = now.toLocaleDateString("es-ES", { weekday: "long" });
  const monthLong = now.toLocaleDateString("es-ES", { month: "long" });
  const birthday = (state.people || []).map((p) => ({ p, d: daysUntilBirthday(p.birthday) })).filter((x) => x.d != null && x.d <= 10).sort((a, b) => a.d - b.d)[0];

  const tabs = [{ k: "hoy", label: "Hoy" }, { k: "semana", label: "Semana" }, { k: "vistazo", label: "Vistazo" }];

  return (
    <div style={{ padding: "18px 18px 0" }}>
      {/* greeting + settings */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <BeeMark size={40} face="happy" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textLo, fontSize: 12.5, fontWeight: 600 }}>{greet},</div>
          <div style={{ color: C.textHi, fontSize: 20, fontWeight: 900, lineHeight: 1.05, textTransform: "capitalize", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{state.profile.name || "Bro"}</div>
        </div>
        <button onClick={() => go("perfil")} style={iconBtn}><Settings size={18} /></button>
      </div>

      {/* big agenda date */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ color: C.accentText, fontSize: 11.5, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", textShadow: C.mode === "dark" ? "0 0 12px rgba(255,212,0,.35)" : "none" }}>{weekdayLong}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
          <span style={{ color: C.textHi, fontSize: 40, fontWeight: 900, lineHeight: 1, letterSpacing: -1.5, fontVariantNumeric: "tabular-nums" }}>{now.getDate()}</span>
          <span style={{ color: C.textHi, fontSize: 18, fontWeight: 700, textTransform: "capitalize" }}>de {monthLong}</span>
          <span style={{ flex: 1 }} />
          <span style={{ color: C.textLo, fontSize: 12.5, fontWeight: 600 }}>{todays.length ? `${todays.length} evento${todays.length === 1 ? "" : "s"} hoy` : "día libre"}</span>
        </div>
      </div>

      {/* AI capture pill */}
      {ai && (
        <button onClick={() => setAiOpen(true)} style={{ ...card, width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", marginBottom: 16, cursor: "pointer", border: "1px solid rgba(144,19,254,.5)", background: C.tintP, boxShadow: "0 1px 0 rgba(255,255,255,.07) inset, 0 6px 18px rgba(144,19,254,.16), 0 10px 26px rgba(0,0,0,.35)", textAlign: "left" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(180deg,#a844ff,#7d10da)", boxShadow: "0 1px 0 rgba(255,255,255,.3) inset, 0 4px 10px rgba(144,19,254,.4)", display: "grid", placeItems: "center", flexShrink: 0 }}><Sparkles size={16} color="#fff" /></div>
          <span style={{ flex: 1, color: C.textLo, fontSize: 13.5 }}>Dile a Brosin y lo apunto…</span>
          <Mic size={16} color={C.purple} />
        </button>
      )}

      {/* segmented control */}
      <Segmented tabs={tabs} value={homeTab} onChange={setHomeTab} />
      <div style={{ height: 16 }} />

      <div key={homeTab} style={{ animation: "bfade .25s ease" }}>
        {homeTab === "hoy" && (
          <>
            <DayRing state={state} todayL={todayL} />
            {todays.length === 0 ? (
              <div style={{ ...card, padding: "30px 20px", textAlign: "center" }}>
                <div style={{ display: "inline-block", marginBottom: 10, animation: "bfloat 3s ease-in-out infinite" }}><BeeMark size={50} face="sleep" color={C.ink3} /></div>
                <div style={{ color: C.textHi, fontWeight: 800, fontSize: 16 }}>Día limpio</div>
                <div style={{ color: C.textLo, fontSize: 13, marginTop: 4, maxWidth: 240, marginInline: "auto", lineHeight: 1.5 }}>No tienes nada para hoy. Disfrútalo o planifica algo.</div>
                <button onClick={() => go("agenda")} style={{ ...iconBtn, width: "auto", margin: "16px auto 0", paddingInline: 16, gap: 6, fontWeight: 800, fontSize: 13, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Plus size={15} strokeWidth={3} /> Planificar</button>
              </div>
            ) : (
              <div className="bstagger" style={{ display: "grid", gap: 10 }}>
                {todays.map((e) => (
                  <EventRow key={e.id} e={e} onToggle={() => dispatch({ type: "update", col: "events", id: e.id, patch: { done: !e.done } })} />
                ))}
              </div>
            )}
            <h3 style={{ ...sectionH, fontSize: 13.5, margin: "22px 0 12px" }}>Herramientas</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              <ToolButton icon={Camera} label="Cámara" accent={C.yellow} anim="camera" onClick={() => go("camara")} />
              <ToolButton icon={Lightbulb} label="Idea" accent={C.purple} anim="bulb" onClick={() => setIdeaOpen(true)} />
              <ToolButton icon={Calculator} label="Calcular" accent={C.yellow} anim="calc" onClick={() => setCalcOpen(true)} />
              <ToolButton icon={Cake} label="Cumpleaños" accent={C.purple} anim="cake" onClick={() => go("personas")} />
              <ToolButton icon={Users} label="Equipo" accent={C.purple} anim="team" onClick={() => go("equipo")} />
              <ToolButton icon={LineChart} label="Mercados" accent={C.yellow} anim="chart" onClick={openMarkets} />
              <ToolButton icon={Car} label="Conducción" accent={C.purple} active={state.drive?.active} anim="car" onClick={() => go("conduccion")} />
              <ToolButton icon={Smartphone} label="Pantalla" accent={C.yellow} anim="phone" onClick={() => go("pantalla")} />
            </div>
          </>
        )}

        {homeTab === "semana" && (
          <div>
            {week.map((d) => {
              const iso = localISO(d);
              const evs = evByDay(iso);
              const isToday = iso === todayL;
              return (
                <div key={iso} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 42, textAlign: "center", flexShrink: 0 }}>
                      <div style={{ color: isToday ? C.yellow : C.textLo, fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>{d.toLocaleDateString("es-ES", { weekday: "short" }).replace(".", "")}</div>
                      <div style={{ color: isToday ? C.textHi : C.textLo, fontSize: 20, fontWeight: 900, lineHeight: 1 }}>{d.getDate()}</div>
                    </div>
                    <div style={{ flex: 1, height: 1, background: C.line }} />
                    {isToday && <span style={{ color: C.ink, background: C.yellow, fontSize: 9.5, fontWeight: 800, borderRadius: 999, padding: "2px 8px", letterSpacing: 0.5 }}>HOY</span>}
                  </div>
                  {evs.length === 0 ? (
                    <div style={{ color: C.textLo, fontSize: 12.5, paddingLeft: 52, opacity: 0.55 }}>Sin planes</div>
                  ) : (
                    <div style={{ display: "grid", gap: 8, paddingLeft: 52 }}>
                      {evs.map((e) => (
                        <EventRow key={e.id} e={e} onToggle={() => dispatch({ type: "update", col: "events", id: e.id, patch: { done: !e.done } })} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <button onClick={() => go("agenda")} style={{ ...iconBtn, width: "100%", height: 46, gap: 8, fontWeight: 800, fontSize: 13.5, background: C.ink2 }}><CalendarDays size={16} /> Abrir agenda completa</button>
          </div>
        )}

        {homeTab === "vistazo" && (
          <>
            {ai && <div style={{ marginBottom: 14 }}><AiBrief ai={ai} state={state} /></div>}
            {birthday && (
              <button onClick={() => go("personas")} style={{ ...card, width: "100%", textAlign: "left", padding: "12px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", borderColor: C.purple, background: "rgba(144,19,254,.08)" }}>
                <Cake size={18} color={C.purple} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: C.textHi, fontWeight: 800, fontSize: 13.5 }}>{birthday.d === 0 ? `¡Hoy cumple ${birthday.p.name}!` : birthday.d === 1 ? `Mañana cumple ${birthday.p.name}` : `${birthday.p.name} cumple en ${birthday.d} días`}</div>
                  <div style={{ color: C.textLo, fontSize: 12 }}>{(birthday.p.giftIdeas || []).some((g) => !g.done) ? "Tienes ideas de regalo pendientes" : "Prepara un detalle"}</div>
                </div>
                <ChevronRight size={16} color={C.textLo} />
              </button>
            )}
            <div className="bstagger" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <StatCard label="Balance" value={money(balance)} icon={Wallet} accent={balance >= 0 ? C.good : C.bad} onClick={() => go("dinero")} />
              <StatCard label="Te deben" value={money(owedToMe)} icon={HandCoins} accent={C.yellow} onClick={() => go("dinero")} />
              <StatCard label="Objetivos vivos" value={goalsActive} icon={Target} accent={C.purple} onClick={() => go("cerebro")} />
              <StatCard label="Fiados fuera" value={fiadosOut} icon={Gift} accent={C.yellow} onClick={() => go("coleccion")} />
            </div>
            <SleepCard state={state} dispatch={dispatch} toast={toast} />
            <DailyQuote />
          </>
        )}
      </div>

      <div style={{ height: 24 }} />

      <Sheet open={aiOpen} onClose={() => setAiOpen(false)} title="Dile a Brosin">
        <HomeAI ai={ai} state={state} dispatch={dispatch} toast={toast} />
      </Sheet>
      <Sheet open={calcOpen} onClose={() => setCalcOpen(false)} title="Calculadora">
        <Calc />
      </Sheet>
      <Sheet open={ideaOpen} onClose={() => setIdeaOpen(false)} title="Guardar una idea">
        <QuickIdea onSave={(d) => { dispatch({ type: "add", col: "notes", item: { id: uid(), pinned: false, date: todayISO(), ...d } }); setIdeaOpen(false); toast && toast("Idea guardada ✓", d.title); }} />
      </Sheet>
    </div>
  );
}

const sectionH = { color: C.textHi, fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: 0.3, margin: 0 };
const linkBtn = { background: "none", border: "none", color: C.yellow, fontWeight: 700, fontSize: 12.5, display: "flex", alignItems: "center", gap: 2, cursor: "pointer" };

/* Frase motivadora del día (rota sola; botón para otra) */
function DailyQuote() {
  const [i, setI] = useState(() => { const d = new Date(); return (d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate()) % MOTIVATION.length; });
  const text = MOTIVATION[i];
  return (
    <div style={{ ...card, padding: "12px 14px", marginBottom: 16, background: C.tintY, border: "1px solid rgba(255,212,0,.22)", display: "flex", alignItems: "center", gap: 10 }}>
      <Quote size={16} color={C.yellow} style={{ flexShrink: 0, opacity: 0.9 }} />
      <div style={{ flex: 1, color: C.textHi, fontSize: 13.5, lineHeight: 1.5, fontStyle: "italic" }}>{text}</div>
      <SpeakBtn text={text} size={28} />
      <button onClick={() => setI((x) => (x + 1) % MOTIVATION.length)} title="Otra frase" style={{ ...iconBtn, width: 28, height: 28, flexShrink: 0 }}><RefreshCcw size={13} /></button>
    </div>
  );
}

/* ============================================================
   PERSONAS / CUMPLEAÑOS
   ============================================================ */
function PeopleScreen({ state, dispatch, back }) {
  const [sheet, setSheet] = useState(false);
  const [edit, setEdit] = useState(null);
  const people = [...(state.people || [])].sort((a, b) => { const da = daysUntilBirthday(a.birthday); const db = daysUntilBirthday(b.birthday); return (da == null ? 9999 : da) - (db == null ? 9999 : db); });
  const openNew = () => { setEdit(null); setSheet(true); };
  const openEdit = (p) => { setEdit(p); setSheet(true); };
  const save = (d) => { if (edit) dispatch({ type: "update", col: "people", id: edit.id, patch: d }); else dispatch({ type: "add", col: "people", item: { id: uid(), giftIdeas: [], ...d } }); setSheet(false); };
  return (
    <div style={{ padding: "20px 18px 0" }}>
      <button onClick={back} style={{ ...linkBtn, marginBottom: 10 }}><ChevronLeft size={16} /> Inicio</button>
      <Title kicker="Tu gente">Cumpleaños</Title>
      {people.length === 0 ? (
        <EmptyState face="happy" title="No olvides a los tuyos" sub="Añade los cumpleaños de tu familia y amigos, apunta ideas de regalo y ten los detalles listos. Brosin te avisa con tiempo." cta="Añadir persona" onCta={openNew} />
      ) : (
        <div className="bstagger" style={{ display: "grid", gap: 12 }}>
          {people.map((p) => <PersonCard key={p.id} p={p} dispatch={dispatch} onEdit={() => openEdit(p)} />)}
        </div>
      )}
      <div style={{ height: 122 }} />
      <FAB onClick={openNew} label="Persona" />
      <Sheet open={sheet} onClose={() => setSheet(false)} title={edit ? "Editar persona" : "Nueva persona"}>
        <PersonForm initial={edit} onSave={save} onDelete={edit ? () => { dispatch({ type: "remove", col: "people", id: edit.id }); setSheet(false); } : null} />
      </Sheet>
    </div>
  );
}
function PersonCard({ p, dispatch, onEdit }) {
  const [newIdea, setNewIdea] = useState("");
  const [msg, setMsg] = useState(null);
  const [msgBusy, setMsgBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const genMsg = async () => {
    setMsgBusy(true); setMsg(null);
    const sys = `Escribe una felicitación de cumpleaños breve, cálida y natural en español de España para ${p.name}${p.relation ? ` (${p.relation})` : ""}.${p.notes ? ` Datos que la hacen personal: ${p.notes}.` : ""} Tono cercano y sincero, sin cursiladas ni frases hechas, 2-3 frases, lista para enviar por WhatsApp. Devuelve solo el mensaje, sin comillas.`;
    try { const txt = await callClaude([{ role: "user", content: "Escríbeme la felicitación." }], sys); setMsg(txt.trim()); }
    catch (e) { setMsg("No pude generarla ahora. Reintenta en un momento."); }
    finally { setMsgBusy(false); }
  };
  const copyMsg = () => { try { navigator.clipboard && navigator.clipboard.writeText(msg); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {} };
  const days = daysUntilBirthday(p.birthday);
  const age = bdayAge(p.birthday);
  const ideas = p.giftIdeas || [];
  const patch = (x) => dispatch({ type: "update", col: "people", id: p.id, patch: x });
  const addIdea = () => { if (!newIdea.trim()) return; patch({ giftIdeas: [...ideas, { id: uid(), text: newIdea.trim(), done: false }] }); setNewIdea(""); };
  const toggle = (id) => patch({ giftIdeas: ideas.map((g) => g.id === id ? { ...g, done: !g.done } : g) });
  const del = (id) => patch({ giftIdeas: ideas.filter((g) => g.id !== id) });
  const isToday = days === 0;
  const soon = days != null && days <= 14;
  return (
    <div style={{ ...card, padding: 16, borderColor: isToday ? C.yellow : soon ? "#3a3200" : C.line }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {p.photo ? <Thumb src={p.photo} size={46} radius={14} /> : <div style={{ width: 46, height: 46, borderRadius: 14, background: C.ink3, display: "grid", placeItems: "center", flexShrink: 0, color: C.yellow, fontWeight: 900 }}>{initials(p.name)}</div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 800, fontSize: 16 }}>{p.name}</div>
          <div style={{ color: C.textLo, fontSize: 12.5 }}>{p.relation || "—"}{age != null ? ` · cumple ${age + 1}` : ""}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          {days != null && <div style={{ color: isToday ? C.yellow : C.textHi, fontWeight: 900, fontSize: 15 }}>{isToday ? "¡HOY!" : days === 1 ? "mañana" : `${days} días`}</div>}
          {p.birthday && <div style={{ color: C.textLo, fontSize: 11 }}>{bdayLabel(p.birthday)}</div>}
        </div>
        <button onClick={onEdit} style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Pencil size={14} /></button>
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ color: C.textLo, fontSize: 11.5, fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}><Gift size={13} color={C.purple} /> Regalos / detalles</div>
        <div style={{ display: "grid", gap: 6 }}>
          {ideas.map((g) => (
            <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => toggle(g.id)} style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, border: `2px solid ${g.done ? C.good : C.line}`, background: g.done ? C.good : "transparent", display: "grid", placeItems: "center", cursor: "pointer" }}>{g.done && <Check size={12} color={C.ink} strokeWidth={3.5} />}</button>
              <span style={{ flex: 1, color: g.done ? C.textLo : C.textHi, fontSize: 13, textDecoration: g.done ? "line-through" : "none" }}>{g.text}</span>
              <button onClick={() => del(g.id)} style={{ background: "none", border: "none", color: C.textLo, cursor: "pointer", padding: 3 }}><X size={12} /></button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input style={{ ...inputStyle, padding: "8px 12px", fontSize: 13 }} value={newIdea} onChange={(e) => setNewIdea(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addIdea()} placeholder="Idea de regalo o detalle…" />
          <button onClick={addIdea} style={{ ...iconBtn, width: 38, height: 38, background: C.purple, borderColor: C.purple }}><Plus size={16} color="#fff" strokeWidth={3} /></button>
        </div>
      </div>
      {p.notes && <div style={{ color: C.textLo, fontSize: 12.5, marginTop: 10, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{p.notes}</div>}

      {/* felicitación con IA */}
      <button onClick={genMsg} disabled={msgBusy} style={{ ...iconBtn, width: "100%", height: 40, marginTop: 12, gap: 8, fontWeight: 800, fontSize: 13, background: "rgba(144,19,254,.14)", borderColor: C.purple, color: C.purple }}>
        {msgBusy ? <span style={{ display: "inline-flex", animation: "bspin 1s linear infinite" }}><RefreshCcw size={15} /></span> : <Sparkles size={15} />}
        {msgBusy ? "Escribiendo…" : msg ? "Otra felicitación" : "Felicitación con IA"}
      </button>
      {msg && (
        <div style={{ ...card, padding: 12, marginTop: 8, background: C.well }}>
          <div style={{ color: C.textHi, fontSize: 13.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{msg}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={copyMsg} style={miniBtn(copied ? C.good : C.ink3, copied ? C.ink : C.textHi)}>{copied ? "¡Copiado!" : "Copiar"}</button>
            <SpeakBtn text={msg} tone={C.purple} />
          </div>
        </div>
      )}
    </div>
  );
}
function PersonForm({ initial, onSave, onDelete }) {
  const [name, setName] = useState(initial?.name || "");
  const [relation, setRelation] = useState(initial?.relation || "");
  const [birthday, setBirthday] = useState(initial?.birthday && initial.birthday.length === 10 ? initial.birthday : "");
  const [notes, setNotes] = useState(initial?.notes || "");
  const [photo, setPhoto] = useState(initial?.photo || null);
  const [remind, setRemind] = useState(initial?.remind !== false);
  const rels = ["Familia", "Pareja", "Amigo/a", "Trabajo", "Otro"];
  return (
    <div>
      <Field label="Nombre"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" autoFocus /></Field>
      <Field label="¿Quién es?"><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{rels.map((r) => <Chip key={r} active={relation === r} onClick={() => setRelation(relation === r ? "" : r)}>{r}</Chip>)}</div></Field>
      <Field label="Cumpleaños (el año es opcional, para la edad)"><input type="date" style={inputStyle} value={birthday} onChange={(e) => setBirthday(e.target.value)} /></Field>
      <button onClick={() => setRemind((r) => !r)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
        background: remind ? "rgba(255,212,0,.08)" : C.ink, border: `1.5px solid ${remind ? C.yellow : C.line}`,
        borderRadius: 14, padding: "12px 14px", cursor: "pointer",
      }}>
        <BellRing size={18} color={remind ? C.yellow : C.textLo} />
        <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14 }}>Avisarme antes del cumple</span>
        <span style={{ width: 44, height: 26, borderRadius: 999, background: remind ? C.yellow : C.line, position: "relative", transition: "all .2s" }}>
          <span style={{ position: "absolute", top: 3, left: remind ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: remind ? C.ink : "#777", transition: "all .2s" }} />
        </span>
      </button>
      <Field label="Notas (gustos, tallas, alergias…)"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Lo que quieras recordar de esta persona" /></Field>
      <Field label="Foto (opcional)"><PhotoPicker value={photo} onChange={setPhoto} /></Field>
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        {onDelete && <button onClick={onDelete} style={{ ...iconBtn, width: 54, height: 54, color: C.bad, borderRadius: 16 }}><Trash2 size={20} /></button>}
        <div style={{ flex: 1 }}>
          <PrimaryBtn full onClick={() => name.trim() && onSave({ name: name.trim(), relation, birthday, notes, photo, remind })}><Check size={18} strokeWidth={3} /> Guardar</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

/* AI quick-capture on Home — habla y te apunta eventos, gastos, notas u objetivos */
function HomeAI({ ai, state, dispatch, toast }) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [reply, setReply] = useState(null);
  const [err, setErr] = useState(null);
  if (!ai) return null;

  const run = async (textArg) => {
    const q = (typeof textArg === "string" ? textArg : input).trim();
    if (!q || busy) return;
    setBusy(true); setErr(null); setReply(null);
    const sys = `Eres el asistente de acciones de Brosin para ${state.profile.name || "el usuario"}. Hoy es ${todayISO()} (${fmtLong()}). Conviertes lo que te pide en lenguaje natural en acciones para su app. Devuelve SOLO un JSON válido (sin markdown, sin texto extra):
{"reply": "confirmación breve y natural en español de España", "actions": [ ... ]}
Cada acción es UNO de estos objetos:
- {"type":"event","title":"...","date":"YYYY-MM-DD","time":"HH:MM"|null,"kind":"Cita"|"Recordatorio"|"Tarea"|"Evento"|"Pago"|null}
- {"type":"tx","txType":"gasto"|"ingreso","amount":number,"note":"...","category":"General"|"Comida"|"Ocio"|"Hogar"|"Transporte"|"Nómina"|"Negocio"|"Colección"}
- {"type":"note","title":"...","body":"..."}
- {"type":"goal","title":"...","deadline":"YYYY-MM-DD"|null}
Reglas: interpreta fechas relativas ("mañana","el día 20","el viernes que viene") a fecha real a partir de hoy. No inventes importes, fechas ni horas que el usuario no haya dicho (si falta la hora, usa null). Puedes devolver varias acciones si lo pide. Si no hay ninguna acción clara, devuelve "actions":[] y una "reply" pidiendo el detalle que falte. Sé conciso.
=== CONTEXTO ACTUAL ===
${buildMemory(state)}`;
    try {
      const txt = await callClaude([{ role: "user", content: q }], sys);
      const j = parseClaudeJson(txt);
      if (!j) { setErr("noparse"); setBusy(false); return; }
      const acts = Array.isArray(j.actions) ? j.actions : [];
      let done = 0; const labels = [];
      acts.forEach((a) => {
        if (a.type === "event" && a.title && a.date) {
          dispatch({ type: "add", col: "events", item: { id: uid(), done: false, title: a.title, date: a.date, time: a.time || "", type: a.kind || "", remind: true, lead: null, nag: 0 } });
          done++; labels.push(`📅 ${a.title}`);
        } else if (a.type === "tx" && a.amount) {
          dispatch({ type: "add", col: "tx", item: { id: uid(), date: todayISO(), type: a.txType === "ingreso" ? "ingreso" : "gasto", amount: Number(a.amount), note: a.note || "", category: a.category || "General" } });
          done++; labels.push(`${a.txType === "ingreso" ? "＋" : "－"}${money(Number(a.amount))}`);
        } else if (a.type === "note" && (a.title || a.body)) {
          dispatch({ type: "add", col: "notes", item: { id: uid(), pinned: false, date: todayISO(), title: a.title || "Nota", body: a.body || "" } });
          done++; labels.push(`📝 ${a.title || "Nota"}`);
        } else if (a.type === "goal" && a.title) {
          dispatch({ type: "add", col: "goals", item: { id: uid(), steps: [], title: a.title, deadline: a.deadline || "" } });
          done++; labels.push(`🎯 ${a.title}`);
        }
      });
      setReply({ text: j.reply || (done ? "Hecho." : "No pillé una acción clara, dime algo más concreto."), labels });
      if (done && toast) toast("Apuntado ✓", labels.join(" · "));
      setInput("");
    } catch (e) { setErr(e.code || "net"); }
    finally { setBusy(false); }
  };

  return (
    <div style={{ ...card, padding: 12, marginTop: 12, border: "1px solid rgba(144,19,254,.5)", background: C.tintP, boxShadow: "0 1px 0 rgba(255,255,255,.07) inset, 0 6px 18px rgba(144,19,254,.14), 0 10px 26px rgba(0,0,0,.35)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <Sparkles size={15} color={C.purple} />
        <span style={{ color: C.purple, fontWeight: 800, fontSize: 12, letterSpacing: 0.8, textTransform: "uppercase", flex: 1 }}>Dile a Brosin y lo apunta</span>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input style={{ ...inputStyle, borderRadius: 999, padding: "10px 14px" }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} placeholder='"cita dentista el 20 a las 17h"' />
        <MicButton onResult={setInput} base={input} size={44} />
        <button className="b3d-purple" onClick={() => run()} disabled={busy} style={{ width: 44, height: 44, borderRadius: 999, flexShrink: 0, background: C.purple, border: "none", display: "grid", placeItems: "center", cursor: "pointer", opacity: busy ? 0.5 : 1 }}>
          {busy ? <span style={{ display: "inline-flex", animation: "bspin 1s linear infinite" }}><RefreshCcw size={18} color="#fff" /></span> : <Send size={18} color="#fff" />}
        </button>
      </div>
      {err && <div style={{ color: C.textLo, fontSize: 12.5, marginTop: 8 }}>{err === "noparse" ? "No te entendí del todo, prueba a decirlo más claro." : (AI_ERR[err] || AI_ERR.http)}</div>}
      {reply && (
        <div style={{ marginTop: 10, display: "flex", alignItems: "flex-start", gap: 8 }}>
          <div style={{ flex: 1, color: C.textHi, fontSize: 13.5, lineHeight: 1.5 }}>{reply.text}</div>
          <SpeakBtn text={reply.text} tone={C.purple} />
        </div>
      )}
    </div>
  );
}

function ShortcutCard({ icon: Ico, label, accent, onClick, active }) {
  return (
    <button onClick={onClick} style={{
      ...card, padding: "12px 14px", display: "flex", alignItems: "center", gap: 9, cursor: "pointer", flexShrink: 0,
      borderColor: active ? accent : C.line, background: active ? "rgba(144,19,254,.12)" : C.ink2,
    }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: accent, display: "grid", placeItems: "center" }}><Ico size={16} color={accent === C.purple ? "#fff" : C.ink} /></div>
      <span style={{ color: C.textHi, fontWeight: 800, fontSize: 13.5, whiteSpace: "nowrap" }}>{label}</span>
      {active && <span style={{ width: 7, height: 7, borderRadius: 999, background: accent }} />}
    </button>
  );
}
function SleepCard({ state, dispatch, toast }) {
  const [open, setOpen] = useState(false);
  const [logDate, setLogDate] = useState(todayISO());
  const goal = state.profile.sleepGoal || 8;
  const min = state.profile.sleepMin || 7;
  const log = state.sleepLog || [];
  const t = todayISO();
  const last = [...log].sort((a, b) => b.date.localeCompare(a.date))[0];
  const lastIsToday = last && last.date === t;
  const low = last && last.hours < min;
  const logHours = (h) => {
    const d = logDate || t;
    const next = [...log.filter((e) => e.date !== d), { date: d, hours: h }];
    dispatch({ type: "setCol", col: "sleepLog", items: next });
    setOpen(false);
    if (h < min && toast) toast("A descansar, bro", `Solo ${h} h ${d === t ? "esta noche" : "ese día"}. Tu cuerpo necesita más — cuídate.`);
  };
  const openFor = (d) => { setLogDate(d || t); setOpen(true); };
  // last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push(d.toISOString().slice(0, 10)); }
  const bars = days.map((d) => { const e = log.find((x) => x.date === d); return { d, h: e ? e.hours : 0 }; });
  const avg = (() => { const v = log.slice(-7).map((e) => e.hours); return v.length ? (v.reduce((a, b) => a + b, 0) / v.length) : 0; })();
  const quick = [5, 6, 7, 8, 9, 10];

  return (
    <div style={{ ...card, padding: 16, marginBottom: 18, borderColor: low ? C.bad : C.line, background: low ? "rgba(255,92,92,.06)" : C.ink2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Moon size={16} color={low ? C.bad : C.yellow} />
        <span style={{ color: C.textHi, fontWeight: 800, fontSize: 14.5, flex: 1 }}>Descanso</span>
        {avg > 0 && <span style={{ color: C.textLo, fontSize: 12, fontWeight: 700 }}>media {avg.toFixed(1)}h</span>}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
        <div style={{ minWidth: 92 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
            <span style={{ color: low ? C.bad : C.textHi, fontWeight: 900, fontSize: 34, lineHeight: 1 }}>{last ? last.hours : "—"}</span>
            <span style={{ color: C.textLo, fontWeight: 800, fontSize: 15 }}>h</span>
          </div>
          <div style={{ color: C.textLo, fontSize: 11.5, marginTop: 3 }}>{lastIsToday ? "hoy" : last ? "última noche" : "sin registrar"}</div>
        </div>
        {/* 7-day bars */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 5, height: 52 }}>
          {bars.map((b, i) => (
            <button key={i} onClick={() => openFor(b.d)} title="Tocar para registrar/editar ese día" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
              <div style={{ width: "100%", height: 42, display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "100%", height: `${Math.max(6, Math.min(100, (b.h / 10) * 100))}%`, background: b.h === 0 ? C.ink3 : b.h < min ? "linear-gradient(180deg,#ff7d7d,#e04444)" : "linear-gradient(180deg,#ffe561,#eec400)", borderRadius: 4, transition: "height .4s", opacity: b.h === 0 ? 0.5 : 1, boxShadow: b.h === 0 ? "none" : b.h < min ? "0 2px 8px rgba(255,92,92,.3)" : "0 2px 8px rgba(255,212,0,.28)" }} />
              </div>
              <span style={{ fontSize: 8.5, color: b.d === logDate && open ? C.yellow : C.textLo, fontWeight: b.d === logDate && open ? 800 : 400 }}>{["L", "M", "X", "J", "V", "S", "D"][(new Date(b.d + "T00:00:00").getDay() + 6) % 7]}</span>
            </button>
          ))}
        </div>
      </div>

      {low && (
        <div style={{ color: C.bad, fontWeight: 700, fontSize: 12.5, marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <Moon size={13} /> Necesitas descansar, bro. Vienes por debajo de lo normal.
        </div>
      )}

      {open ? (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ color: C.textLo, fontSize: 12, fontWeight: 700 }}>Día:</span>
            <input type="date" max={todayISO()} value={logDate} onChange={(e) => setLogDate(e.target.value)} style={{ ...inputStyle, padding: "8px 10px", width: "auto", fontSize: 13 }} />
            {logDate !== todayISO() && <span style={{ color: C.yellow, fontSize: 11.5, fontWeight: 700 }}>editando {fmtDate(logDate)}</span>}
          </div>
          <div style={{ color: C.textLo, fontSize: 12, marginBottom: 8 }}>¿Cuántas horas dormiste {logDate === todayISO() ? "hoy" : "ese día"}? (lo normal son {min}–9h)</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {quick.map((h) => <Chip key={h} onClick={() => logHours(h)}>{h}h</Chip>)}
            <Chip onClick={() => logHours(4)}>&lt;5h</Chip>
            <Chip onClick={() => logHours(11)}>+10h</Chip>
          </div>
          <button onClick={() => setOpen(false)} style={{ ...iconBtn, width: "auto", paddingInline: 12, height: 34, marginTop: 10, gap: 6, fontSize: 12.5, color: C.textLo }}><X size={13} /> Cerrar</button>
        </div>
      ) : (
        <button onClick={() => openFor(todayISO())} style={{ ...iconBtn, width: "100%", height: 42, marginTop: 12, gap: 8, fontWeight: 800, fontSize: 13.5, background: C.ink3 }}>
          <Moon size={15} /> {lastIsToday ? "Editar sueño · registrar otro día" : "Registrar tu sueño"}
        </button>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Ico, accent, onClick }) {
  return (
    <button onClick={onClick} style={{ ...card, padding: 14, textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: accent, display: "grid", placeItems: "center", boxShadow: `0 1px 0 rgba(255,255,255,.35) inset, 0 -1.5px 0 rgba(0,0,0,.25) inset, 0 4px 12px ${accent}55` }}>
        <Ico size={17} color={C.ink} />
      </div>
      <div>
        <div style={{ color: C.textHi, fontWeight: 900, fontSize: 19, lineHeight: 1, letterSpacing: -0.5, fontVariantNumeric: "tabular-nums" }}>{value}</div>
        <div style={{ color: C.textLo, fontSize: 10.5, marginTop: 4, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>{label}</div>
      </div>
    </button>
  );
}

function EventRow({ e, onToggle, compact }) {
  return (
    <div style={{ ...card, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, opacity: e.done ? 0.55 : 1 }}>
      {onToggle ? (
        <button onClick={onToggle} style={{
          width: 26, height: 26, borderRadius: 8, flexShrink: 0, cursor: "pointer",
          border: `2px solid ${e.done ? C.yellow : C.edgeHi}`,
          background: e.done ? "linear-gradient(180deg,#ffe561,#eec400)" : C.edgeSoft,
          boxShadow: e.done
            ? "0 1px 0 rgba(255,255,255,.4) inset, 0 3px 10px rgba(255,212,0,.35)"
            : "0 1px 3px rgba(0,0,0,.2) inset",
          display: "grid", placeItems: "center",
        }}>
          {e.done && <Check size={15} color={C.ink} strokeWidth={3.5} />}
        </button>
      ) : (
        <div style={{ width: 8, height: 8, borderRadius: 999, background: C.yellow, boxShadow: "0 0 8px rgba(255,212,0,.5)", flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5, textDecoration: e.done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {e.title}
        </div>
        <div style={{ color: C.textLo, fontSize: 12, marginTop: 2, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {compact && <span>{fmtDate(e.date)}</span>}
          {e.time && (<span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={11} /> {e.time}</span>)}
          {e.type && <span style={{ color: C.yellow }}>· {e.type}</span>}
          {e.remind !== false && <BellRing size={11} color={C.textLo} />}
        </div>
      </div>
      {e.photo && <Thumb src={e.photo} size={40} radius={10} />}
    </div>
  );
}

/* AI daily brief card */
function AiBrief({ ai, state }) {
  const [out, setOut] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const sys = `Eres la mente de Brosin, la conciencia inteligente de ${state.profile.name || "tu usuario"}: articulada, serena y con criterio. Tuteas, sin jerga ni muletillas; nada de "bro" ni vacile. Conoces todo lo que tiene registrado (memoria abajo). Redacta un parte del día BREVE (máx 3 frases), con elegancia y enfoque: destaca lo relevante de hoy (agenda, dinero, objetivos o algo que sobresalga de su memoria) y deja una idea o empujón que merezca leerse. Prosa limpia, sin markdown, sin firmas.\n\n=== MEMORIA ===\n${buildMemory(state)}`;
    try {
      const txt = await callClaude([{ role: "user", content: "Dame el parte de hoy." }], sys);
      setOut(txt.trim());
    } catch (e) {
      setErr(e.code || "net");
    } finally {
      setLoading(false);
    }
  }, [state]);

  if (!ai) return null;

  return (
    <div style={{ ...card, padding: 16, background: C.tintY, border: "1px solid rgba(255,212,0,.25)", boxShadow: "0 1px 0 rgba(255,255,255,.06) inset, 0 8px 22px rgba(255,212,0,.08), 0 10px 26px rgba(0,0,0,.35)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Sparkles size={16} color={C.yellow} />
        <span style={{ color: C.accentText, fontWeight: 800, fontSize: 12.5, letterSpacing: 1.6, textTransform: "uppercase", flex: 1 }}>El parte del día</span>
        {out && !loading && !err && <SpeakBtn text={out} />}
      </div>
      {loading ? (
        <LoadingPulse lines={2} />
      ) : err ? (
        <div>
          <div style={{ color: C.textLo, fontSize: 13.5, marginBottom: 10 }}>{AI_ERR[err] || AI_ERR.http}</div>
          <button onClick={run} style={{ ...iconBtn, width: "auto", paddingInline: 14, gap: 6, fontWeight: 700, fontSize: 13 }}>
            <RefreshCcw size={14} /> Reintentar
          </button>
        </div>
      ) : out ? (
        <div style={{ color: C.textHi, fontSize: 14.5, lineHeight: 1.55 }}>{out}</div>
      ) : (
        <button onClick={run} style={{
          background: "transparent", border: `1.5px dashed ${C.line}`, borderRadius: 14, width: "100%",
          padding: "12px", color: C.yellow, fontWeight: 800, fontSize: 13.5, cursor: "pointer",
        }}>
          Pídele a Brosin el resumen de tu día
        </button>
      )}
    </div>
  );
}

/* ============================================================
   AGENDA
   ============================================================ */
function AgendaScreen({ state, dispatch }) {
  const [sheet, setSheet] = useState(false);
  const [edit, setEdit] = useState(null);
  const [presetDate, setPresetDate] = useState(null);
  const [view, setView] = useState("lista"); // lista | mes

  const sorted = [...state.events].sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || "")));
  const grouped = {};
  sorted.forEach((e) => {
    const k = e.date;
    (grouped[k] = grouped[k] || []).push(e);
  });
  const keys = Object.keys(grouped).sort();

  const openNew = () => { setEdit(null); setPresetDate(null); setSheet(true); };
  const openNewOn = (iso) => { setEdit(null); setPresetDate(iso); setSheet(true); };
  const openEdit = (e) => { setEdit(e); setPresetDate(null); setSheet(true); };
  const closeSheet = () => { setSheet(false); setPresetDate(null); };
  const save = (data) => {
    if (edit) dispatch({ type: "update", col: "events", id: edit.id, patch: data });
    else dispatch({ type: "add", col: "events", item: { id: uid(), done: false, ...data } });
    closeSheet();
  };

  return (
    <div style={{ padding: "20px 18px 0" }}>
      <Title kicker="Tu tiempo">Agenda</Title>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Chip active={view === "lista"} onClick={() => setView("lista")}>Próximos</Chip>
        <Chip active={view === "mes"} onClick={() => setView("mes")}>Mes</Chip>
      </div>

      {view === "mes" ? (
        <MonthView events={state.events} onPick={openEdit} onAddDay={openNewOn} />
      ) : keys.length === 0 ? (
        <EmptyState face="sleep" title="Agenda en blanco" sub="Añade tu primer evento o recordatorio y Brosin te avisa cuando toque." cta="Crear evento" onCta={openNew} />
      ) : (
        <div className="bstagger" style={{ display: "grid", gap: 18 }}>
          {keys.map((k) => {
            const d = daysFromNow(k);
            const lbl = d === 0 ? "Hoy" : d === 1 ? "Mañana" : d === -1 ? "Ayer" : fmtDate(k);
            return (
              <div key={k}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: d === 0 ? C.accentText : C.textHi, fontWeight: 900, fontSize: 14, textTransform: "capitalize" }}>{lbl}</span>
                  {d < 0 && <span style={{ color: C.textLo, fontSize: 11 }}>pasado</span>}
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  {grouped[k].sort((a, b) => (a.time || "").localeCompare(b.time || "")).map((e) => (
                    <div key={e.id} onClick={() => openEdit(e)} style={{ cursor: "pointer" }}>
                      <EventRow e={e} onToggle={() => dispatch({ type: "update", col: "events", id: e.id, patch: { done: !e.done } })} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ height: 122 }} />
      <FAB onClick={openNew} label="Evento" />

      <Sheet open={sheet} onClose={closeSheet} title={edit ? "Editar evento" : "Nuevo evento"}>
        <EventForm initial={edit || (presetDate ? { date: presetDate } : null)} onSave={save} onDelete={edit ? () => { dispatch({ type: "remove", col: "events", id: edit.id }); closeSheet(); } : null} />
      </Sheet>
    </div>
  );
}

function EventForm({ initial, onSave, onDelete }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [date, setDate] = useState(initial?.date?.slice(0, 10) || todayISO());
  const [time, setTime] = useState(initial?.time || "");
  const [type, setType] = useState(initial?.type || "");
  const [notes, setNotes] = useState(initial?.notes || "");
  const [photo, setPhoto] = useState(initial?.photo || null);
  const [remind, setRemind] = useState(initial?.remind !== false);
  const [lead, setLead] = useState(initial?.lead ?? null);
  const [nag, setNag] = useState(initial?.nag || 0);
  const types = ["Cita", "Recordatorio", "Tarea", "Evento", "Pago"];
  const leadOpts = [
    { v: null, l: "Por defecto" },
    { v: 0, l: "Al momento" },
    { v: 10, l: "10 min antes" },
    { v: 30, l: "30 min antes" },
    { v: 60, l: "1 h antes" },
    { v: 120, l: "2 h antes" },
    { v: 1440, l: "1 día antes" },
  ];
  const nagOpts = [
    { v: 0, l: "No insistir" },
    { v: 10, l: "cada 10 min" },
    { v: 30, l: "cada 30 min" },
    { v: 60, l: "cada hora" },
    { v: 120, l: "cada 2 h" },
    { v: 180, l: "cada 3 h" },
    { v: 300, l: "cada 5 h" },
  ];
  return (
    <div>
      <Field label="¿Qué es?"><input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título del evento" autoFocus /></Field>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><Field label="Fecha"><input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} /></Field></div>
        <div style={{ flex: 1 }}><Field label="Hora"><input type="time" style={inputStyle} value={time} onChange={(e) => setTime(e.target.value)} /></Field></div>
      </div>
      <Field label="Tipo">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {types.map((t) => <Chip key={t} active={type === t} onClick={() => setType(type === t ? "" : t)}>{t}</Chip>)}
        </div>
      </Field>
      {/* remind master toggle */}
      <button onClick={() => setRemind((r) => !r)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
        background: remind ? "rgba(255,212,0,.08)" : C.ink, border: `1.5px solid ${remind ? C.yellow : C.line}`,
        borderRadius: 14, padding: "12px 14px", cursor: "pointer",
      }}>
        <BellRing size={18} color={remind ? C.yellow : C.textLo} />
        <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14 }}>Avisos de este evento</span>
        <span style={{ width: 44, height: 26, borderRadius: 999, background: remind ? C.yellow : C.line, position: "relative", transition: "all .2s" }}>
          <span style={{ position: "absolute", top: 3, left: remind ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: remind ? C.ink : "#777", transition: "all .2s" }} />
        </span>
      </button>
      {remind && (
        <>
          <Field label="① Aviso único (una vez, antes del evento)">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {leadOpts.map((o) => <Chip key={String(o.v)} active={lead === o.v} onClick={() => setLead(o.v)}>{o.l}</Chip>)}
            </div>
          </Field>
          <Field label="② Insistir (repetido hasta que lo marques hecho)">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {nagOpts.map((o) => <Chip key={o.v} active={nag === o.v} onClick={() => setNag(o.v)}>{o.l}</Chip>)}
            </div>
          </Field>
        </>
      )}
      <Field label="Foto (opcional)"><PhotoPicker value={photo} onChange={setPhoto} /></Field>
      <Field label="Notas"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Opcional" /></Field>
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        {onDelete && <button onClick={onDelete} style={{ ...iconBtn, width: 54, height: 54, color: C.bad, borderRadius: 16 }}><Trash2 size={20} /></button>}
        <div style={{ flex: 1 }}>
          <PrimaryBtn full onClick={() => title.trim() && onSave({ title: title.trim(), date, time, type, notes, photo, remind, lead, nag })}>
            <Check size={18} strokeWidth={3} /> Guardar
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function MonthGrid({ y, m, events, onDay, onPick, selected, compact }) {
  const first = new Date(y, m, 1);
  const startDow = (first.getDay() + 6) % 7; // Mon=0
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const tISO = todayISO();
  const evsOf = (iso) => events.filter((e) => sameDay(e.date, iso));
  const cell = compact ? 26 : 36;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 5 }}>
        {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => <div key={i} style={{ textAlign: "center", color: C.textLo, fontSize: compact ? 9 : 11, fontWeight: 700 }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const evs = evsOf(iso);
          const isToday = iso === tISO;
          const isPast = iso < tISO;
          const hasEv = evs.length > 0;
          const allDone = hasEv && evs.every((e) => e.done);
          const isSel = selected === iso;
          return (
            <button key={i} onClick={() => { if (onDay) onDay(iso, evs); else if (evs[0] && onPick) onPick(evs[0]); }} style={{
              height: cell, borderRadius: 10, cursor: "pointer", position: "relative",
              display: "grid", placeItems: "center", fontSize: compact ? 10.5 : 13, fontWeight: 700,
              background: isToday ? C.yellow : isSel ? "rgba(255,212,0,.16)" : "transparent",
              border: isSel && !isToday ? `2px solid ${C.yellow}` : (hasEv && !isToday ? `2px solid ${allDone ? C.line : C.yellow}` : "2px solid transparent"),
              color: isToday ? C.ink : isPast ? C.textLo : C.textHi,
              opacity: isPast && !hasEv ? 0.5 : 1,
              textDecoration: isPast && !isToday ? "line-through" : "none",
            }}>
              {d}
              {hasEv && !isToday && (
                <div style={{ position: "absolute", bottom: 3, display: "flex", gap: 2 }}>
                  {evs.slice(0, 3).map((e, k) => <span key={k} style={{ width: 4, height: 4, borderRadius: 999, background: e.done ? C.line : C.yellow }} />)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MonthView({ events, onPick, onAddDay }) {
  const [cursor, setCursor] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [sel, setSel] = useState(null);
  const first = new Date(cursor.y, cursor.m, 1);
  const monthName = first.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const move = (delta) => { setSel(null); setCursor((c) => { const nm = c.m + delta; return { y: c.y + Math.floor(nm / 12), m: ((nm % 12) + 12) % 12 }; }); };
  const nm = cursor.m + 1, nextY = cursor.y + Math.floor(nm / 12), nextM = ((nm % 12) + 12) % 12;
  const nextName = new Date(nextY, nextM, 1).toLocaleDateString("es-ES", { month: "long" });
  const nextEvs = events.filter((e) => { const d = e.date && e.date.slice(0, 7); return d === `${nextY}-${String(nextM + 1).padStart(2, "0")}`; }).sort((a, b) => a.date.localeCompare(b.date));
  const selEvs = sel ? events.filter((e) => sameDay(e.date, sel)).sort((a, b) => (a.time || "").localeCompare(b.time || "")) : [];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ ...card, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => move(-1)} style={iconBtn}><ChevronLeft size={18} /></button>
          <span style={{ color: C.textHi, fontWeight: 800, textTransform: "capitalize", fontSize: 15 }}>{monthName}</span>
          <button onClick={() => move(1)} style={iconBtn}><ChevronRight size={18} /></button>
        </div>
        <MonthGrid y={cursor.y} m={cursor.m} events={events} selected={sel} onDay={(iso) => setSel((s) => s === iso ? null : iso)} />

        {sel && (
          <div style={{ marginTop: 12, borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ color: C.textHi, fontWeight: 800, fontSize: 13.5, textTransform: "capitalize" }}>{fmtDate(sel)}</span>
              <button onClick={() => onAddDay && onAddDay(sel)} style={{ ...iconBtn, width: "auto", paddingInline: 12, height: 32, gap: 6, fontSize: 12.5, fontWeight: 800, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Plus size={14} color={C.ink} strokeWidth={3} /> Añadir</button>
            </div>
            {selEvs.length === 0 ? (
              <div style={{ color: C.textLo, fontSize: 12.5 }}>Nada este día. Pulsa "Añadir" para crear algo.</div>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                {selEvs.map((e) => (
                  <div key={e.id} onClick={() => onPick && onPick(e)} style={{ cursor: "pointer" }}><EventRow e={e} /></div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
          <span style={{ color: C.textLo, fontSize: 10.5, display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: C.yellow }} /> hoy</span>
          <span style={{ color: C.textLo, fontSize: 10.5, display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 12, height: 12, borderRadius: 6, border: `2px solid ${C.yellow}` }} /> con evento</span>
          <span style={{ color: C.textLo, fontSize: 10.5, textDecoration: "line-through" }}>día pasado</span>
        </div>
      </div>

      {/* next month — visual preview of what's coming */}
      <div style={{ ...card, padding: 14, opacity: 0.92 }}>
        <div style={{ color: C.yellow, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Lo que viene · {nextName}</div>
        <MonthGrid y={nextY} m={nextM} events={events} onPick={onPick} compact />
        {nextEvs.length > 0 && (
          <div style={{ marginTop: 10, display: "grid", gap: 4 }}>
            {nextEvs.slice(0, 4).map((e) => (
              <div key={e.id} style={{ color: C.textLo, fontSize: 12, display: "flex", gap: 6 }}>
                <span style={{ color: C.yellow, fontWeight: 700 }}>{fmtDate(e.date)}</span> {e.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   DINERO
   ============================================================ */
function MoneyScreen({ state, dispatch, tab, setTab, toast }) {
  const [sheet, setSheet] = useState(null); // 'tx' | 'debt' | 'inv'
  const [editInv, setEditInv] = useState(null);
  const [editDebt, setEditDebt] = useState(null);
  const [chartDetail, setChartDetail] = useState(null);
  const [invPrices, setInvPrices] = useState({});

  // Live crypto prices for linked investments (fixes "el BTC sube y mi inversión no")
  useEffect(() => {
    const ids = [...new Set(state.investments.filter((i) => i.kind === "crypto" && i.cg).map((i) => i.cg))];
    if (!ids.length) return;
    let alive = true;
    const load = () => fetchCrypto(ids).then((d) => {
      if (!alive) return;
      const p = {}; ids.forEach((id) => { if (d[id] && d[id].eur != null) p[id] = d[id].eur; });
      setInvPrices((prev) => ({ ...prev, ...p }));
    }).catch(() => {});
    load();
    const iv = setInterval(load, 60000);
    return () => { alive = false; clearInterval(iv); };
  }, [state.investments.map((i) => i.kind === "crypto" ? i.cg : "").join(",")]);

  const curVal = (i) => (i.kind === "crypto" && invPrices[i.cg] != null && i.qty != null) ? Number(i.qty) * invPrices[i.cg] : Number(i.current || 0);

  const balance = state.tx.reduce((s, x) => s + (x.type === "ingreso" ? 1 : -1) * Number(x.amount || 0), 0);
  const income = state.tx.filter((x) => x.type === "ingreso").reduce((s, x) => s + Number(x.amount || 0), 0);
  const spend = state.tx.filter((x) => x.type === "gasto").reduce((s, x) => s + Number(x.amount || 0), 0);
  const invTotal = state.investments.reduce((s, i) => s + curVal(i), 0);
  const invCost = state.investments.reduce((s, i) => s + Number(i.invested || 0), 0);
  const invPnl = invTotal - invCost;

  return (
    <div style={{ padding: "20px 18px 0" }}>
      <Title kicker="Tus cuentas">Dinero</Title>

      {/* hero balance */}
      <div style={{
        ...card, padding: 18, marginBottom: 14,
        background: "linear-gradient(160deg,#ffe973 0%,#FFD400 45%,#eab500 100%)",
        border: "1px solid rgba(255,255,255,.25)",
        boxShadow: "0 1px 0 rgba(255,255,255,.55) inset, 0 -3px 0 rgba(0,0,0,.14) inset, 0 10px 30px rgba(255,212,0,.22), 0 14px 34px rgba(0,0,0,.45)",
      }}>
        <div style={{ color: "rgba(0,0,0,.62)", fontSize: 11.5, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>Balance total</div>
        <div key={String(balance)} style={{ color: C.ink, fontWeight: 900, fontSize: 38, lineHeight: 1.05, marginTop: 2, letterSpacing: -1.2, fontVariantNumeric: "tabular-nums", animation: "bnumpop .3s cubic-bezier(.2,.9,.3,1)" }}>{money(balance)}</div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.28)", borderRadius: 999, padding: "4px 10px", boxShadow: "0 1px 0 rgba(255,255,255,.35) inset" }}>
            <ArrowDownRight size={15} color="#0a7a3f" /><span style={{ color: C.ink, fontWeight: 800, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>{money(income)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(0,0,0,.1)", borderRadius: 999, padding: "4px 10px", boxShadow: "0 1px 2px rgba(0,0,0,.12) inset" }}>
            <ArrowUpRight size={15} color="#9a2020" /><span style={{ color: C.ink, fontWeight: 800, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>{money(spend)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch", scrollSnapType: "x proximity" }}>
        <Chip active={tab === "movimientos"} onClick={() => setTab("movimientos")}>Movimientos</Chip>
        <Chip active={tab === "mercados"} onClick={() => setTab("mercados")}>Mercados</Chip>
        <Chip active={tab === "graficas"} onClick={() => setTab("graficas")}>Gráficas</Chip>
        <Chip active={tab === "deudas"} onClick={() => setTab("deudas")}>Deudas</Chip>
        <Chip active={tab === "inversiones"} onClick={() => setTab("inversiones")}>Inversiones</Chip>
        <Chip active={tab === "compartida"} onClick={() => setTab("compartida")}>Compartida</Chip>
        <Chip active={tab === "ahorro"} onClick={() => setTab("ahorro")}>Ahorro</Chip>
      </div>

      {tab === "compartida" && <SharedInvPanel state={state} dispatch={dispatch} />}
      {tab === "ahorro" && <SavingsPanel state={state} dispatch={dispatch} />}

      {tab === "mercados" && <MarketsPanel state={state} dispatch={dispatch} toast={toast} />}

      {tab === "graficas" && (
        state.tx.length === 0 ? (
          <EmptyState face="neutral" title="Sin datos para graficar" sub="Apunta algunos movimientos y aquí verás tu dinero en gráficas." cta="Añadir movimiento" onCta={() => setSheet("tx")} />
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            <ExpandableChart onExpand={() => setChartDetail("meses")}><MonthlyBars tx={state.tx} /></ExpandableChart>
            {/* mismos guards que dentro de cada chart: si el chart no pinta, su envoltorio (y la etiqueta "desglosar") tampoco */}
            {state.tx.filter((x) => x.date).length >= 2 && (
              <ExpandableChart onExpand={() => setChartDetail("balance")}><BalanceLine tx={state.tx} /></ExpandableChart>
            )}
            {state.tx.some((x) => x.type === "gasto" && Number(x.amount)) && (
              <ExpandableChart onExpand={() => setChartDetail("categorias")}><CategoryDonut tx={state.tx} /></ExpandableChart>
            )}
            {state.investments.length > 0 && (
              <ExpandableChart onExpand={() => setChartDetail("inversiones")}>
                <HBars icon={Landmark} title="Inversiones (valor actual)" sub={money(invTotal)} accent={C.yellow}
                  data={state.investments.map((i) => ({ label: i.name, value: curVal(i), display: money(curVal(i)) })).sort((a, b) => b.value - a.value)} />
              </ExpandableChart>
            )}
          </div>
        )
      )}

      {tab === "movimientos" && (
        <Section
          empty={state.tx.length === 0}
          emptyT="Sin movimientos"
          emptyS="Apunta ingresos y gastos para ver tu balance real."
          onAdd={() => setSheet("tx")}
        >
          {[...state.tx].sort((a, b) => (b.date || "").localeCompare(a.date || "")).map((x) => (
            <div key={x.id} style={{ ...card, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: C.ink3, display: "grid", placeItems: "center" }}>
                {x.type === "ingreso" ? <TrendingUp size={18} color={C.good} /> : <TrendingDown size={18} color={C.bad} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>{x.note || (x.type === "ingreso" ? "Ingreso" : "Gasto")}</div>
                <div style={{ color: C.textLo, fontSize: 12 }}>{x.category} · {fmtDate(x.date)}</div>
              </div>
              <div style={{ color: x.type === "ingreso" ? C.good : C.textHi, fontWeight: 900, fontSize: 15 }}>
                {x.type === "ingreso" ? "+" : "−"}{money(x.amount).replace("−", "")}
              </div>
              <button onClick={() => dispatch({ type: "remove", col: "tx", id: x.id })} style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Trash2 size={14} /></button>
            </div>
          ))}
        </Section>
      )}

      {tab === "deudas" && (
        <Section
          empty={state.debts.length === 0}
          emptyT="Cuentas claras"
          emptyS="Registra quién te debe y a quién debes tú."
          onAdd={() => setSheet("debt")}
        >
          {state.debts.map((d) => (
            <DebtCard key={d.id} d={d} dispatch={dispatch} onEdit={() => { setEditDebt(d); setSheet("debt"); }} />
          ))}
        </Section>
      )}

      {tab === "inversiones" && (
        <Section
          empty={state.investments.length === 0}
          emptyT="Aún sin inversiones"
          emptyS="Sigue tus inversiones y mira cómo evolucionan."
          onAdd={() => setSheet("inv")}
          header={
            state.investments.length > 0 && (
              <div style={{ ...card, padding: 14, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: C.textLo, fontSize: 11, fontWeight: 700, letterSpacing: 1.2 }}>VALOR ACTUAL</div>
                  <div style={{ color: C.textHi, fontWeight: 900, fontSize: 23, letterSpacing: -0.6, fontVariantNumeric: "tabular-nums" }}>{money(invTotal)}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: C.textLo, fontSize: 11, fontWeight: 700, letterSpacing: 1.2 }}>GANANCIA</div>
                  <div style={{ color: invPnl >= 0 ? C.good : C.bad, fontWeight: 900, fontSize: 18, letterSpacing: -0.4, fontVariantNumeric: "tabular-nums" }}>{invPnl >= 0 ? "+" : ""}{money(invPnl)}</div>
                </div>
              </div>
            )
          }
        >
          {state.investments.map((i) => {
            const cv = curVal(i);
            const pnl = cv - Number(i.invested || 0);
            const pct = i.invested ? (pnl / i.invested) * 100 : 0;
            const isCrypto = i.kind === "crypto";
            return (
              <button key={i.id} onClick={() => { setEditInv(i); setSheet("inv"); }} style={{ ...card, padding: 14, width: "100%", textAlign: "left", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: C.ink3, display: "grid", placeItems: "center" }}>{isCrypto ? <Coins size={18} color={C.yellow} /> : <Landmark size={18} color={C.yellow} />}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5, display: "flex", alignItems: "center", gap: 6 }}>
                      {i.name}
                      {isCrypto && <span style={{ fontSize: 9.5, fontWeight: 800, color: C.ink, background: C.yellow, borderRadius: 5, padding: "1px 5px" }}>EN VIVO</span>}
                    </div>
                    <div style={{ color: C.textLo, fontSize: 12 }}>{isCrypto ? `${i.qty} ${i.sym} · invertido ${money(i.invested)}` : `Invertido ${money(i.invested)}`}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: C.textHi, fontWeight: 900, fontSize: 15 }}>{money(cv)}</div>
                    <div style={{ color: pnl >= 0 ? C.good : C.bad, fontSize: 12, fontWeight: 700 }}>{pnl >= 0 ? "+" : ""}{pct.toFixed(1)}%</div>
                  </div>
                  <Pencil size={14} color={C.textLo} />
                </div>
              </button>
            );
          })}
        </Section>
      )}

      <div style={{ height: 122 }} />
      {(tab === "movimientos" || tab === "deudas" || tab === "inversiones") && (
        <FAB onClick={() => { setEditInv(null); setEditDebt(null); setSheet(tab === "deudas" ? "debt" : tab === "inversiones" ? "inv" : "tx"); }} label={tab === "deudas" ? "Deuda" : tab === "inversiones" ? "Inversión" : "Movimiento"} />
      )}

      <Sheet open={!!sheet} onClose={() => { setSheet(null); setEditInv(null); setEditDebt(null); }} title={sheet === "debt" ? (editDebt ? "Editar deuda" : "Nueva deuda") : sheet === "inv" ? (editInv ? "Editar inversión" : "Nueva inversión") : "Nuevo movimiento"}>
        {sheet === "tx" && <TxForm onSave={(d) => { dispatch({ type: "add", col: "tx", item: { id: uid(), date: todayISO(), ...d } }); setSheet(null); }} />}
        {sheet === "debt" && <DebtForm initial={editDebt}
          onSave={(d) => { if (editDebt) dispatch({ type: "update", col: "debts", id: editDebt.id, patch: d }); else dispatch({ type: "add", col: "debts", item: { id: uid(), date: todayISO(), settled: false, ...d } }); setSheet(null); setEditDebt(null); }}
          onDelete={editDebt ? () => { dispatch({ type: "remove", col: "debts", id: editDebt.id }); setSheet(null); setEditDebt(null); } : null} />}
        {sheet === "inv" && <InvForm initial={editInv} livePrices={invPrices}
          onSave={(d) => { if (editInv) dispatch({ type: "update", col: "investments", id: editInv.id, patch: d }); else dispatch({ type: "add", col: "investments", item: { id: uid(), ...d } }); setSheet(null); setEditInv(null); }}
          onDelete={editInv ? () => { dispatch({ type: "remove", col: "investments", id: editInv.id }); setSheet(null); setEditInv(null); } : null} />}
      </Sheet>

      <Sheet open={!!chartDetail} onClose={() => setChartDetail(null)} title={chartDetail === "meses" ? "Por meses" : chartDetail === "categorias" ? "Por categorías" : chartDetail === "balance" ? "Movimiento a movimiento" : "Tus inversiones"}>
        <ChartDetailSheet which={chartDetail} tx={state.tx} investments={state.investments.map((i) => ({ ...i, cur: curVal(i) }))} />
      </Sheet>
    </div>
  );
}

function ExpandableChart({ children, onExpand }) {
  return (
    <button onClick={onExpand} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer", position: "relative" }}>
      {children}
      {/* etiqueta sobre el canto superior de la placa — no pisa el subtítulo del chart */}
      <div style={{ position: "absolute", top: -1, right: 16, transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 4, color: C.textLo, fontSize: 10, fontWeight: 700, pointerEvents: "none", background: "#0e0e0e", border: "1px solid rgba(255,255,255,.12)", borderRadius: 999, padding: "3px 9px", boxShadow: "0 2px 6px rgba(0,0,0,.4)" }}>
        <Maximize2 size={11} /> desglosar
      </div>
    </button>
  );
}

function ChartDetailSheet({ which, tx, investments }) {
  if (which === "meses") {
    const now = new Date(); const rows = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const ing = tx.filter((x) => x.type === "ingreso" && (x.date || "").slice(0, 7) === key).reduce((s, x) => s + Number(x.amount || 0), 0);
      const gas = tx.filter((x) => x.type === "gasto" && (x.date || "").slice(0, 7) === key).reduce((s, x) => s + Number(x.amount || 0), 0);
      rows.push({ label: d.toLocaleDateString("es-ES", { month: "long", year: "2-digit" }), ing, gas, net: ing - gas });
    }
    return <div style={{ display: "grid", gap: 8 }}>{rows.map((r, i) => (
      <div key={i} style={{ ...card, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.textHi, fontWeight: 800, textTransform: "capitalize" }}>{r.label}</span><span style={{ color: r.net >= 0 ? C.good : C.bad, fontWeight: 800 }}>{r.net >= 0 ? "+" : ""}{money(r.net)}</span></div>
        <div style={{ display: "flex", gap: 14, marginTop: 4, fontSize: 12.5 }}><span style={{ color: C.good }}>+{money(r.ing)}</span><span style={{ color: C.bad }}>−{money(r.gas)}</span></div>
      </div>))}</div>;
  }
  if (which === "categorias") {
    const map = {}; tx.filter((x) => x.type === "gasto").forEach((x) => { const k = x.category || "General"; map[k] = (map[k] || 0) + Number(x.amount || 0); });
    const total = Object.values(map).reduce((a, b) => a + b, 0) || 1;
    const rows = Object.entries(map).map(([k, v]) => ({ k, v, pct: v / total * 100 })).sort((a, b) => b.v - a.v);
    return <div style={{ display: "grid", gap: 8 }}>{rows.map((r, i) => (
      <div key={i} style={{ ...card, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ color: C.textHi, fontWeight: 700 }}>{r.k}</span><span style={{ color: C.textHi, fontWeight: 800 }}>{money(r.v)} · {r.pct.toFixed(0)}%</span></div>
        <div style={{ height: 6, borderRadius: 999, background: C.ink3, overflow: "hidden" }}><div style={{ width: `${r.pct}%`, height: "100%", background: SLICE[i % SLICE.length] }} /></div>
      </div>))}</div>;
  }
  if (which === "balance") {
    const sorted = [...tx].sort((a, b) => (a.date || "").localeCompare(b.date || "")); let run = 0;
    const rows = sorted.map((x) => { run += (x.type === "ingreso" ? 1 : -1) * Number(x.amount || 0); return { x, run }; }).slice(-20).reverse();
    return <div style={{ display: "grid", gap: 6 }}>{rows.map(({ x, run }, i) => (
      <div key={i} style={{ ...card, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}><div style={{ color: C.textHi, fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{x.note || x.category}</div><div style={{ color: C.textLo, fontSize: 11 }}>{fmtDate(x.date)}</div></div>
        <div style={{ color: x.type === "ingreso" ? C.good : C.bad, fontWeight: 800, fontSize: 13 }}>{x.type === "ingreso" ? "+" : "−"}{money(x.amount).replace("−", "")}</div>
        <div style={{ color: C.textLo, fontSize: 12, minWidth: 72, textAlign: "right" }}>{money(run)}</div>
      </div>))}</div>;
  }
  if (which === "inversiones") {
    return <div style={{ display: "grid", gap: 8 }}>{[...investments].sort((a, b) => b.cur - a.cur).map((i) => { const pnl = i.cur - Number(i.invested || 0); const pct = i.invested ? pnl / i.invested * 100 : 0; return (
      <div key={i.id} style={{ ...card, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.textHi, fontWeight: 800 }}>{i.name}</span><span style={{ color: C.textHi, fontWeight: 800 }}>{money(i.cur)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, fontSize: 12.5 }}><span style={{ color: C.textLo }}>Invertido {money(i.invested)}</span><span style={{ color: pnl >= 0 ? C.good : C.bad, fontWeight: 700 }}>{pnl >= 0 ? "+" : ""}{money(pnl)} ({pct.toFixed(1)}%)</span></div>
      </div>); })}</div>;
  }
  return null;
}

const miniBtn = (bg, col) => ({ flex: 1, background: bg, color: col, border: "none", borderRadius: 12, padding: "9px", fontWeight: 800, fontSize: 13, cursor: "pointer", boxShadow: "0 1px 0 rgba(255,255,255,.14) inset, 0 -1.5px 0 rgba(0,0,0,.28) inset, 0 3px 8px rgba(0,0,0,.32)" });

/* ---------- Markets panel ---------- */
function Sparkline({ history, color = C.yellow, w = 70, h = 28 }) {
  const vals = (history || []).map((p) => p.v);
  if (vals.length < 2) return <div style={{ width: w, height: h }} />;
  const min = Math.min(...vals), max = Math.max(...vals), span = max - min || 1;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / span) * h}`).join(" ");
  return (
    <svg width={w} height={h} style={{ flexShrink: 0 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,.15))" }} />
    </svg>
  );
}

function MarketsPanel({ state, dispatch, toast }) {
  const [sheet, setSheet] = useState(false);
  const [busy, setBusy] = useState(false);
  const [updated, setUpdated] = useState(null);

  const checkAlert = (asset, v) => {
    const al = asset.alert;
    if (!al || (al.above == null && al.below == null)) return;
    const now = Date.now();
    if (al.firedAt && now - al.firedAt < 6 * 3600 * 1000) return;
    let hit = null;
    if (al.above != null && v >= Number(al.above)) hit = { dir: "up", txt: `📈 ${asset.name} en ${money(v)} (≥ ${money(al.above)}). ${al.note || "Puede ser momento de vender o mover."}` };
    else if (al.below != null && v <= Number(al.below)) hit = { dir: "down", txt: `📉 ${asset.name} en ${money(v)} (≤ ${money(al.below)}). ${al.note || "Ojo, vigila tu activo."}` };
    if (hit) {
      dispatch({ type: "update", col: "markets", id: asset.id, patch: { alert: { ...al, firedAt: now } } });
      toast && toast(hit.dir === "up" ? "Alerta de mercado ↑" : "Alerta de mercado ↓", hit.txt);
    }
  };

  const pushPrice = (asset, newVal) => {
    const v = Number(newVal);
    if (!isFinite(v)) return;
    const hist = [...(asset.history || []), { t: nowISO(), v }].slice(-30);
    dispatch({ type: "update", col: "markets", id: asset.id, patch: { prev: asset.price ?? v, price: v, history: hist } });
    checkAlert(asset, v);
  };
  const setAlert = (asset, alert) => dispatch({ type: "update", col: "markets", id: asset.id, patch: { alert } });

  const refreshAll = async () => {
    setBusy(true);
    const cryptos = state.markets.filter((a) => a.type === "crypto" && a.cg);
    let any = false;
    try {
      if (cryptos.length) {
        const data = await fetchCrypto(cryptos.map((a) => a.cg));
        cryptos.forEach((a) => { const d = data[a.cg]; if (d && typeof d.eur === "number") { pushPrice(a, d.eur); any = true; } });
      }
      // Forex + metales reales (gratis). EUR/USD directo; oro/plata pasan de USD/oz a €/oz.
      const needForex = state.markets.some((a) => LIVE_SYMS.includes(a.sym));
      if (needForex) {
        const rates = await fetchForex().catch(() => null);
        const eurusd = rates && rates.USD ? rates.USD : null;
        if (eurusd) {
          state.markets.filter((a) => a.sym === "EURUSD").forEach((a) => { pushPrice(a, eurusd); any = true; });
          if (state.markets.some((a) => a.sym === "XAU")) { const p = await fetchMetalUsd("XAU").catch(() => null); if (p) { state.markets.filter((a) => a.sym === "XAU").forEach((a) => pushPrice(a, p / eurusd)); any = true; } }
          if (state.markets.some((a) => a.sym === "XAG")) { const p = await fetchMetalUsd("XAG").catch(() => null); if (p) { state.markets.filter((a) => a.sym === "XAG").forEach((a) => pushPrice(a, p / eurusd)); any = true; } }
        }
      }
      setUpdated(any ? "ok" : "err");
    } catch {
      setUpdated("err");
    } finally {
      setBusy(false);
      setTimeout(() => setUpdated(null), 3000);
    }
  };

  const addAsset = (preset) => {
    if (state.markets.some((a) => a.sym === preset.sym)) { setSheet(false); return; }
    dispatch({ type: "add", col: "markets", item: { id: uid(), ...preset, price: null, prev: null, history: [] } });
    setSheet(false);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button onClick={refreshAll} disabled={busy} style={{ ...iconBtn, width: "auto", flex: 1, height: 44, gap: 8, fontWeight: 800, fontSize: 14, background: C.ink2 }}>
          <span style={{ display: "inline-flex", animation: busy ? "bspin 1s linear infinite" : "none" }}><RefreshCcw size={16} /></span>
          {busy ? "Actualizando…" : "Actualizar precios en vivo"}
        </button>
        <button onClick={() => setSheet(true)} style={{ ...iconBtn, width: 44, height: 44, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Plus size={22} strokeWidth={3} /></button>
      </div>
      {updated === "ok" && <div style={{ color: C.good, fontSize: 12, marginBottom: 10 }}>Precios actualizados en vivo ✓</div>}
      {updated === "err" && <div style={{ color: C.textLo, fontSize: 12, marginBottom: 10 }}>No pude conectar a algún feed. Cripto/oro/plata/forex son en vivo; el resto, a mano o con IA.</div>}

      {state.markets.length === 0 ? (
        <EmptyState face="happy" title="Tu watchlist vacía" sub="Añade activos: Bitcoin, oro, plata, gasolina, S&P500, forex… y sigue cómo suben o bajan." cta="Añadir activo" onCta={() => setSheet(true)} />
      ) : (
        <div className="bstagger" style={{ display: "grid", gap: 10 }}>
          {state.markets.map((a) => <AssetCard key={a.id} a={a} onUpdate={pushPrice} onSetAlert={setAlert} onRemove={() => dispatch({ type: "remove", col: "markets", id: a.id })} />)}
        </div>
      )}

      <div style={{ ...card, padding: 12, marginTop: 12, background: C.well, fontSize: 11.5, color: C.textLo, lineHeight: 1.5 }}>
        <b style={{ color: C.textHi }}>En vivo (reales):</b> cripto, oro, plata y forex (EUR/USD). <b style={{ color: C.textHi }}>A mano o con IA:</b> gasolina, S&P 500 y otros índices (no hay feed gratuito abierto fiable). Toca 🔔 en un activo para ponerle una alerta de subida/bajada.
      </div>

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Añadir activo">
        <div style={{ display: "grid", gap: 8 }}>
          {PRESET_ASSETS.map((p) => {
            const added = state.markets.some((a) => a.sym === p.sym);
            return (
              <button key={p.sym} onClick={() => addAsset(p)} disabled={added} style={{
                ...card, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, cursor: added ? "default" : "pointer", opacity: added ? 0.45 : 1, textAlign: "left",
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: p.type === "crypto" ? "rgba(255,212,0,.15)" : C.ink3, display: "grid", placeItems: "center" }}>
                  {p.type === "crypto" ? <Zap size={17} color={C.yellow} /> : <Activity size={17} color={C.textLo} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>{p.name}</div>
                  <div style={{ color: C.textLo, fontSize: 12 }}>{p.sym} · {p.type === "crypto" ? "en vivo" : "manual / IA"}</div>
                </div>
                {added ? <Check size={18} color={C.good} /> : <Plus size={18} color={C.yellow} />}
              </button>
            );
          })}
        </div>
      </Sheet>
    </div>
  );
}

function AssetCard({ a, onUpdate, onSetAlert, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [val, setVal] = useState("");
  const [above, setAbove] = useState(a.alert?.above != null ? String(a.alert.above) : "");
  const [below, setBelow] = useState(a.alert?.below != null ? String(a.alert.below) : "");
  const [aiBusy, setAiBusy] = useState(false);
  const live = isLiveAsset(a);
  const hasAlert = a.alert && (a.alert.above != null || a.alert.below != null);
  const change = a.price != null && a.prev != null && a.prev !== 0 ? ((a.price - a.prev) / a.prev) * 100 : null;
  const up = change != null && change >= 0;
  const estimate = async () => {
    setAiBusy(true);
    try { const p = await aiEstimatePrice(a.name); if (p != null) onUpdate(a, p); } catch {} finally { setAiBusy(false); }
  };
  const saveAlert = () => {
    onSetAlert(a, { above: above ? Number(above) : null, below: below ? Number(below) : null, firedAt: null });
    setAlertOpen(false);
  };
  return (
    <div style={{ ...card, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: live ? "rgba(255,212,0,.15)" : C.ink3, display: "grid", placeItems: "center", flexShrink: 0 }}>
          {a.type === "crypto" ? <Zap size={18} color={C.yellow} /> : live ? <Coins size={18} color={C.yellow} /> : <Activity size={18} color={C.textLo} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
            {a.name}
            {hasAlert && <BellRing size={12} color={C.purple} />}
          </div>
          <div style={{ color: C.textLo, fontSize: 11.5 }}>{a.sym}{live ? " · en vivo" : " · manual"}</div>
        </div>
        <Sparkline history={a.history} color={change == null ? C.textLo : up ? C.good : C.bad} />
        <div style={{ textAlign: "right", minWidth: 78 }}>
          <div style={{ color: C.textHi, fontWeight: 900, fontSize: 15 }}>{a.price != null ? money(a.price) : "—"}</div>
          {change != null && (
            <div style={{ color: up ? C.good : C.bad, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
              {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(change).toFixed(2)}%
            </div>
          )}
        </div>
      </div>

      {alertOpen ? (
        <div style={{ marginTop: 10, borderTop: `1px solid ${C.line}`, paddingTop: 10 }}>
          <div style={{ color: C.textLo, fontSize: 11.5, marginBottom: 8 }}>Avísame cuando el precio…</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.good, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>≥ suba a (€)</div>
              <input type="number" inputMode="decimal" style={{ ...inputStyle, padding: "9px 12px" }} value={above} onChange={(e) => setAbove(e.target.value)} placeholder="—" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.bad, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>≤ baje a (€)</div>
              <input type="number" inputMode="decimal" style={{ ...inputStyle, padding: "9px 12px" }} value={below} onChange={(e) => setBelow(e.target.value)} placeholder="—" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={saveAlert} style={miniBtn(C.yellow, C.ink)}>Guardar alerta</button>
            <button onClick={() => { onSetAlert(a, null); setAbove(""); setBelow(""); setAlertOpen(false); }} style={miniBtn(C.ink3, C.textLo)}>Quitar</button>
          </div>
          <div style={{ color: C.textLo, fontSize: 10.5, marginTop: 8, lineHeight: 1.4 }}>Te avisa al actualizar precios (con la app abierta). Útil para entrar a tu app externa y vender o mover.</div>
        </div>
      ) : editing ? (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input type="number" inputMode="decimal" autoFocus style={{ ...inputStyle, padding: "9px 12px" }} value={val} onChange={(e) => setVal(e.target.value)} placeholder="Precio en €" />
          <button onClick={() => { if (val) onUpdate(a, val); setVal(""); setEditing(false); }} style={{ ...iconBtn, width: 42, height: 42, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Check size={18} strokeWidth={3} /></button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {!live && <button onClick={() => setEditing(true)} style={miniBtn(C.ink3, C.textHi)}>A mano</button>}
          {!live && <button onClick={estimate} disabled={aiBusy} style={miniBtn("rgba(144,19,254,.18)", C.purple)}>{aiBusy ? "Estimando…" : "IA"}</button>}
          <button onClick={() => setAlertOpen(true)} style={miniBtn(hasAlert ? "rgba(144,19,254,.18)" : C.ink3, hasAlert ? C.purple : C.textHi)}>🔔 Alerta</button>
          <button onClick={onRemove} style={{ ...iconBtn, width: 38, height: 38, color: C.textLo }}><Trash2 size={14} /></button>
        </div>
      )}
    </div>
  );
}

/* ---------- Inversión compartida ---------- */
const SHARE_KINDS = [
  { k: "meter", l: "Meter", col: C.good, sign: 1, desc: "metes dinero al bote" },
  { k: "sacar", l: "Sacar", col: C.bad, sign: -1, desc: "sacas dinero del bote" },
  { k: "ganancia", l: "Ganancia", col: C.yellow, sign: 1, desc: "sube el valor / entra beneficio" },
  { k: "perdida", l: "Pérdida", col: "#ff8a3d", sign: -1, desc: "baja el valor" },
  { k: "reparto", l: "Reparto", col: C.purple, sign: -1, desc: "un socio se lleva su parte" },
];
// Legacy kinds (aporte/gasto/reinversion) kept working via these maps.
const SHARE_META = {
  meter: { l: "Meter", col: C.good }, aporte: { l: "Aporte", col: C.good },
  sacar: { l: "Sacar", col: C.bad }, gasto: { l: "Gasto", col: C.bad },
  ganancia: { l: "Ganancia", col: C.yellow }, perdida: { l: "Pérdida", col: "#ff8a3d" },
  reparto: { l: "Reparto", col: C.purple }, reinversion: { l: "Reinversión", col: C.purple },
};
const SHARE_SIGN = { meter: 1, aporte: 1, ganancia: 1, sacar: -1, gasto: -1, perdida: -1, reparto: -1, reinversion: 0 };
const shareSigned = (e) => { const s = SHARE_SIGN[e.kind]; return (s == null ? 1 : s) * Number(e.amount || 0); };
// Live totals from the movement ledger — the bote (saldo) reflects every
// meter/sacar/ganancia/etc. the instant it's dispatched.
const shareTotals = (log) => {
  let aportado = 0, retirado = 0, ganancia = 0, perdida = 0, saldo = 0;
  (log || []).forEach((e) => {
    const a = Number(e.amount || 0);
    if (e.kind === "meter" || e.kind === "aporte") aportado += a;
    else if (e.kind === "sacar" || e.kind === "gasto" || e.kind === "reparto") retirado += a;
    else if (e.kind === "ganancia") ganancia += a;
    else if (e.kind === "perdida") perdida += a;
    saldo += shareSigned(e);
  });
  return { aportado, retirado, ganancia, perdida, beneficio: ganancia - perdida, saldo };
};
function MiniStat({ label, val, col }) {
  return <div style={{ ...card, padding: "8px 6px", textAlign: "center", background: C.well, boxShadow: C.wellShadow }}><div style={{ color: C.textLo, fontSize: 10, fontWeight: 700, letterSpacing: 0.6 }}>{label}</div><div style={{ color: col, fontWeight: 900, fontSize: 15, letterSpacing: -0.4, fontVariantNumeric: "tabular-nums" }}>{val}</div></div>;
}
function SharedInvPanel({ state, dispatch }) {
  const [sheet, setSheet] = useState(null);
  const list = state.sharedInv || [];
  const addNew = (d) => {
    const log = [];
    if (d.invested) log.push({ id: uid(), date: todayISO(), kind: "meter", amount: d.invested, who: "común", note: "Inversión inicial" });
    if (d.value && d.value !== d.invested) { const diff = d.value - d.invested; log.push({ id: uid(), date: todayISO(), kind: diff >= 0 ? "ganancia" : "perdida", amount: Math.abs(diff), who: "común", note: "Valor de partida" }); }
    dispatch({ type: "add", col: "sharedInv", item: { id: uid(), name: d.name, partners: d.partners, log } });
    setSheet(null);
  };
  const totalSaldo = list.reduce((s, si) => s + shareTotals(si.log).saldo, 0);
  return (
    <div>
      {list.length === 0 ? (
        <EmptyState face="happy" title="Inversión compartida" sub="Invierte con alguien y controla el bote al segundo: mete y saca dinero cuando quieras, apunta ganancias o pérdidas, reparte a cada socio y mira el resultado al momento." cta="Nueva compartida" onCta={() => setSheet("new")} />
      ) : (
        <>
          <div style={{ ...card, padding: 16, marginBottom: 12, background: C.tintP, border: "1px solid rgba(144,19,254,.35)", boxShadow: "0 1px 0 rgba(255,255,255,.07) inset, 0 8px 22px rgba(144,19,254,.14), 0 10px 26px rgba(0,0,0,.35)" }}>
            <div style={{ color: C.textLo, fontSize: 11.5, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase" }}>En los botes ahora</div>
            <div style={{ color: C.textHi, fontWeight: 900, fontSize: 30, lineHeight: 1.1, marginTop: 2, letterSpacing: -0.8, fontVariantNumeric: "tabular-nums" }}>{money(totalSaldo)}</div>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {list.map((si) => <SharedInvCard key={si.id} si={si} dispatch={dispatch} />)}
          </div>
        </>
      )}
      <div style={{ height: 122 }} />
      <FAB onClick={() => setSheet("new")} label="Compartida" />
      <Sheet open={sheet === "new"} onClose={() => setSheet(null)} title="Nueva inversión compartida">
        <SharedInvForm me={state.profile.name} onSave={addNew} />
      </Sheet>
    </div>
  );
}
function SharedInvCard({ si, dispatch }) {
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(si.name || "");
  const [quick, setQuick] = useState("");
  const [editPartners, setEditPartners] = useState(false);
  const log = si.log || [];
  const t = shareTotals(log);
  const partners = si.partners || [];
  const patch = (p) => dispatch({ type: "update", col: "sharedInv", id: si.id, patch: p });
  const addMove = (m) => patch({ log: [{ id: uid(), date: todayISO(), ...m }, ...log] });
  const updMove = (id, p) => patch({ log: log.map((e) => (e.id === id ? { ...e, ...p } : e)) });
  const delMove = (id) => patch({ log: log.filter((e) => e.id !== id) });
  const perPerson = (who) => log.filter((e) => e.kind === "reparto" && e.who === who).reduce((s, e) => s + Number(e.amount || 0), 0);
  const quickMove = (kind) => { const v = Number(quick); if (!v) return; addMove({ kind, amount: Math.abs(v), who: "común", note: "" }); setQuick(""); };
  return (
    <div style={{ ...card, padding: 16 }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(144,19,254,.15)", display: "grid", placeItems: "center", flexShrink: 0 }}><Users size={18} color={C.purple} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {editName ? (
            <div style={{ display: "flex", gap: 6 }}>
              <input autoFocus style={{ ...inputStyle, padding: "6px 10px", fontSize: 15 }} value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
              <button onClick={() => { if (nameInput.trim()) patch({ name: nameInput.trim() }); setEditName(false); }} style={{ ...iconBtn, width: 34, height: 34, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Check size={15} strokeWidth={3} /></button>
            </div>
          ) : (
            <>
              <div style={{ color: C.textHi, fontWeight: 800, fontSize: 15.5, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{si.name}</span>
                <button onClick={() => { setNameInput(si.name || ""); setEditName(true); }} style={{ background: "none", border: "none", color: C.textLo, cursor: "pointer", padding: 0, flexShrink: 0 }}><Pencil size={13} /></button>
              </div>
              <div style={{ color: C.textLo, fontSize: 12 }}>{partners.map((p) => p.name).join(" · ") || "Sin socios"}</div>
            </>
          )}
        </div>
        <button onClick={() => { if (typeof window === "undefined" || window.confirm(`¿Borrar "${si.name}"?`)) dispatch({ type: "remove", col: "sharedInv", id: si.id }); }} style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Trash2 size={14} /></button>
      </div>

      {/* live bote */}
      <div style={{ ...card, padding: "12px 14px", background: C.well, boxShadow: C.wellShadow, marginTop: 12, textAlign: "center" }}>
        <div style={{ color: C.textLo, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5 }}>BOTE ACTUAL</div>
        <div style={{ color: t.saldo >= 0 ? C.textHi : C.bad, fontWeight: 900, fontSize: 26, lineHeight: 1.1, letterSpacing: -0.6, fontVariantNumeric: "tabular-nums" }}>{money(t.saldo)}</div>
      </div>

      {/* stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
        <MiniStat label="METIDO" val={money(t.aportado)} col={C.textHi} />
        <MiniStat label="SACADO" val={money(t.retirado)} col={C.textHi} />
        <MiniStat label="BENEFICIO" val={`${t.beneficio >= 0 ? "+" : ""}${money(t.beneficio)}`} col={t.beneficio >= 0 ? C.good : C.bad} />
      </div>

      {/* quick meter / sacar — sin abrir otra pestaña */}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input type="number" inputMode="decimal" style={{ ...inputStyle, padding: "10px 12px" }} value={quick} onChange={(e) => setQuick(e.target.value)} placeholder="Importe €" />
        <button onClick={() => quickMove("meter")} style={miniBtn(C.good, C.ink)}>Meter</button>
        <button onClick={() => quickMove("sacar")} style={miniBtn(C.ink3, C.textHi)}>Sacar</button>
      </div>

      {/* other kinds */}
      {more ? (
        <SharedMoveForm partners={partners} onSave={(m) => { addMove(m); setMore(false); }} onCancel={() => setMore(false)} />
      ) : (
        <button onClick={() => setMore(true)} style={{ ...iconBtn, width: "100%", height: 38, marginTop: 8, gap: 8, fontWeight: 800, fontSize: 12.5, background: C.ink3 }}><Plus size={15} /> Ganancia · pérdida · reparto</button>
      )}

      {/* partner payouts */}
      {partners.length > 0 && (
        <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
          {partners.map((p) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
              <span style={{ color: C.textHi, fontWeight: 700 }}>{p.name}{p.share ? ` · ${p.share}%` : ""}</span>
              <span style={{ color: C.textLo }}>se ha llevado <b style={{ color: C.yellow }}>{money(perPerson(p.name))}</b></span>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setEditPartners((v) => !v)} style={{ background: "none", border: "none", color: C.textLo, fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 8, padding: 0, display: "flex", alignItems: "center", gap: 4 }}><Settings size={12} /> Editar socios</button>
      {editPartners && <PartnersEditor partners={partners} onSave={(ps) => { patch({ partners: ps }); setEditPartners(false); }} onCancel={() => setEditPartners(false)} />}

      {/* movements */}
      <button onClick={() => setOpen((o) => !o)} style={{ ...iconBtn, width: "100%", height: 38, marginTop: 12, gap: 8, fontWeight: 800, fontSize: 13, background: C.ink3 }}>
        <ChevronRight size={15} style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .2s" }} /> Movimientos ({log.length})
      </button>
      {open && (
        <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
          {log.length === 0 && <div style={{ color: C.textLo, fontSize: 12.5, textAlign: "center", padding: "8px 0" }}>Sin movimientos todavía. Mete dinero para empezar.</div>}
          {log.map((e) => <ShareMoveRow key={e.id} e={e} partners={partners} onUpd={(p) => updMove(e.id, p)} onDel={() => delMove(e.id)} />)}
        </div>
      )}
    </div>
  );
}
function ShareMoveRow({ e, partners, onUpd, onDel }) {
  const [edit, setEdit] = useState(false);
  const [amt, setAmt] = useState(String(e.amount || ""));
  const [note, setNote] = useState(e.note || "");
  const [kind, setKind] = useState(e.kind);
  const [who, setWho] = useState(e.who || "común");
  const meta = SHARE_META[e.kind] || { l: e.kind, col: C.textLo };
  const whoOptions = ["común", ...(partners || []).map((p) => p.name)];
  const save = () => { const v = Number(amt); if (!isFinite(v)) return; onUpd({ amount: Math.abs(v), note, kind, who: kind === "reparto" ? who : "común" }); setEdit(false); };
  if (edit) {
    return (
      <div style={{ ...card, padding: 10, background: C.well, display: "grid", gap: 8 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {SHARE_KINDS.map((k) => <Chip key={k.k} active={kind === k.k} onClick={() => setKind(k.k)} accent={k.col}>{k.l}</Chip>)}
        </div>
        <input type="number" inputMode="decimal" autoFocus style={{ ...inputStyle, padding: "9px 12px" }} value={amt} onChange={(ev) => setAmt(ev.target.value)} placeholder="Importe €" />
        {kind === "reparto" && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {whoOptions.map((w) => <Chip key={w} active={who === w} onClick={() => setWho(w)}>{w === "común" ? "Común" : w}</Chip>)}
          </div>
        )}
        <input style={{ ...inputStyle, padding: "9px 12px" }} value={note} onChange={(ev) => setNote(ev.target.value)} placeholder="Nota (opcional)" />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={save} style={miniBtn(C.yellow, C.ink)}>Guardar</button>
          <button onClick={() => setEdit(false)} style={miniBtn(C.ink3, C.textLo)}>Cancelar</button>
          <button onClick={onDel} style={{ ...iconBtn, width: 40, height: 40, color: C.bad }}><Trash2 size={15} /></button>
        </div>
      </div>
    );
  }
  const sign = SHARE_SIGN[e.kind] == null ? 1 : SHARE_SIGN[e.kind];
  return (
    <div style={{ ...card, padding: "9px 12px", display: "flex", alignItems: "center", gap: 10, background: C.well }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: meta.col, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.textHi, fontSize: 13, fontWeight: 700 }}>{meta.l}{e.who && e.who !== "común" ? ` · ${e.who}` : ""}</div>
        <div style={{ color: C.textLo, fontSize: 11 }}>{fmtDate(e.date)}{e.note ? ` · ${e.note}` : ""}</div>
      </div>
      <span style={{ color: meta.col, fontWeight: 800, fontSize: 13 }}>{sign < 0 ? "−" : sign > 0 ? "+" : ""}{money(e.amount).replace("−", "")}</span>
      <button onClick={() => { setAmt(String(e.amount || "")); setNote(e.note || ""); setKind(e.kind); setWho(e.who || "común"); setEdit(true); }} style={{ background: "none", border: "none", color: C.textLo, cursor: "pointer", padding: 2 }}><Pencil size={13} /></button>
    </div>
  );
}
function PartnersEditor({ partners, onSave, onCancel }) {
  const [ps, setPs] = useState((partners && partners.length ? partners : [{ id: uid(), name: "", share: "" }]).map((p) => ({ id: p.id || uid(), name: p.name || "", share: p.share == null ? "" : String(p.share) })));
  const setP = (id, f, v) => setPs((a) => a.map((p) => (p.id === id ? { ...p, [f]: v } : p)));
  const add = () => setPs((a) => [...a, { id: uid(), name: "", share: "" }]);
  const del = (id) => setPs((a) => a.filter((p) => p.id !== id));
  return (
    <div style={{ ...card, padding: 12, background: C.well, marginTop: 10, display: "grid", gap: 8 }}>
      <div style={{ color: C.textLo, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5 }}>SOCIOS</div>
      {ps.map((p) => (
        <div key={p.id} style={{ display: "flex", gap: 8 }}>
          <input style={{ ...inputStyle, flex: 1, padding: "9px 12px" }} value={p.name} onChange={(e) => setP(p.id, "name", e.target.value)} placeholder="Nombre" />
          <input type="number" inputMode="decimal" style={{ ...inputStyle, width: 66, padding: "9px 8px" }} value={p.share} onChange={(e) => setP(p.id, "share", e.target.value)} placeholder="%" />
          <button onClick={() => del(p.id)} style={{ ...iconBtn, width: 40, height: 40, color: C.textLo }}><X size={15} /></button>
        </div>
      ))}
      <button onClick={add} style={{ ...iconBtn, width: "auto", paddingInline: 12, height: 36, gap: 6, fontSize: 12.5, fontWeight: 700 }}><UserPlus size={14} /> Añadir socio</button>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onSave(ps.filter((p) => p.name.trim()).map((p) => ({ id: p.id, name: p.name.trim(), share: p.share === "" ? null : Number(p.share) })))} style={miniBtn(C.purple, "#fff")}>Guardar socios</button>
        <button onClick={onCancel} style={miniBtn(C.ink3, C.textLo)}>Cancelar</button>
      </div>
    </div>
  );
}
function SharedInvForm({ me, onSave }) {
  const [name, setName] = useState("");
  const [partners, setPartners] = useState(me ? [{ id: uid(), name: me, share: "" }] : [{ id: uid(), name: "", share: "" }]);
  const [invested, setInvested] = useState("");
  const [value, setValue] = useState("");
  const setP = (id, field, v) => setPartners((ps) => ps.map((p) => p.id === id ? { ...p, [field]: v } : p));
  const addP = () => setPartners((ps) => [...ps, { id: uid(), name: "", share: "" }]);
  const delP = (id) => setPartners((ps) => ps.filter((p) => p.id !== id));
  return (
    <div>
      <Field label="¿En qué invertís?"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. reventa, cripto, un coche…" autoFocus /></Field>
      <Field label="Socios (nombre y % opcional)">
        <div style={{ display: "grid", gap: 8 }}>
          {partners.map((p) => (
            <div key={p.id} style={{ display: "flex", gap: 8 }}>
              <input style={{ ...inputStyle, flex: 1 }} value={p.name} onChange={(e) => setP(p.id, "name", e.target.value)} placeholder="Nombre" />
              <input type="number" inputMode="decimal" style={{ ...inputStyle, width: 72 }} value={p.share} onChange={(e) => setP(p.id, "share", e.target.value)} placeholder="%" />
              {partners.length > 1 && <button onClick={() => delP(p.id)} style={{ ...iconBtn, width: 44, height: 44, color: C.textLo }}><X size={16} /></button>}
            </div>
          ))}
          <button onClick={addP} style={{ ...iconBtn, width: "auto", paddingInline: 12, height: 38, gap: 6, fontSize: 13, fontWeight: 700 }}><UserPlus size={15} /> Añadir socio</button>
        </div>
      </Field>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><Field label="Invertido total (€)"><input type="number" inputMode="decimal" style={inputStyle} value={invested} onChange={(e) => setInvested(e.target.value)} placeholder="0,00" /></Field></div>
        <div style={{ flex: 1 }}><Field label="Valor hoy (€)"><input type="number" inputMode="decimal" style={inputStyle} value={value} onChange={(e) => setValue(e.target.value)} placeholder="0,00" /></Field></div>
      </div>
      <PrimaryBtn full color={C.purple} onClick={() => { const ps = partners.filter((p) => p.name.trim()).map((p) => ({ id: p.id, name: p.name.trim(), share: p.share ? Number(p.share) : null })); if (name.trim() && ps.length) onSave({ name: name.trim(), partners: ps, invested: Number(invested || 0), value: Number(value || 0) }); }}><Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>Crear</span></PrimaryBtn>
    </div>
  );
}
function SharedMoveForm({ partners, onSave, onCancel }) {
  const [kind, setKind] = useState("ganancia");
  const [amount, setAmount] = useState("");
  const [who, setWho] = useState((partners && partners[0] && partners[0].name) || "común");
  const [note, setNote] = useState("");
  const whoOptions = ["común", ...(partners || []).map((p) => p.name)];
  const needsWho = kind === "reparto";
  return (
    <div style={{ ...card, padding: 12, background: C.well, marginBottom: 6 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        {SHARE_KINDS.map((k) => <Chip key={k.k} active={kind === k.k} onClick={() => setKind(k.k)} accent={k.col}>{k.l}</Chip>)}
      </div>
      <div style={{ color: C.textLo, fontSize: 11.5, marginBottom: 8 }}>{(SHARE_KINDS.find((k) => k.k === kind) || {}).desc}</div>
      <input type="number" inputMode="decimal" autoFocus style={{ ...inputStyle, marginBottom: 8 }} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Importe €" />
      {needsWho && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          {whoOptions.map((w) => <Chip key={w} active={who === w} onClick={() => setWho(w)}>{w === "común" ? "Común" : w}</Chip>)}
        </div>
      )}
      <input style={{ ...inputStyle, marginBottom: 8 }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Nota: en qué se reinvirtió / gastó…" />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => amount && onSave({ kind, amount: Math.abs(Number(amount)), who: needsWho ? who : "común", note })} style={miniBtn(C.purple, "#fff")}>Guardar</button>
        <button onClick={onCancel} style={miniBtn(C.ink3, C.textLo)}>Cancelar</button>
      </div>
    </div>
  );
}

/* ---------- Ahorro (huchas) ---------- */
function SavingsPanel({ state, dispatch }) {
  const [sheet, setSheet] = useState(false);
  const list = state.savings || [];
  const add = (d) => { dispatch({ type: "add", col: "savings", item: { id: uid(), name: d.name, target: d.target, deadline: d.deadline || "", log: [] } }); setSheet(false); };
  return (
    <div>
      {list.length === 0 ? (
        <EmptyState face="happy" title="Tus huchas" sub="Ponte metas de ahorro y ve llenando la hucha. Cada aporte suma y ves cuánto te queda para llegar." cta="Nueva hucha" onCta={() => setSheet(true)} />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>{list.map((h) => <SavingsCard key={h.id} h={h} dispatch={dispatch} />)}</div>
      )}
      <div style={{ height: 122 }} />
      <FAB onClick={() => setSheet(true)} label="Hucha" />
      <Sheet open={sheet} onClose={() => setSheet(false)} title="Nueva hucha"><SavingsForm onSave={add} /></Sheet>
    </div>
  );
}
function SavingsCard({ h, dispatch }) {
  const [addOpen, setAddOpen] = useState(false);
  const [amt, setAmt] = useState("");
  const log = h.log || [];
  const saved = log.reduce((s, e) => s + Number(e.amount || 0), 0);
  const target = Number(h.target || 0);
  const pct = target ? Math.min(100, Math.round((saved / target) * 100)) : 0;
  const remaining = Math.max(0, target - saved);
  const patch = (p) => dispatch({ type: "update", col: "savings", id: h.id, patch: p });
  const contribute = (sign) => { const v = Number(amt); if (!v) return; patch({ log: [{ id: uid(), date: todayISO(), amount: sign * Math.abs(v) }, ...log] }); setAmt(""); setAddOpen(false); };
  const done = target && saved >= target;
  return (
    <div style={{ ...card, padding: 16, borderColor: done ? C.good : C.line }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(61,220,132,.15)", display: "grid", placeItems: "center", flexShrink: 0 }}><Landmark size={18} color={C.good} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 800, fontSize: 15.5 }}>{h.name}</div>
          <div style={{ color: C.textLo, fontSize: 12 }}>{money(saved)} de {money(target)}{h.deadline ? ` · ${fmtDate(h.deadline)}` : ""}</div>
        </div>
        <button onClick={() => dispatch({ type: "remove", col: "savings", id: h.id })} style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Trash2 size={14} /></button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
        <div style={{ flex: 1, height: 12, borderRadius: 999, background: C.rail, boxShadow: "0 1px 3px rgba(0,0,0,.2) inset", overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: done ? "linear-gradient(180deg,#5fe89c,#2eb96b)" : "linear-gradient(180deg,#ffe561,#eec400)", borderRadius: 999, transition: "width .5s", boxShadow: `0 1px 0 rgba(255,255,255,.35) inset, 0 0 10px ${done ? "rgba(61,220,132,.35)" : "rgba(255,212,0,.3)"}` }} />
        </div>
        <span style={{ color: done ? C.good : C.yellow, fontWeight: 900, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
      </div>
      <div style={{ color: C.textLo, fontSize: 12, marginTop: 6 }}>{done ? "¡Meta conseguida! 🎉" : `Te faltan ${money(remaining)}`}</div>
      {addOpen ? (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input type="number" inputMode="decimal" autoFocus style={{ ...inputStyle, padding: "9px 12px" }} value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="€" />
          <button onClick={() => contribute(1)} style={miniBtn(C.good, C.ink)}>Meter</button>
          <button onClick={() => contribute(-1)} style={miniBtn(C.ink3, C.textHi)}>Sacar</button>
        </div>
      ) : (
        <button onClick={() => setAddOpen(true)} style={{ ...iconBtn, width: "100%", height: 40, marginTop: 10, gap: 8, fontWeight: 800, fontSize: 13, background: C.ink3 }}><Plus size={16} /> Aportar / sacar</button>
      )}
    </div>
  );
}
function SavingsForm({ onSave }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  return (
    <div>
      <Field label="¿Para qué ahorras?"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Viaje, coche, colchón…" autoFocus /></Field>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><Field label="Meta (€)"><input type="number" inputMode="decimal" style={inputStyle} value={target} onChange={(e) => setTarget(e.target.value)} placeholder="0,00" /></Field></div>
        <div style={{ flex: 1 }}><Field label="Fecha (opcional)"><input type="date" style={inputStyle} value={deadline} onChange={(e) => setDeadline(e.target.value)} /></Field></div>
      </div>
      <PrimaryBtn full color={C.good} onClick={() => name.trim() && target && onSave({ name: name.trim(), target: Number(target), deadline })}><Check size={18} strokeWidth={3} /> Crear hucha</PrimaryBtn>
    </div>
  );
}

/* ---------- Hábitos (rachas) ---------- */
const HABIT_COLORS = ["#FFD400", "#9013FE", "#3ddc84", "#ff8a3d", "#4db5ff", "#ff5c8a"];
function streakOf(doneSet) {
  // Same date basis as todayISO() (UTC via toISOString) so it never drifts by a day.
  const iso = (offset) => { const d = new Date(); d.setDate(d.getDate() - offset); return d.toISOString().slice(0, 10); };
  let offset = 0;
  if (!doneSet.has(iso(0))) { if (!doneSet.has(iso(1))) return 0; offset = 1; }
  let streak = 0;
  while (doneSet.has(iso(offset))) { streak++; offset++; }
  return streak;
}
function bestStreak(dates) {
  const sorted = [...(dates || [])].sort();
  let best = 0, cur = 0, prev = null;
  sorted.forEach((s) => { if (prev) { const diff = Math.round((new Date(s + "T00:00:00") - new Date(prev + "T00:00:00")) / 86400000); cur = diff === 1 ? cur + 1 : 1; } else cur = 1; best = Math.max(best, cur); prev = s; });
  return best;
}
function HabitsList({ habits, dispatch, onAdd }) {
  if (!habits || habits.length === 0) return <EmptyState face="happy" title="Crea tu racha" sub="Marca cada día que cumples un hábito y no rompas la cadena. Cuanto más larga, más cuesta soltarla." cta="Nuevo hábito" onCta={onAdd} />;
  return <div className="bstagger" style={{ display: "grid", gap: 12 }}>{habits.map((h) => <HabitCard key={h.id} h={h} dispatch={dispatch} />)}</div>;
}
function HabitCard({ h, dispatch }) {
  const done = new Set(h.done || []);
  const streak = streakOf(done);
  const best = bestStreak(h.done || []);
  const t = todayISO();
  const doneToday = done.has(t);
  const col = h.color || C.yellow;
  const toggle = () => { const set = new Set(h.done || []); if (set.has(t)) set.delete(t); else set.add(t); dispatch({ type: "update", col: "habits", id: h.id, patch: { done: [...set] } }); };
  const days = []; for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push(d.toISOString().slice(0, 10)); }
  return (
    <div style={{ ...card, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: col, display: "grid", placeItems: "center", flexShrink: 0 }}><Zap size={20} color={C.ink} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 800, fontSize: 16 }}>{h.name}</div>
          <div style={{ color: C.textLo, fontSize: 12 }}>🔥 {streak} día{streak === 1 ? "" : "s"} seguidos · récord {best}</div>
        </div>
        <button onClick={() => dispatch({ type: "remove", col: "habits", id: h.id })} style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Trash2 size={14} /></button>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 12, justifyContent: "space-between" }}>
        {days.map((d, i) => { const on = done.has(d); return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: on ? col : C.ink3, display: "grid", placeItems: "center" }}>{on && <Check size={14} color={C.ink} strokeWidth={3.5} />}</div>
            <span style={{ fontSize: 8.5, color: C.textLo }}>{["L", "M", "X", "J", "V", "S", "D"][(new Date(d + "T00:00:00").getDay() + 6) % 7]}</span>
          </div>
        ); })}
      </div>
      <button onClick={toggle} style={{ ...iconBtn, width: "100%", height: 44, marginTop: 12, gap: 8, fontWeight: 800, fontSize: 14, background: doneToday ? col : C.ink3, color: doneToday ? C.ink : C.textHi, borderColor: doneToday ? col : C.line }}>
        {doneToday ? <><Check size={16} strokeWidth={3} /> Hecho hoy</> : "Marcar hoy"}
      </button>
    </div>
  );
}
function HabitForm({ onSave }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(HABIT_COLORS[0]);
  return (
    <div>
      <Field label="¿Qué hábito?"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Entrenar, leer, no fumar…" autoFocus /></Field>
      <Field label="Color"><div style={{ display: "flex", gap: 10 }}>{HABIT_COLORS.map((c) => <button key={c} onClick={() => setColor(c)} style={{ width: 36, height: 36, borderRadius: 999, background: c, border: color === c ? `3px solid ${C.textHi}` : "3px solid transparent", cursor: "pointer" }} />)}</div></Field>
      <PrimaryBtn full onClick={() => name.trim() && onSave({ name: name.trim(), color })}><Check size={18} strokeWidth={3} /> Crear hábito</PrimaryBtn>
    </div>
  );
}

function Section({ children, empty, emptyT, emptyS, onAdd, header }) {
  if (empty) return <EmptyState title={emptyT} sub={emptyS} cta="Añadir" onCta={onAdd} />;
  return <div>{header}<div className="bstagger" style={{ display: "grid", gap: 10 }}>{children}</div></div>;
}

function TxForm({ onSave }) {
  const [type, setType] = useState("gasto");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("General");
  const cats = ["General", "Comida", "Ocio", "Hogar", "Transporte", "Nómina", "Negocio", "Colección"];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setType("gasto")} style={typeTab(type === "gasto", C.bad)}>Gasto</button>
        <button onClick={() => setType("ingreso")} style={typeTab(type === "ingreso", C.good)}>Ingreso</button>
      </div>
      <Field label="Importe (€)"><input type="number" inputMode="decimal" style={{ ...inputStyle, fontSize: 22, fontWeight: 800 }} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0,00" autoFocus /></Field>
      <Field label="Concepto"><input style={inputStyle} value={note} onChange={(e) => setNote(e.target.value)} placeholder="¿En qué?" /></Field>
      <Field label="Categoría"><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{cats.map((c) => <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Chip>)}</div></Field>
      <PrimaryBtn full onClick={() => amount && onSave({ type, amount: Number(amount), note, category })}><Check size={18} strokeWidth={3} /> Guardar</PrimaryBtn>
    </div>
  );
}
const typeTab = (on, col) => ({ flex: 1, padding: "12px", borderRadius: 14, border: `1.5px solid ${on ? col : C.edgeHi}`, background: on ? col : C.edgeSoft, color: on ? C.ink : C.textLo, fontWeight: 800, cursor: "pointer", boxShadow: on ? `0 1px 0 rgba(255,255,255,.35) inset, 0 -2px 0 rgba(0,0,0,.22) inset, 0 5px 14px ${C.dropBtn}` : "0 1px 0 rgba(255,255,255,.04) inset" });

function DebtForm({ initial, onSave, onDelete }) {
  const [dir, setDir] = useState(initial?.dir || "meDeben");
  const [person, setPerson] = useState(initial?.person || "");
  const [amount, setAmount] = useState(initial?.amount != null ? String(initial.amount) : "");
  const [note, setNote] = useState(initial?.note || "");
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setDir("meDeben")} style={typeTab(dir === "meDeben", C.good)}>Me deben</button>
        <button onClick={() => setDir("yoDebo")} style={typeTab(dir === "yoDebo", C.bad)}>Yo debo</button>
      </div>
      <Field label="¿Quién?"><input style={inputStyle} value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Nombre" autoFocus /></Field>
      <Field label="Importe (€)"><input type="number" inputMode="decimal" style={{ ...inputStyle, fontSize: 20, fontWeight: 800 }} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0,00" /></Field>
      <Field label="Concepto"><input style={inputStyle} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Opcional" /></Field>
      <PrimaryBtn full onClick={() => person.trim() && amount && onSave({ dir, person: person.trim(), amount: Number(amount), note })}><Check size={18} strokeWidth={3} /> {initial ? "Guardar cambios" : "Guardar"}</PrimaryBtn>
      {onDelete && <button onClick={onDelete} style={{ ...iconBtn, width: "100%", height: 44, marginTop: 10, gap: 8, fontWeight: 700, fontSize: 13.5, color: C.bad, borderColor: "rgba(255,92,92,.4)" }}><Trash2 size={16} /> Borrar deuda</button>}
    </div>
  );
}
function DebtCard({ d, dispatch, onEdit }) {
  const [adj, setAdj] = useState(false);
  const [amt, setAmt] = useState("");
  const apply = (sign) => {
    const v = Number(amt); if (!v) return;
    const next = Math.max(0, Number(d.amount || 0) + sign * Math.abs(v));
    dispatch({ type: "update", col: "debts", id: d.id, patch: { amount: next, settled: next <= 0 ? true : d.settled } });
    setAmt(""); setAdj(false);
  };
  return (
    <div style={{ ...card, padding: 14, opacity: d.settled ? 0.55 : 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: d.dir === "meDeben" ? "rgba(61,220,132,.15)" : "rgba(255,92,92,.15)", display: "grid", placeItems: "center" }}>
          <HandCoins size={18} color={d.dir === "meDeben" ? C.good : C.bad} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>{d.person}</div>
          <div style={{ color: C.textLo, fontSize: 12 }}>{d.dir === "meDeben" ? "Te debe" : "Le debes"}{d.note ? ` · ${d.note}` : ""}</div>
        </div>
        <div style={{ color: d.dir === "meDeben" ? C.good : C.bad, fontWeight: 900, fontSize: 16 }}>{money(d.amount)}</div>
      </div>
      {adj ? (
        <div style={{ marginTop: 10 }}>
          <div style={{ color: C.textLo, fontSize: 11.5, marginBottom: 6 }}>Ajustar saldo: "Abonó" resta (te pagó parte), "+ Sumó" añade (debe más).</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="number" inputMode="decimal" autoFocus style={{ ...inputStyle, padding: "9px 12px" }} value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="€" />
            <button onClick={() => apply(-1)} style={miniBtn(C.good, C.ink)}>− Abonó</button>
            <button onClick={() => apply(1)} style={miniBtn(C.ink3, C.textHi)}>+ Sumó</button>
          </div>
          <button onClick={() => { setAdj(false); setAmt(""); }} style={{ ...iconBtn, width: "auto", paddingInline: 12, height: 32, marginTop: 8, fontSize: 12, color: C.textLo }}>Cancelar</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={() => setAdj(true)} style={miniBtn(C.ink3, C.textHi)}>± Ajustar</button>
          <button onClick={() => dispatch({ type: "update", col: "debts", id: d.id, patch: { settled: !d.settled } })} style={miniBtn(d.settled ? C.line : C.yellow, d.settled ? C.textLo : C.ink)}>{d.settled ? "Reabrir" : "Saldada"}</button>
          <button onClick={onEdit} style={{ ...iconBtn, width: 36, height: 36, color: C.textLo }}><Pencil size={14} /></button>
          <button onClick={() => dispatch({ type: "remove", col: "debts", id: d.id })} style={{ ...iconBtn, width: 36, height: 36, color: C.textLo }}><Trash2 size={14} /></button>
        </div>
      )}
    </div>
  );
}
const INV_CRYPTOS = [{ name: "Bitcoin", sym: "BTC", cg: "bitcoin" }, { name: "Ethereum", sym: "ETH", cg: "ethereum" }, { name: "Solana", sym: "SOL", cg: "solana" }];
function InvForm({ initial, onSave, onDelete, livePrices }) {
  const [kind, setKind] = useState(initial?.kind || "manual");
  const [name, setName] = useState(initial?.name || "");
  const [invested, setInvested] = useState(initial?.invested != null ? String(initial.invested) : "");
  const [current, setCurrent] = useState(initial?.current != null ? String(initial.current) : "");
  const [cg, setCg] = useState(initial?.cg || "bitcoin");
  const [qty, setQty] = useState(initial?.qty != null ? String(initial.qty) : "");
  const asset = INV_CRYPTOS.find((c) => c.cg === cg) || INV_CRYPTOS[0];
  const livePrice = livePrices && livePrices[cg];
  const liveVal = livePrice != null && qty ? Number(qty) * livePrice : null;
  const save = () => {
    if (kind === "crypto") {
      if (!qty) return;
      onSave({ kind: "crypto", name: asset.name, sym: asset.sym, cg, qty: Number(qty), invested: Number(invested || 0), current: liveVal != null ? liveVal : Number(current || 0) });
    } else {
      if (!name.trim()) return;
      onSave({ kind: "manual", name: name.trim(), invested: Number(invested || 0), current: Number(current || 0) });
    }
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setKind("manual")} style={typeTab(kind === "manual", C.yellow)}>Manual</button>
        <button onClick={() => setKind("crypto")} style={typeTab(kind === "crypto", C.yellow)}>Cripto (precio real)</button>
      </div>
      {kind === "crypto" ? (
        <>
          <Field label="Activo">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {INV_CRYPTOS.map((c) => <Chip key={c.cg} active={cg === c.cg} onClick={() => setCg(c.cg)}>{c.sym}</Chip>)}
            </div>
          </Field>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><Field label={`Cantidad (${asset.sym})`}><input type="number" inputMode="decimal" style={inputStyle} value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" autoFocus /></Field></div>
            <div style={{ flex: 1 }}><Field label="Invertido (€)"><input type="number" inputMode="decimal" style={inputStyle} value={invested} onChange={(e) => setInvested(e.target.value)} placeholder="0,00" /></Field></div>
          </div>
          <div style={{ ...card, padding: 12, marginBottom: 12, background: C.well }}>
            <div style={{ color: C.textLo, fontSize: 12, fontWeight: 700 }}>Valor en vivo</div>
            <div style={{ color: C.textHi, fontWeight: 900, fontSize: 20 }}>{liveVal != null ? money(liveVal) : (livePrice != null ? "—" : "se calcula solo")}</div>
            {livePrice != null && <div style={{ color: C.textLo, fontSize: 11 }}>1 {asset.sym} ≈ {money(livePrice)} · se actualiza solo</div>}
          </div>
        </>
      ) : (
        <>
          <Field label="Nombre"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Fondo, oro, acciones…" autoFocus /></Field>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><Field label="Invertido (€)"><input type="number" inputMode="decimal" style={inputStyle} value={invested} onChange={(e) => setInvested(e.target.value)} placeholder="0,00" /></Field></div>
            <div style={{ flex: 1 }}><Field label="Valor hoy (€)"><input type="number" inputMode="decimal" style={inputStyle} value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="0,00" /></Field></div>
          </div>
        </>
      )}
      <PrimaryBtn full onClick={save}><Check size={18} strokeWidth={3} /> {initial ? "Guardar cambios" : "Guardar"}</PrimaryBtn>
      {onDelete && <button onClick={onDelete} style={{ ...iconBtn, width: "100%", height: 44, marginTop: 10, gap: 8, fontWeight: 700, fontSize: 13.5, color: C.bad, borderColor: "rgba(255,92,92,.4)" }}><Trash2 size={16} /> Borrar inversión</button>}
    </div>
  );
}

/* ============================================================
   COLECCIÓN + FIADOS
   ============================================================ */
/* ============================================================
   Empresas y artistas — colaboradores: coste, beneficio, eventos, margen
   ============================================================ */
const ORG_TYPES = [
  { k: "empresa", l: "Empresa", icon: Landmark },
  { k: "artista", l: "Artista", icon: Star },
];
const orgTotals = (org) => {
  const ev = (org && org.events) || [];
  const income = ev.reduce((s, e) => s + Number(e.income || 0), 0);
  const cost = ev.reduce((s, e) => s + Number(e.cost || 0), 0) + Number((org && org.baseCost) || 0);
  const profit = income - cost;
  const margin = income > 0 ? (profit / income) * 100 : null;
  return { income, cost, profit, margin, events: ev.length };
};

function OrgsPanel({ state, dispatch }) {
  const [sheet, setSheet] = useState(false);
  const [active, setActive] = useState(null);
  const [view, setView] = useState("beneficio"); // beneficio | margen
  const list = state.orgs || [];
  const activeOrg = active ? list.find((o) => o.id === active) : null;
  if (activeOrg) return <OrgDetail org={activeOrg} dispatch={dispatch} onBack={() => setActive(null)} />;
  const addOrg = (d) => { dispatch({ type: "add", col: "orgs", item: { id: uid(), events: [], ...d } }); setSheet(false); };
  const totals = list.reduce((acc, o) => { const t = orgTotals(o); acc.income += t.income; acc.cost += t.cost; acc.profit += t.profit; return acc; }, { income: 0, cost: 0, profit: 0 });
  return (
    <div>
      {list.length === 0 ? (
        <EmptyState face="happy" title="Empresas y artistas" sub="Archiva las empresas y artistas que colaboran contigo: cuánto te cuestan, cuánto beneficio sacas, los eventos que habéis hecho y tu margen. Todo editable, con gráfica." cta="Añadir" onCta={() => setSheet(true)} />
      ) : (
        <>
          <div style={{ ...card, padding: 16, marginBottom: 12, background: C.tintG, border: "1px solid rgba(61,220,132,.28)", boxShadow: "0 1px 0 rgba(255,255,255,.06) inset, 0 8px 22px rgba(61,220,132,.1), 0 10px 26px rgba(0,0,0,.35)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: C.textLo, fontSize: 11.5, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase" }}>Beneficio total</div>
                <div style={{ color: totals.profit >= 0 ? C.good : C.bad, fontWeight: 900, fontSize: 30, lineHeight: 1.1, marginTop: 2, letterSpacing: -0.8, fontVariantNumeric: "tabular-nums" }}>{totals.profit >= 0 ? "+" : ""}{money(totals.profit)}</div>
              </div>
              <div style={{ textAlign: "right", color: C.textLo, fontSize: 12, flexShrink: 0 }}>
                <div>Ingresos <b style={{ color: C.textHi }}>{money(totals.income)}</b></div>
                <div>Coste <b style={{ color: C.textHi }}>{money(totals.cost)}</b></div>
              </div>
            </div>
          </div>

          <div style={{ ...card, padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><BarChart3 size={16} color={C.yellow} /><span style={{ color: C.textHi, fontWeight: 800, fontSize: 14 }}>{view === "beneficio" ? "Beneficio por colaborador" : "Margen por colaborador"}</span></div>
              <div style={{ display: "flex", gap: 6 }}>
                <Chip active={view === "beneficio"} onClick={() => setView("beneficio")}>€</Chip>
                <Chip active={view === "margen"} onClick={() => setView("margen")}>%</Chip>
              </div>
            </div>
            <OrgBars list={list} view={view} />
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {list.map((o) => <OrgCard key={o.id} org={o} onOpen={() => setActive(o.id)} />)}
          </div>
        </>
      )}
      <div style={{ height: 122 }} />
      <FAB onClick={() => setSheet(true)} label="Empresa / artista" />
      <Sheet open={sheet} onClose={() => setSheet(false)} title="Nueva empresa o artista">
        <OrgForm onSave={addOrg} />
      </Sheet>
    </div>
  );
}

function OrgBars({ list, view }) {
  const rows = list.map((o) => { const t = orgTotals(o); return { name: o.name, profit: t.profit, margin: t.margin == null ? 0 : t.margin, hasIncome: t.income > 0 }; });
  const data = view === "beneficio"
    ? rows.map((r) => ({ label: r.name, value: Math.max(0, r.profit), raw: r.profit, display: `${r.profit >= 0 ? "+" : ""}${money(r.profit)}` })).sort((a, b) => b.raw - a.raw)
    : rows.map((r) => ({ label: r.name, value: Math.max(0, r.margin), raw: r.hasIncome ? r.margin : 0, display: r.hasIncome ? `${r.margin.toFixed(0)}%` : "—" })).sort((a, b) => b.raw - a.raw);
  const max = Math.max(1, ...data.map((d) => d.value));
  if (!data.length) return <div style={{ color: C.textLo, fontSize: 12.5 }}>Sin datos.</div>;
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {data.map((d, i) => (
        <div key={d.label + i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: C.textHi, fontSize: 12.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "62%" }}>{d.label}</span>
            <span style={{ color: d.raw >= 0 ? C.good : C.bad, fontSize: 12, fontWeight: 700 }}>{d.display}</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: C.rail, boxShadow: "0 1px 2px rgba(0,0,0,.2) inset", overflow: "hidden" }}>
            <div style={{ width: `${(d.value / max) * 100}%`, height: "100%", background: d.raw >= 0 ? SLICE[i % SLICE.length] : C.bad, borderRadius: 999, transition: "width .5s", boxShadow: "0 1px 0 rgba(255,255,255,.25) inset" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function OrgCard({ org, onOpen }) {
  const t = orgTotals(org);
  const typeMeta = ORG_TYPES.find((x) => x.k === org.type) || ORG_TYPES[0];
  const Ico = typeMeta.icon;
  const isArt = org.type === "artista";
  return (
    <button onClick={onOpen} style={{ ...card, padding: 16, width: "100%", textAlign: "left", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: isArt ? "rgba(255,212,0,.15)" : "rgba(144,19,254,.15)", display: "grid", placeItems: "center", flexShrink: 0 }}><Ico size={22} color={isArt ? C.yellow : C.purple} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 800, fontSize: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{org.name}</div>
          <div style={{ color: C.textLo, fontSize: 12.5, marginTop: 2 }}>{typeMeta.l} · {t.events} evento{t.events === 1 ? "" : "s"}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ color: t.profit >= 0 ? C.good : C.bad, fontWeight: 900, fontSize: 15 }}>{t.profit >= 0 ? "+" : ""}{money(t.profit)}</div>
          <div style={{ color: C.textLo, fontSize: 11.5 }}>{t.margin == null ? "—" : `${t.margin.toFixed(0)}% margen`}</div>
        </div>
        <ChevronRight size={18} color={C.textLo} />
      </div>
      <div style={{ height: 6, borderRadius: 999, background: C.ink3, overflow: "hidden", marginTop: 12 }}>
        <div style={{ width: `${Math.max(0, Math.min(100, t.margin == null ? 0 : t.margin))}%`, height: "100%", background: t.profit >= 0 ? C.good : C.bad, borderRadius: 999, transition: "width .5s" }} />
      </div>
    </button>
  );
}

function OrgDetail({ org, dispatch, onBack }) {
  const [sheet, setSheet] = useState(null); // 'org' | 'event'
  const [editEvent, setEditEvent] = useState(null);
  const t = orgTotals(org);
  const typeMeta = ORG_TYPES.find((x) => x.k === org.type) || ORG_TYPES[0];
  const Ico = typeMeta.icon;
  const isArt = org.type === "artista";
  const save = (patch) => dispatch({ type: "update", col: "orgs", id: org.id, patch });
  const events = [...(org.events || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const addEvent = (ev) => save({ events: [{ id: uid(), ...ev }, ...(org.events || [])] });
  const updEvent = (id, patch) => save({ events: (org.events || []).map((e) => (e.id === id ? { ...e, ...patch } : e)) });
  const delEvent = (id) => save({ events: (org.events || []).filter((e) => e.id !== id) });
  const del = () => { if (typeof window === "undefined" || window.confirm(`¿Borrar "${org.name}" y sus eventos?`)) { dispatch({ type: "remove", col: "orgs", id: org.id }); onBack(); } };
  return (
    <div>
      <button onClick={onBack} style={{ ...linkBtn, marginBottom: 12 }}><ChevronLeft size={16} /> Empresas y artistas</button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 50, height: 50, borderRadius: 14, background: isArt ? "rgba(255,212,0,.15)" : "rgba(144,19,254,.15)", display: "grid", placeItems: "center", flexShrink: 0 }}><Ico size={24} color={isArt ? C.yellow : C.purple} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ color: C.textHi, fontWeight: 900, fontSize: 22, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{org.name}</h2>
          <div style={{ color: C.textLo, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{typeMeta.l}{org.note ? ` · ${org.note}` : ""}</div>
        </div>
        <button onClick={() => setSheet("org")} style={{ ...iconBtn, width: 40, height: 40, flexShrink: 0 }}><Pencil size={16} /></button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        <MiniStat label="INGRESOS" val={money(t.income)} col={C.good} />
        <MiniStat label="COSTE" val={money(t.cost)} col={C.textHi} />
        <MiniStat label="BENEFICIO" val={`${t.profit >= 0 ? "+" : ""}${money(t.profit)}`} col={t.profit >= 0 ? C.good : C.bad} />
        <MiniStat label="MARGEN" val={t.margin == null ? "—" : `${t.margin.toFixed(0)}%`} col={C.yellow} />
      </div>
      <div style={{ ...card, padding: 12, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ color: C.textLo, fontSize: 12, fontWeight: 700 }}>Margen de beneficio</span><span style={{ color: t.profit >= 0 ? C.good : C.bad, fontSize: 12.5, fontWeight: 800 }}>{t.margin == null ? "sin ingresos" : `${t.margin.toFixed(1)}%`}</span></div>
        <div style={{ height: 10, borderRadius: 999, background: C.ink3, overflow: "hidden" }}>
          <div style={{ width: `${Math.max(0, Math.min(100, t.margin == null ? 0 : t.margin))}%`, height: "100%", background: `linear-gradient(90deg,${C.good},${C.yellow})`, borderRadius: 999, transition: "width .5s" }} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ color: C.textHi, fontWeight: 800, fontSize: 15 }}>Eventos ({events.length})</span>
        <button onClick={() => { setEditEvent(null); setSheet("event"); }} style={{ ...iconBtn, width: "auto", paddingInline: 12, height: 36, gap: 6, fontSize: 12.5, fontWeight: 800, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Plus size={15} strokeWidth={3} /> Evento</button>
      </div>
      {events.length === 0 ? (
        <div style={{ ...card, padding: 16, textAlign: "center", color: C.textLo, fontSize: 13 }}>Aún no hay eventos. Añade el primero para ver el beneficio y el margen.</div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {events.map((e) => { const p = Number(e.income || 0) - Number(e.cost || 0); return (
            <button key={e.id} onClick={() => { setEditEvent(e); setSheet("event"); }} style={{ ...card, padding: 12, textAlign: "left", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</div>
                  <div style={{ color: C.textLo, fontSize: 11.5 }}>{fmtDate(e.date)} · ingreso {money(e.income)} · coste {money(e.cost)}</div>
                </div>
                <div style={{ color: p >= 0 ? C.good : C.bad, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{p >= 0 ? "+" : ""}{money(p)}</div>
              </div>
            </button>
          ); })}
        </div>
      )}
      <div style={{ height: 100 }} />

      <Sheet open={sheet === "org"} onClose={() => setSheet(null)} title="Editar">
        <OrgForm initial={org} onSave={(d) => { save(d); setSheet(null); }} onDelete={del} />
      </Sheet>
      <Sheet open={sheet === "event"} onClose={() => { setSheet(null); setEditEvent(null); }} title={editEvent ? "Editar evento" : "Nuevo evento"}>
        <OrgEventForm initial={editEvent}
          onSave={(d) => { if (editEvent) updEvent(editEvent.id, d); else addEvent(d); setSheet(null); setEditEvent(null); }}
          onDelete={editEvent ? () => { delEvent(editEvent.id); setSheet(null); setEditEvent(null); } : null} />
      </Sheet>
    </div>
  );
}

function OrgForm({ initial, onSave, onDelete }) {
  const [name, setName] = useState(initial ? initial.name : "");
  const [type, setType] = useState(initial ? (initial.type || "empresa") : "empresa");
  const [baseCost, setBaseCost] = useState(initial && initial.baseCost ? String(initial.baseCost) : "");
  const [note, setNote] = useState(initial ? (initial.note || "") : "");
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {ORG_TYPES.map((tp) => <Chip key={tp.k} active={type === tp.k} onClick={() => setType(tp.k)}>{tp.l}</Chip>)}
      </div>
      <Field label="Nombre"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder={type === "artista" ? "Ej. DJ Nébula" : "Ej. Sala Aurora"} autoFocus /></Field>
      <Field label="Coste fijo / cuota (opcional €)"><input type="number" inputMode="decimal" style={inputStyle} value={baseCost} onChange={(e) => setBaseCost(e.target.value)} placeholder="0,00" /></Field>
      <Field label="Notas (opcional)"><textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Contacto, condiciones, lo que sea…" /></Field>
      <PrimaryBtn full color={C.purple} onClick={() => { if (name.trim()) onSave({ name: name.trim(), type, baseCost: Number(baseCost || 0), note: note.trim() }); }}><Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>{initial ? "Guardar" : "Crear"}</span></PrimaryBtn>
      {onDelete && <button onClick={onDelete} style={{ ...iconBtn, width: "100%", height: 46, marginTop: 10, gap: 8, fontWeight: 700, fontSize: 13.5, color: C.bad }}><Trash2 size={15} /> Borrar</button>}
    </div>
  );
}

function OrgEventForm({ initial, onSave, onDelete }) {
  const [name, setName] = useState(initial ? initial.name : "");
  const [date, setDate] = useState(initial && initial.date ? initial.date : todayISO());
  const [income, setIncome] = useState(initial && initial.income != null ? String(initial.income) : "");
  const [cost, setCost] = useState(initial && initial.cost != null ? String(initial.cost) : "");
  const [note, setNote] = useState(initial ? (initial.note || "") : "");
  const p = Number(income || 0) - Number(cost || 0);
  return (
    <div>
      <Field label="Evento / colaboración"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Fiesta aniversario" autoFocus /></Field>
      <Field label="Fecha"><input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} /></Field>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><Field label="Ingreso (€)"><input type="number" inputMode="decimal" style={inputStyle} value={income} onChange={(e) => setIncome(e.target.value)} placeholder="0,00" /></Field></div>
        <div style={{ flex: 1 }}><Field label="Coste (€)"><input type="number" inputMode="decimal" style={inputStyle} value={cost} onChange={(e) => setCost(e.target.value)} placeholder="0,00" /></Field></div>
      </div>
      <div style={{ ...card, padding: "10px 12px", background: C.well, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: C.textLo, fontSize: 12.5, fontWeight: 700 }}>Beneficio de este evento</span>
        <span style={{ color: p >= 0 ? C.good : C.bad, fontWeight: 900, fontSize: 15 }}>{p >= 0 ? "+" : ""}{money(p)}</span>
      </div>
      <Field label="Nota (opcional)"><input style={inputStyle} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Detalle…" /></Field>
      <PrimaryBtn full onClick={() => { if (name.trim() || income || cost) onSave({ name: name.trim() || "Evento", date, income: Number(income || 0), cost: Number(cost || 0), note: note.trim() }); }}><Check size={18} strokeWidth={3} /> {initial ? "Guardar" : "Añadir evento"}</PrimaryBtn>
      {onDelete && <button onClick={onDelete} style={{ ...iconBtn, width: "100%", height: 46, marginTop: 10, gap: 8, fontWeight: 700, fontSize: 13.5, color: C.bad }}><Trash2 size={15} /> Borrar evento</button>}
    </div>
  );
}

function CollectionScreen({ state, dispatch }) {
  const [tab, setTab] = useState("colecciones");
  const [sheet, setSheet] = useState(null); // 'col' | 'item' | 'fiado'
  const [activeCol, setActiveCol] = useState(null);
  const [editFiado, setEditFiado] = useState(null);

  return (
    <div style={{ padding: "20px 18px 0" }}>
      <Title kicker="Lo que tienes y prestas">Colecciones</Title>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        <Chip active={tab === "colecciones"} onClick={() => setTab("colecciones")}>Colecciones</Chip>
        <Chip active={tab === "empresas"} onClick={() => setTab("empresas")}>Empresas y artistas</Chip>
        <Chip active={tab === "fiados"} onClick={() => setTab("fiados")}>Fiados</Chip>
      </div>

      {tab === "empresas" && <OrgsPanel state={state} dispatch={dispatch} />}

      {tab === "colecciones" && (
        activeCol ? (
          <ColDetail
            col={state.collections.find((c) => c.id === activeCol)}
            onBack={() => setActiveCol(null)}
            onAddItem={() => setSheet("item")}
            onDelItem={(iid) => {
              const c = state.collections.find((c) => c.id === activeCol);
              dispatch({ type: "update", col: "collections", id: activeCol, patch: { items: c.items.filter((i) => i.id !== iid) } });
            }}
            onUpdateItem={(iid, patch) => {
              const c = state.collections.find((c) => c.id === activeCol);
              dispatch({ type: "update", col: "collections", id: activeCol, patch: { items: c.items.map((i) => (i.id === iid ? { ...i, ...patch } : i)) } });
            }}
            onRename={(name) => dispatch({ type: "update", col: "collections", id: activeCol, patch: { name } })}
            onDeleteCol={() => { dispatch({ type: "remove", col: "collections", id: activeCol }); setActiveCol(null); }}
          />
        ) : state.collections.length === 0 ? (
          <EmptyState face="happy" title="Empieza tu colmena" sub="Crea colecciones para todo lo que guardas: vinilos, cartas, monedas, sneakers… lo que sea." cta="Nueva colección" onCta={() => setSheet("col")} />
        ) : (
          <div className="bstagger" style={{ display: "grid", gap: 12 }}>
            {state.collections.length > 1 && state.collections.some((c) => (c.items || []).some((i) => Number(i.value))) && (
              <HBars
                icon={BarChart3}
                title="Valor por colección"
                sub={money(state.collections.reduce((s, c) => s + (c.items || []).reduce((a, i) => a + Number(i.value || 0), 0), 0))}
                data={state.collections.map((c) => { const v = (c.items || []).reduce((a, i) => a + Number(i.value || 0), 0); return { label: c.name, value: v, display: money(v) }; }).filter((d) => d.value > 0).sort((a, b) => b.value - a.value)}
              />
            )}
            {state.collections.map((c) => {
              const val = (c.items || []).reduce((s, i) => s + Number(i.value || 0), 0);
              return (
                <button key={c.id} onClick={() => setActiveCol(c.id)} style={{ ...card, padding: 16, textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: C.purple, display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Boxes size={24} color="#fff" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: C.textHi, fontWeight: 800, fontSize: 16 }}>{c.name}</div>
                    <div style={{ color: C.textLo, fontSize: 12.5, marginTop: 2 }}>{(c.items || []).length} piezas{val ? ` · ${money(val)}` : ""}</div>
                  </div>
                  <ChevronRight size={20} color={C.textLo} />
                </button>
              );
            })}
          </div>
        )
      )}

      {tab === "fiados" && (
        state.fiados.length === 0 ? (
          <EmptyState face="neutral" title="Nada prestado" sub="Apunta lo que dejas a alguien y a quién, para que nunca se te pierda." cta="Apuntar fiado" onCta={() => setSheet("fiado")} />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {[...state.fiados].sort((a, b) => Number(a.returned) - Number(b.returned)).map((f) => (
              <div key={f.id} style={{ ...card, padding: 14, opacity: f.returned ? 0.5 : 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: C.ink3, display: "grid", placeItems: "center" }}><Gift size={19} color={C.yellow} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>{f.item}</div>
                    <div style={{ color: C.textLo, fontSize: 12 }}>A {f.person} · {fmtDate(f.date)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => dispatch({ type: "update", col: "fiados", id: f.id, patch: { returned: !f.returned } })} style={miniBtn(f.returned ? C.line : C.yellow, f.returned ? C.textLo : C.ink)}>
                    {f.returned ? "Devuelto ✓" : "Marcar devuelto"}
                  </button>
                  <button onClick={() => { setEditFiado(f); setSheet("fiado"); }} style={{ ...iconBtn, width: 32, height: 32, color: C.textLo }}><Pencil size={14} /></button>
                  <button onClick={() => dispatch({ type: "remove", col: "fiados", id: f.id })} style={{ ...iconBtn, width: 32, height: 32, color: C.textLo }}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      <div style={{ height: 122 }} />
      {tab !== "empresas" && !(tab === "colecciones" && activeCol) && (
        <FAB onClick={() => { setEditFiado(null); setSheet(tab === "fiados" ? "fiado" : "col"); }} label={tab === "fiados" ? "Fiado" : "Colección"} />
      )}

      <Sheet open={sheet === "col"} onClose={() => setSheet(null)} title="Nueva colección">
        <SimpleNameForm placeholder="Ej. Vinilos, sneakers, cartas…" onSave={(name) => { dispatch({ type: "add", col: "collections", item: { id: uid(), name, items: [] } }); setSheet(null); }} />
      </Sheet>
      <Sheet open={sheet === "item"} onClose={() => setSheet(null)} title="Añadir pieza">
        <ItemForm onSave={(d) => {
          const c = state.collections.find((c) => c.id === activeCol);
          dispatch({ type: "update", col: "collections", id: activeCol, patch: { items: [{ id: uid(), ...d }, ...(c.items || [])] } });
          setSheet(null);
        }} />
      </Sheet>
      <Sheet open={sheet === "fiado"} onClose={() => { setSheet(null); setEditFiado(null); }} title={editFiado ? "Editar fiado" : "Nuevo fiado"}>
        <FiadoForm initial={editFiado}
          onSave={(d) => { if (editFiado) dispatch({ type: "update", col: "fiados", id: editFiado.id, patch: d }); else dispatch({ type: "add", col: "fiados", item: { id: uid(), date: todayISO(), returned: false, ...d } }); setSheet(null); setEditFiado(null); }}
          onDelete={editFiado ? () => { dispatch({ type: "remove", col: "fiados", id: editFiado.id }); setSheet(null); setEditFiado(null); } : null} />
      </Sheet>
    </div>
  );
}

function ColDetail({ col, onBack, onAddItem, onDelItem, onUpdateItem, onRename, onDeleteCol }) {
  const [renaming, setRenaming] = useState(false);
  const [nm, setNm] = useState("");
  if (!col) return null;
  const val = (col.items || []).reduce((s, i) => s + Number(i.value || 0), 0);
  return (
    <div>
      <button onClick={onBack} style={{ ...linkBtn, marginBottom: 12 }}><ChevronLeft size={16} /> Colecciones</button>
      {renaming ? (
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <input autoFocus style={inputStyle} value={nm} onChange={(e) => setNm(e.target.value)} placeholder="Nombre de la colección" />
          <button onClick={() => { if (nm.trim()) onRename(nm.trim()); setRenaming(false); }} style={{ ...iconBtn, width: 46, height: 46, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Check size={18} strokeWidth={3} /></button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14, gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ color: C.textHi, fontWeight: 900, fontSize: 24, margin: 0 }}>{col.name}</h2>
            <div style={{ color: C.textLo, fontSize: 13 }}>{(col.items || []).length} piezas · {money(val)}</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button onClick={() => { setNm(col.name); setRenaming(true); }} title="Renombrar" style={{ ...iconBtn, width: 44, height: 44 }}><Pencil size={17} /></button>
            <button onClick={() => { if (typeof window === "undefined" || window.confirm(`¿Borrar la colección "${col.name}" y todas sus piezas?`)) onDeleteCol(); }} title="Borrar colección" style={{ ...iconBtn, width: 44, height: 44, color: C.bad }}><Trash2 size={17} /></button>
            <button onClick={onAddItem} style={{ ...iconBtn, width: 44, height: 44, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Plus size={22} strokeWidth={3} /></button>
          </div>
        </div>
      )}
      {(col.items || []).length === 0 ? (
        <EmptyState title="Colección vacía" sub="Añade la primera pieza de esta colección." cta="Añadir pieza" onCta={onAddItem} />
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {col.items.map((i) => <CollectionItemCard key={i.id} item={i} onUpdate={(patch) => onUpdateItem(i.id, patch)} onDel={() => onDelItem(i.id)} />)}
        </div>
      )}
      <div style={{ height: 80 }} />
    </div>
  );
}

function CollectionItemCard({ item, onUpdate, onDel }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const change = item.value != null && item.prev != null && item.prev !== 0 ? ((item.value - item.prev) / item.prev) * 100 : null;
  const up = change != null && change >= 0;
  const setValue = (newVal) => {
    const v = Number(newVal);
    if (!isFinite(v)) return;
    const hist = [...(item.history || []), { t: nowISO(), v }].slice(-30);
    onUpdate({ prev: item.value != null ? item.value : v, value: v, history: hist });
  };
  const estimate = async () => {
    setAiBusy(true);
    try { const p = await aiEstimatePrice(`${item.name}${item.note ? " (" + item.note + ")" : ""}`); if (p != null) setValue(p); } catch {} finally { setAiBusy(false); }
  };
  return (
    <div style={{ ...card, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {item.photo ? <Thumb src={item.photo} size={48} radius={12} /> : <div style={{ width: 48, height: 48, borderRadius: 12, background: C.ink3, display: "grid", placeItems: "center", flexShrink: 0 }}><Star size={18} color={C.yellow} /></div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>{item.name}</div>
          {item.note && <div style={{ color: C.textLo, fontSize: 12 }}>{item.note}</div>}
        </div>
        {(item.history || []).length > 1 && <Sparkline history={item.history} color={change == null ? C.textLo : up ? C.good : C.bad} w={56} h={26} />}
        <div style={{ textAlign: "right" }}>
          <div style={{ color: C.yellow, fontWeight: 800, fontSize: 15 }}>{item.value != null ? money(item.value) : "—"}</div>
          {change != null && (
            <div style={{ color: up ? C.good : C.bad, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
              {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(change).toFixed(1)}%
            </div>
          )}
        </div>
      </div>
      {editing ? (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input type="number" inputMode="decimal" autoFocus style={{ ...inputStyle, padding: "9px 12px" }} value={val} onChange={(e) => setVal(e.target.value)} placeholder="Nuevo valor en €" />
          <button onClick={() => { if (val) setValue(val); setVal(""); setEditing(false); }} style={{ ...iconBtn, width: 42, height: 42, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Check size={18} strokeWidth={3} /></button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={() => setEditing(true)} style={miniBtn(C.ink3, C.textHi)}>Actualizar valor</button>
          <button onClick={estimate} disabled={aiBusy} style={miniBtn("rgba(144,19,254,.18)", C.purple)}>{aiBusy ? "Estimando…" : "Estimar con IA"}</button>
          <button onClick={onDel} style={{ ...iconBtn, width: 38, height: 38, color: C.textLo }}><Trash2 size={14} /></button>
        </div>
      )}
    </div>
  );
}

function SimpleNameForm({ onSave, placeholder }) {
  const [v, setV] = useState("");
  return (
    <div>
      <Field label="Nombre"><input style={inputStyle} value={v} onChange={(e) => setV(e.target.value)} placeholder={placeholder} autoFocus /></Field>
      <PrimaryBtn full onClick={() => v.trim() && onSave(v.trim())}><Check size={18} strokeWidth={3} /> Crear</PrimaryBtn>
    </div>
  );
}
function ItemForm({ onSave }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState(null);
  return (
    <div>
      <Field label="Foto (opcional)"><PhotoPicker value={photo} onChange={setPhoto} /></Field>
      <Field label="Pieza"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la pieza" autoFocus /></Field>
      <Field label="Nota / detalle"><input style={inputStyle} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Estado, edición, año…" /></Field>
      <Field label="Valor estimado (€)"><input type="number" inputMode="decimal" style={inputStyle} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Opcional" /></Field>
      <PrimaryBtn full onClick={() => name.trim() && onSave({ name: name.trim(), note, value: Number(value || 0), photo })}><Check size={18} strokeWidth={3} /> Añadir</PrimaryBtn>
    </div>
  );
}
function FiadoForm({ initial, onSave, onDelete }) {
  const [item, setItem] = useState(initial?.item || "");
  const [person, setPerson] = useState(initial?.person || "");
  return (
    <div>
      <Field label="¿Qué prestas?"><input style={inputStyle} value={item} onChange={(e) => setItem(e.target.value)} placeholder="Objeto" autoFocus /></Field>
      <Field label="¿A quién?"><input style={inputStyle} value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Nombre" /></Field>
      <PrimaryBtn full onClick={() => item.trim() && person.trim() && onSave({ item: item.trim(), person: person.trim() })}><Check size={18} strokeWidth={3} /> {initial ? "Guardar cambios" : "Guardar"}</PrimaryBtn>
      {onDelete && <button onClick={onDelete} style={{ ...iconBtn, width: "100%", height: 44, marginTop: 10, gap: 8, fontWeight: 700, fontSize: 13.5, color: C.bad, borderColor: "rgba(255,92,92,.4)" }}><Trash2 size={16} /> Borrar fiado</button>}
    </div>
  );
}

/* ============================================================
   CEREBRO — Objetivos + Notas + Chat IA
   ============================================================ */
function BrainScreen({ state, dispatch, ai }) {
  const [tab, setTab] = useState("objetivos");
  const [sheet, setSheet] = useState(null); // 'goal' | 'note' | 'habit'
  const [editGoal, setEditGoal] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div style={{ padding: "20px 18px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Title kicker="Tu conciencia">Cerebro</Title>
        {ai && (
          <button onClick={() => setChatOpen(true)} style={{ ...iconBtn, width: 46, height: 46, background: C.purple, borderColor: C.purple }}>
            <Sparkles size={20} color="#fff" />
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        <Chip active={tab === "objetivos"} onClick={() => setTab("objetivos")} accent={C.purple}>Objetivos</Chip>
        <Chip active={tab === "habitos"} onClick={() => setTab("habitos")} accent={C.purple}>Hábitos</Chip>
        <Chip active={tab === "notas"} onClick={() => setTab("notas")} accent={C.purple}>Notas</Chip>
      </div>

      {tab === "objetivos" && (
        state.goals.length === 0 ? (
          <EmptyState face="happy" title="¿Hacia dónde vas?" sub="Define objetivos y divídelos en pasos. Brosin te lleva paso a paso." cta="Nuevo objetivo" onCta={() => setSheet("goal")} />
        ) : (
          <div className="bstagger" style={{ display: "grid", gap: 12 }}>
            {state.goals.map((g) => <GoalCard key={g.id} g={g} dispatch={dispatch} onEdit={() => { setEditGoal(g); setSheet("goal"); }} />)}
          </div>
        )
      )}

      {tab === "habitos" && (
        <HabitsList habits={state.habits} dispatch={dispatch} onAdd={() => setSheet("habit")} />
      )}

      {tab === "notas" && (
        state.notes.length === 0 ? (
          <EmptyState face="neutral" title="Bóveda vacía" sub="Guarda aquí información valiosa: claves, ideas, lo que no quieres perder." cta="Nueva nota" onCta={() => setSheet("note")} />
        ) : (
          <div className="bstagger" style={{ display: "grid", gap: 10 }}>
            {[...state.notes].sort((a, b) => Number(b.pinned) - Number(a.pinned)).map((n) => (
              <div key={n.id} style={{ ...card, padding: 14, borderColor: n.pinned ? C.purple : C.line }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ color: C.textHi, fontWeight: 800, fontSize: 15 }}>{n.title}</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => dispatch({ type: "update", col: "notes", id: n.id, patch: { pinned: !n.pinned } })} style={{ ...iconBtn, width: 28, height: 28, color: n.pinned ? C.purple : C.textLo }}><Pin size={13} fill={n.pinned ? C.purple : "none"} /></button>
                    <button onClick={() => dispatch({ type: "remove", col: "notes", id: n.id })} style={{ ...iconBtn, width: 28, height: 28, color: C.textLo }}><Trash2 size={13} /></button>
                  </div>
                </div>
                {n.body && <div style={{ color: C.textLo, fontSize: 13.5, marginTop: 6, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{n.body}</div>}
                {n.photo && <div style={{ marginTop: 10 }}><Thumb src={n.photo} size={64} radius={12} /></div>}
              </div>
            ))}
          </div>
        )
      )}

      <div style={{ height: 122 }} />
      <FAB onClick={() => { setEditGoal(null); setSheet(tab === "notas" ? "note" : tab === "habitos" ? "habit" : "goal"); }} label={tab === "notas" ? "Nota" : tab === "habitos" ? "Hábito" : "Objetivo"} />

      <Sheet open={sheet === "goal"} onClose={() => { setSheet(null); setEditGoal(null); }} title={editGoal ? "Editar objetivo" : "Nuevo objetivo"}>
        <GoalForm initial={editGoal} onSave={(d) => { if (editGoal) dispatch({ type: "update", col: "goals", id: editGoal.id, patch: d }); else dispatch({ type: "add", col: "goals", item: { id: uid(), steps: [], ...d } }); setSheet(null); setEditGoal(null); }} />
      </Sheet>
      <Sheet open={sheet === "habit"} onClose={() => setSheet(null)} title="Nuevo hábito">
        <HabitForm onSave={(d) => { dispatch({ type: "add", col: "habits", item: { id: uid(), done: [], ...d } }); setSheet(null); }} />
      </Sheet>
      <Sheet open={sheet === "note"} onClose={() => setSheet(null)} title="Nueva nota">
        <NoteForm onSave={(d) => { dispatch({ type: "add", col: "notes", item: { id: uid(), pinned: false, date: todayISO(), ...d } }); setSheet(null); }} />
      </Sheet>

      {chatOpen && <ChatSheet onClose={() => setChatOpen(false)} state={state} dispatch={dispatch} />}
    </div>
  );
}

function GoalCard({ g, dispatch, onEdit }) {
  const [newStep, setNewStep] = useState("");
  const steps = Array.isArray(g.steps) ? g.steps : [];
  const done = steps.filter((s) => s.done).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;
  const toggle = (sid) => dispatch({ type: "update", col: "goals", id: g.id, patch: { steps: steps.map((s) => s.id === sid ? { ...s, done: !s.done } : s) } });
  const addStep = () => { if (!newStep.trim()) return; dispatch({ type: "update", col: "goals", id: g.id, patch: { steps: [...steps, { id: uid(), text: newStep.trim(), done: false }] } }); setNewStep(""); };
  const delStep = (sid) => dispatch({ type: "update", col: "goals", id: g.id, patch: { steps: steps.filter((s) => s.id !== sid) } });

  return (
    <div style={{ ...card, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Flag size={16} color={C.purple} />
            <div style={{ color: C.textHi, fontWeight: 800, fontSize: 16 }}>{g.title}</div>
          </div>
          {g.deadline && (() => {
            const dd = daysFromNow(g.deadline);
            const complete = steps.length > 0 && steps.every((s) => s.done);
            const col = complete ? C.good : dd < 0 ? C.bad : dd <= 3 ? C.yellow : C.textLo;
            const lbl = complete ? "conseguido" : dd < 0 ? `vencido hace ${-dd} día${-dd === 1 ? "" : "s"}` : dd === 0 ? "¡es hoy!" : `faltan ${dd} día${dd === 1 ? "" : "s"}`;
            return <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span style={{ color: C.textLo, fontSize: 12 }}>Meta: {fmtDate(g.deadline)}</span>
              <span style={{ color: C.ink, background: col, fontSize: 10.5, fontWeight: 800, borderRadius: 6, padding: "1px 6px" }}>{lbl}</span>
            </div>;
          })()}
        </div>
        <button onClick={() => dispatch({ type: "update", col: "goals", id: g.id, patch: { notif: g.notif === false } })} title="Avisos de la meta" style={{ ...iconBtn, width: 30, height: 30, color: g.notif === false ? C.textLo : C.purple, borderColor: g.notif === false ? C.line : C.purple }}><BellRing size={14} /></button>
        {onEdit && <button onClick={onEdit} title="Editar objetivo" style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Pencil size={14} /></button>}
        <button onClick={() => dispatch({ type: "remove", col: "goals", id: g.id })} style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Trash2 size={14} /></button>
      </div>

      {/* progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0" }}>
        <div style={{ flex: 1, height: 8, borderRadius: 999, background: C.rail, boxShadow: "0 1px 3px rgba(0,0,0,.2) inset", overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#a844ff,#8210e6)", borderRadius: 999, transition: "width .4s", boxShadow: "0 1px 0 rgba(255,255,255,.25) inset, 0 0 8px rgba(144,19,254,.4)" }} />
        </div>
        <span style={{ color: C.purple, fontWeight: 800, fontSize: 12.5, fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        {steps.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => toggle(s.id)} style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, border: `2px solid ${s.done ? C.purple : C.line}`, background: s.done ? C.purple : "transparent", display: "grid", placeItems: "center", cursor: "pointer" }}>
              {s.done && <Check size={13} color="#fff" strokeWidth={3.5} />}
            </button>
            <span style={{ flex: 1, color: s.done ? C.textLo : C.textHi, fontSize: 13.5, textDecoration: s.done ? "line-through" : "none" }}>{s.text}</span>
            <button onClick={() => delStep(s.id)} style={{ background: "none", border: "none", color: C.textLo, cursor: "pointer", padding: 4 }}><X size={13} /></button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input style={{ ...inputStyle, padding: "9px 12px", fontSize: 13.5 }} value={newStep} onChange={(e) => setNewStep(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addStep()} placeholder="Añadir paso…" />
        <button onClick={addStep} style={{ ...iconBtn, width: 40, height: 40, background: C.purple, borderColor: C.purple }}><Plus size={18} color="#fff" strokeWidth={3} /></button>
      </div>
    </div>
  );
}

function GoalForm({ initial, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [deadline, setDeadline] = useState(initial?.deadline || "");
  const [why, setWhy] = useState(initial?.why || "");
  const [notif, setNotif] = useState(initial?.notif !== false);
  return (
    <div>
      <Field label="Objetivo"><input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="¿Qué quieres conseguir?" autoFocus /></Field>
      <Field label="Fecha meta (opcional)"><input type="date" style={inputStyle} value={deadline} onChange={(e) => setDeadline(e.target.value)} /></Field>
      <Field label="¿Por qué lo quieres? (opcional)"><input style={inputStyle} value={why} onChange={(e) => setWhy(e.target.value)} placeholder="Tu motivación en una frase" /></Field>
      <button onClick={() => setNotif((n) => !n)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12, marginBottom: 14,
        background: notif ? "rgba(144,19,254,.1)" : C.ink, border: `1.5px solid ${notif ? C.purple : C.line}`,
        borderRadius: 14, padding: "12px 14px", cursor: "pointer",
      }}>
        <BellRing size={18} color={notif ? C.purple : C.textLo} />
        <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14 }}>Avisarme según se acerca la meta</span>
        <span style={{ width: 44, height: 26, borderRadius: 999, background: notif ? C.purple : C.line, position: "relative", transition: "all .2s" }}>
          <span style={{ position: "absolute", top: 3, left: notif ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "all .2s" }} />
        </span>
      </button>
      <PrimaryBtn full color={C.purple} onClick={() => title.trim() && onSave({ title: title.trim(), deadline, why, notif })}><Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>{initial ? "Guardar cambios" : "Crear objetivo"}</span></PrimaryBtn>
    </div>
  );
}
function NoteForm({ onSave }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState(null);
  return (
    <div>
      <Field label="Título"><input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título de la nota" autoFocus /></Field>
      <Field label="Contenido">
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <textarea style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Escribe o dicta con el micro…" />
          <MicButton onResult={setBody} base={body} />
        </div>
      </Field>
      <Field label="Foto (opcional)"><PhotoPicker value={photo} onChange={setPhoto} /></Field>
      <PrimaryBtn full color={C.purple} onClick={() => title.trim() && onSave({ title: title.trim(), body, photo })}><Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>Guardar nota</span></PrimaryBtn>
    </div>
  );
}

/* AI chat — El Colega Sabio */
function ChatSheet({ onClose, state, dispatch }) {
  const [msgs, setMsgs] = useState(state.chat.length ? state.chat : [
    { role: "assistant", content: `Aquí estoy. Conozco tu agenda, tus cuentas, tus objetivos y tus colecciones, así que podemos ir al grano. ¿Sobre qué quieres pensar hoy?` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const scroller = useRef(null);

  useEffect(() => { if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; }, [msgs, loading]);

  const send = async (retry) => {
    const text = retry || input.trim();
    if (!text) return;
    setErr(null);
    let history = msgs;
    if (!retry) {
      history = [...msgs, { role: "user", content: text }];
      setMsgs(history);
      setInput("");
    }
    setLoading(true);
    const sys = `Eres la mente de Brosin: la conciencia inteligente de ${state.profile.name || "tu usuario"}. Hablas con criterio, cultura y precisión — articulado, sereno y perspicaz, como un buen consejero que además es cercano. Tuteas, pero no caes en jerga vacía, muletillas ni el cliché del "colega fumado"; nada de "bro", "tío" o vacile gratuito. Aportas claridad, contexto y una idea útil en cada respuesta; cuando conviene, una observación que invite a pensar. Eres su segundo cerebro y su memoria: YA CONOCES todo lo que tiene registrado (abajo). No le pidas que repita datos que ya tienes — si perdió 50€ el lunes, lo sabes porque está en sus movimientos. Sé conciso pero con sustancia; prosa limpia, sin markdown ni listas largas salvo que lo pida.\n\n=== MEMORIA DE LA APP (todo lo que sé de ${state.profile.name || "ti"}) ===\n${buildMemory(state)}`;
    try {
      const apiMsgs = history.filter((m) => m.role === "user" || m.role === "assistant").slice(-10).map((m) => ({ role: m.role, content: m.content }));
      const txt = await callClaude(apiMsgs, sys);
      const next = [...history, { role: "assistant", content: txt.trim() }];
      setMsgs(next);
      dispatch({ type: "setCol", col: "chat", items: next.slice(-30) });
    } catch (e) {
      setErr(e.code || "net");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.65)", zIndex: 82, display: "flex", flexDirection: "column", justifyContent: "flex-end", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.surfSheet, borderTopLeftRadius: 28, borderTopRightRadius: 28, borderTop: `1px solid ${C.edgeHi}`, boxShadow: `0 1px 0 rgba(255,255,255,.06) inset, 0 -18px 50px ${C.dropSheet}`, height: "88%", display: "flex", flexDirection: "column", animation: "bsheet .32s cubic-bezier(.32,1.25,.45,1)" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 12 }}>
          <BeeMark size={38} face="happy" color={C.purple} />
          <div style={{ flex: 1 }}>
            <div style={{ color: C.textHi, fontWeight: 900, fontSize: 16 }}>La Mente Brosin</div>
            <div style={{ color: C.purple, fontSize: 11.5, fontWeight: 700 }}>Tu conciencia inteligente</div>
          </div>
          <button onClick={onClose} style={iconBtn}><X size={18} /></button>
        </div>

        <div ref={scroller} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "82%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5 }}>
              <div style={{ background: m.role === "user" ? "linear-gradient(180deg,#ffe561,#eec400)" : C.surfBtn, color: m.role === "user" ? C.ink : C.textHi, padding: "11px 14px", borderRadius: 18, borderBottomRightRadius: m.role === "user" ? 5 : 18, borderBottomLeftRadius: m.role === "user" ? 18 : 5, fontSize: 14.5, lineHeight: 1.5, whiteSpace: "pre-wrap", boxShadow: m.role === "user" ? "0 1px 0 rgba(255,255,255,.4) inset, 0 4px 12px rgba(255,212,0,.18)" : C.shadBtn }}>
                {m.content}
              </div>
              {m.role === "assistant" && <SpeakBtn text={m.content} tone={C.purple} />}
            </div>
          ))}
          {loading && <div style={{ alignSelf: "flex-start", background: C.ink3, padding: "14px 16px", borderRadius: 18, borderBottomLeftRadius: 5 }}><Dots /></div>}
          {err && (
            <div style={{ alignSelf: "flex-start", background: "rgba(255,92,92,.12)", border: `1px solid ${C.bad}`, padding: "12px 14px", borderRadius: 16 }}>
              <div style={{ color: C.textHi, fontSize: 13.5, marginBottom: 8 }}>{AI_ERR[err] || AI_ERR.http}</div>
              <button onClick={() => send(msgs[msgs.length - 1]?.role === "user" ? msgs[msgs.length - 1].content : null)} style={{ ...iconBtn, width: "auto", paddingInline: 12, gap: 6, fontWeight: 700, fontSize: 13 }}><RefreshCcw size={14} /> Reintentar</button>
            </div>
          )}
        </div>

        <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.line}`, display: "flex", gap: 10, alignItems: "center" }}>
          <input style={{ ...inputStyle, borderRadius: 999 }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Habla con tu cerebro…" />
          <button className="b3d-purple" onClick={() => send()} disabled={loading} style={{ width: 48, height: 48, borderRadius: 999, flexShrink: 0, background: C.purple, border: "none", display: "grid", placeItems: "center", cursor: "pointer", opacity: loading ? 0.5 : 1 }}>
            <Send size={20} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
function Dots() {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ width: 7, height: 7, borderRadius: 999, background: C.textLo, animation: `bbounce 1s ${i * 0.15}s infinite` }} />)}
    </div>
  );
}

/* ============================================================
   CÁMARA — tickets -> gastos · comidas -> registro
   ============================================================ */
const TICKET_SYS = `Eres un lector de tickets/recibos. Miras la foto de un ticket de compra y devuelves SOLO un JSON, sin markdown ni texto extra:
{"total": number, "comercio": string, "categoria": "General"|"Comida"|"Ocio"|"Hogar"|"Transporte"|"Negocio"|"Colección", "fecha": "YYYY-MM-DD"|null, "resumen": string}
"total" es el importe TOTAL pagado en euros (número, punto decimal). "comercio" el nombre de la tienda si se ve. "resumen" 2-5 palabras de qué se compró. Si algún dato no se ve, usa null (o 0 en total). Nada más que el JSON.`;
const MEAL_SYS = `Eres un nutricionista que mira la foto de un plato de comida. Devuelves SOLO un JSON, sin markdown ni texto extra:
{"plato": string, "calorias": number, "resumen": string, "saludable": boolean}
"plato" nombre del plato/alimentos que ves. "calorias" estimación total aproximada (número). "resumen" una frase corta y útil sobre lo que comió. "saludable" true/false según equilibrio. Nada más que el JSON.`;

function CameraScreen({ state, dispatch, back, toast }) {
  const [mode, setMode] = useState("ticket"); // ticket | comida
  const [photo, setPhoto] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [res, setRes] = useState(null);

  const reset = () => { setPhoto(null); setRes(null); setErr(null); };

  const onPick = async (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true); setErr(null); setRes(null);
    try {
      const img = await compressImage(f, 1100, 0.7);
      setPhoto(img);
      const sys = mode === "ticket" ? TICKET_SYS : MEAL_SYS;
      const prompt = mode === "ticket" ? "Lee este ticket y devuelve el JSON." : "Analiza este plato y devuelve el JSON.";
      const txt = await askVision(img, prompt, sys);
      const j = parseClaudeJson(txt);
      if (!j) { setErr("noread"); }
      else setRes(j);
    } catch (ex) {
      setErr(ex.code || "net");
    } finally {
      setBusy(false);
    }
  };

  const saveTicket = () => {
    const amount = Number(res.total || 0);
    dispatch({ type: "add", col: "tx", item: {
      id: uid(), date: res.fecha || todayISO(), type: "gasto",
      amount, note: res.comercio || res.resumen || "Ticket", category: res.categoria || "General", photo,
    } });
    toast && toast("Gasto añadido ✓", `${money(amount)} · ${res.comercio || res.resumen || "Ticket"}`);
    reset();
  };
  const saveMeal = () => {
    dispatch({ type: "add", col: "meals", item: {
      id: uid(), date: todayISO(), time: new Date().toTimeString().slice(0, 5),
      plato: res.plato || "Comida", calorias: Number(res.calorias || 0), resumen: res.resumen || "", saludable: !!res.saludable, photo,
    } });
    toast && toast("Comida guardada ✓", `${res.plato || "Comida"}${res.calorias ? ` · ~${res.calorias} kcal` : ""}`);
    reset();
  };

  const meals = [...(state.meals || [])].sort((a, b) => (b.date + (b.time || "")).localeCompare(a.date + (a.time || "")));

  return (
    <div style={{ padding: "20px 18px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button onClick={back} style={iconBtn}><ChevronLeft size={18} /></button>
        <Title kicker="Foto inteligente">Cámara</Title>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Chip active={mode === "ticket"} onClick={() => { setMode("ticket"); reset(); }}>Ticket → gasto</Chip>
        <Chip active={mode === "comida"} onClick={() => { setMode("comida"); reset(); }} accent={C.purple}>Comida</Chip>
      </div>

      {/* capture card */}
      <div style={{ ...card, padding: 18, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          {mode === "ticket" ? <Receipt size={18} color={C.yellow} /> : <Utensils size={18} color={C.purple} />}
          <span style={{ color: C.textHi, fontWeight: 800, fontSize: 14.5 }}>
            {mode === "ticket" ? "Foto del ticket" : "Foto del plato"}
          </span>
        </div>

        {photo && (
          <div style={{ marginBottom: 12 }}>
            <img src={photo} alt="" style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 16, border: `1px solid ${C.line}` }} />
          </div>
        )}

        {busy ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.textLo, fontSize: 14, padding: "10px 0" }}>
            <div style={{ animation: "bspin 1s linear infinite" }}><RefreshCcw size={18} color={mode === "ticket" ? C.yellow : C.purple} /></div>
            {mode === "ticket" ? "Leyendo el ticket…" : "Analizando el plato…"}
          </div>
        ) : res ? (
          <div>
            {mode === "ticket" ? (
              <div style={{ display: "grid", gap: 6, marginBottom: 14 }}>
                <div style={{ color: C.textHi, fontWeight: 900, fontSize: 30 }}>{money(res.total || 0)}</div>
                <div style={{ color: C.textLo, fontSize: 13.5 }}>{res.comercio || "Comercio no detectado"} · {res.categoria || "General"}</div>
                {res.resumen && <div style={{ color: C.textLo, fontSize: 13 }}>{res.resumen}</div>}
                {res.fecha && <div style={{ color: C.textLo, fontSize: 12 }}>Fecha: {fmtDate(res.fecha)}</div>}
              </div>
            ) : (
              <div style={{ display: "grid", gap: 6, marginBottom: 14 }}>
                <div style={{ color: C.textHi, fontWeight: 900, fontSize: 20 }}>{res.plato || "Comida"}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {res.calorias ? <span style={{ color: C.yellow, fontWeight: 800, fontSize: 15 }}>~{res.calorias} kcal</span> : null}
                  <span style={{ fontSize: 12, fontWeight: 800, color: res.saludable ? C.good : "#e0a800" }}>{res.saludable ? "Equilibrado" : "A vigilar"}</span>
                </div>
                {res.resumen && <div style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.5 }}>{res.resumen}</div>}
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <PrimaryBtn full color={mode === "ticket" ? C.yellow : C.purple} onClick={mode === "ticket" ? saveTicket : saveMeal}>
                <Check size={18} strokeWidth={3} color={mode === "ticket" ? C.ink : "#fff"} />
                <span style={{ color: mode === "ticket" ? C.ink : "#fff" }}>{mode === "ticket" ? "Añadir a gastos" : "Guardar comida"}</span>
              </PrimaryBtn>
              <button onClick={reset} style={{ ...iconBtn, width: 52, height: 52 }}><X size={18} /></button>
            </div>
          </div>
        ) : (
          <>
            {err && (
              <div style={{ color: C.bad, fontSize: 13, marginBottom: 10 }}>
                {err === "noread" ? "No pude leer bien la foto. Prueba con más luz y el ticket/plato centrado." : (AI_ERR[err] || AI_ERR.http)}
              </div>
            )}
            <label className={mode === "ticket" ? "b3d" : "b3d-purple"} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, height: 52, borderRadius: 16, background: mode === "ticket" ? C.yellow : C.purple, color: mode === "ticket" ? C.ink : "#fff", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
              <Camera size={20} color={mode === "ticket" ? C.ink : "#fff"} /> {photo ? "Otra foto" : "Hacer foto"}
              <input type="file" accept="image/*" capture="environment" onChange={onPick} style={{ display: "none" }} />
            </label>
            <div style={{ color: C.textLo, fontSize: 12, textAlign: "center", marginTop: 10 }}>
              {mode === "ticket" ? "La IA lee el total y lo añade a tus gastos." : "La IA reconoce el plato y estima las calorías."}
            </div>
          </>
        )}
      </div>

      {/* meal history */}
      {mode === "comida" && meals.length > 0 && (
        <>
          <h3 style={{ ...sectionH, marginBottom: 10 }}>Lo que has comido</h3>
          <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
            {meals.slice(0, 20).map((m) => (
              <div key={m.id} style={{ ...card, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                {m.photo ? <Thumb src={m.photo} size={44} radius={12} /> : <div style={{ width: 44, height: 44, borderRadius: 12, background: C.ink3, display: "grid", placeItems: "center" }}><Utensils size={18} color={C.purple} /></div>}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14 }}>{m.plato}</div>
                  <div style={{ color: C.textLo, fontSize: 12 }}>{fmtDate(m.date)}{m.time ? ` · ${m.time}` : ""}{m.calorias ? ` · ~${m.calorias} kcal` : ""}</div>
                </div>
                <button onClick={() => dispatch({ type: "remove", col: "meals", id: m.id })} style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ height: 24 }} />
    </div>
  );
}

/* ============================================================
   PERFIL / AJUSTES
   ============================================================ */
function ProfileScreen({ state, dispatch, onChangePin, hasPin, onResetAll, onRestore, cloud }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [aiKeyOpen, setAiKeyOpen] = useState(false);
  const [backupOpen, setBackupOpen] = useState(false);
  const [cloudOpen, setCloudOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [pushOpen, setPushOpen] = useState(false);
  const totalItems = state.collections.reduce((s, c) => s + (c.items || []).length, 0);
  const stats = [
    { label: "Eventos", value: state.events.length },
    { label: "Movimientos", value: state.tx.length },
    { label: "Piezas", value: totalItems },
    { label: "Objetivos", value: state.goals.length },
    { label: "Notas", value: state.notes.length },
    { label: "Fiados", value: state.fiados.length },
  ];
  return (
    <div style={{ padding: "20px 18px 0" }}>
      <Title kicker="Tu cuenta">Perfil</Title>
      <div style={{ ...card, padding: 18, display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <BeeMark size={56} face="happy" />
        <div>
          <input value={state.profile.name} onChange={(e) => dispatch({ type: "profile", payload: { name: e.target.value } })} style={{ background: "transparent", border: "none", color: C.textHi, fontWeight: 900, fontSize: 22, outline: "none", width: "100%" }} />
          <div style={{ color: C.textLo, fontSize: 12.5 }}>Bro, no te quedes sin.</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ ...card, padding: 14, textAlign: "center" }}>
            <div style={{ color: C.yellow, fontWeight: 900, fontSize: 22 }}>{s.value}</div>
            <div style={{ color: C.textLo, fontSize: 11, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {cloud && (
          <button onClick={() => setCloudOpen(true)} style={{ ...settingRow, borderColor: cloud.user ? C.good : C.line }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: cloud.user ? "rgba(61,220,132,.15)" : C.ink3, display: "grid", placeItems: "center" }}><RefreshCcw size={18} color={cloud.user ? C.good : C.yellow} /></div>
            <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>Cuenta en la nube</span>
            <span style={{ color: cloud.user ? C.good : C.textLo, fontSize: 12, fontWeight: 700, marginRight: 4 }}>{cloud.user ? "Sincronizando" : "Activar"}</span>
            <ChevronRight size={18} color={C.textLo} />
          </button>
        )}
        <button onClick={() => setNotifOpen(true)} style={settingRow}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: C.ink3, display: "grid", placeItems: "center" }}><BellRing size={18} color={C.yellow} /></div>
          <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>Avisos y notificaciones</span>
          <span style={{ color: state.profile.notif?.enabled ? C.good : C.textLo, fontSize: 12, fontWeight: 700, marginRight: 4 }}>{state.profile.notif?.enabled ? "ON" : "OFF"}</span>
          <ChevronRight size={18} color={C.textLo} />
        </button>
        <button onClick={() => setPushOpen(true)} style={{ ...settingRow, borderColor: state.profile.pushOn ? C.good : C.line }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: state.profile.pushOn ? "rgba(61,220,132,.15)" : C.ink3, display: "grid", placeItems: "center" }}><BellRing size={18} color={state.profile.pushOn ? C.good : C.purple} /></div>
          <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>Avisos en el móvil (app cerrada)</span>
          <span style={{ color: state.profile.pushOn ? C.good : C.textLo, fontSize: 12, fontWeight: 700, marginRight: 4 }}>{state.profile.pushOn ? "ON" : "Activar"}</span>
          <ChevronRight size={18} color={C.textLo} />
        </button>
        <button onClick={() => dispatch({ type: "profile", payload: { theme: state.profile.theme === "light" ? "dark" : "light" } })} style={settingRow}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: C.ink3, display: "grid", placeItems: "center" }}>{state.profile.theme === "light" ? <Sun size={18} color={C.yellow} /> : <Moon size={18} color={C.yellow} />}</div>
          <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>Tema de la app</span>
          <span style={{ color: C.textLo, fontSize: 12, fontWeight: 700, marginRight: 4 }}>{state.profile.theme === "light" ? "Claro" : "Noche"}</span>
          <ChevronRight size={18} color={C.textLo} />
        </button>
        <button onClick={onChangePin} style={settingRow}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: C.ink3, display: "grid", placeItems: "center" }}><Lock size={18} color={C.yellow} /></div>
          <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>{hasPin ? "Cambiar PIN" : "Poner PIN de bloqueo"}</span>
          <ChevronRight size={18} color={C.textLo} />
        </button>
        <button onClick={() => setBackupOpen(true)} style={settingRow}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: C.ink3, display: "grid", placeItems: "center" }}><Download size={18} color={C.yellow} /></div>
          <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>Copia de seguridad</span>
          {state.profile.lastBackup && <span style={{ color: C.textLo, fontSize: 11, marginRight: 4 }}>{fmtDate(state.profile.lastBackup)}</span>}
          <ChevronRight size={18} color={C.textLo} />
        </button>
        <button onClick={() => setAiKeyOpen(true)} style={settingRow}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: C.ink3, display: "grid", placeItems: "center" }}><Sparkles size={18} color={C.purple} /></div>
          <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>Conectar IA (app instalada)</span>
          {(() => {
            const st = state.profile.aiStatus;
            const map = { ok: ["Conectada ✓", C.good], nocredits: ["Sin saldo", "#e0a800"], invalid: ["Revisar clave", C.bad] };
            const s = map[st] || [state.profile.aiKey ? "Sin probar" : "—", C.textLo];
            return <span style={{ color: s[1], fontSize: 12, fontWeight: 700, marginRight: 4 }}>{s[0]}</span>;
          })()}
          <ChevronRight size={18} color={C.textLo} />
        </button>
        <button onClick={() => setFeedbackOpen(true)} style={settingRow}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(144,19,254,.15)", display: "grid", placeItems: "center" }}><MessageCircle size={18} color={C.purple} /></div>
          <span style={{ flex: 1, textAlign: "left", color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>Enviar feedback</span>
          <ChevronRight size={18} color={C.textLo} />
        </button>
        <button onClick={onResetAll} style={settingRow}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(255,92,92,.12)", display: "grid", placeItems: "center" }}><Trash2 size={18} color={C.bad} /></div>
          <span style={{ flex: 1, textAlign: "left", color: C.bad, fontWeight: 700, fontSize: 14.5 }}>Borrar todos mis datos</span>
          <ChevronRight size={18} color={C.textLo} />
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 30, marginBottom: 24 }}>
        <BeeMark size={30} face="neutral" color={C.line} />
        <div style={{ color: C.textLo, fontSize: 11, letterSpacing: 1, marginTop: 6 }}>BROSIN OS · Tu segundo cerebro</div>
      </div>

      <Sheet open={notifOpen} onClose={() => setNotifOpen(false)} title="Avisos y notificaciones">
        <NotifSettings notif={state.profile.notif || {}} onChange={(patch) => dispatch({ type: "profile", payload: { notif: { ...(state.profile.notif || {}), ...patch } } })} />
      </Sheet>

      <Sheet open={aiKeyOpen} onClose={() => setAiKeyOpen(false)} title="Conectar IA">
        <AiKeyForm value={state.profile.aiKey || ""} onSave={(k, status) => { dispatch({ type: "profile", payload: { aiKey: k, aiStatus: status } }); }} />
      </Sheet>

      {cloud && (
        <Sheet open={cloudOpen} onClose={() => setCloudOpen(false)} title="Cuenta en la nube">
          <CloudPanel cloud={cloud} />
        </Sheet>
      )}

      <Sheet open={backupOpen} onClose={() => setBackupOpen(false)} title="Copia de seguridad">
        <BackupPanel state={state} onMark={() => dispatch({ type: "profile", payload: { lastBackup: nowISO() } })} onRestore={(data) => { onRestore(data); setBackupOpen(false); }} />
      </Sheet>

      <Sheet open={feedbackOpen} onClose={() => setFeedbackOpen(false)} title="Enviar feedback">
        <FeedbackPanel name={state.profile.name} />
      </Sheet>

      <Sheet open={pushOpen} onClose={() => setPushOpen(false)} title="Avisos en el móvil">
        <PushPanel cloud={cloud} on={state.profile.pushOn} onOn={(v) => dispatch({ type: "profile", payload: { pushOn: v } })} />
      </Sheet>
    </div>
  );
}

function PushPanel({ cloud, on, onOn }) {
  const [status, setStatus] = useState(on ? "ok" : null); // null | working | ok | error
  const [msg, setMsg] = useState("");
  const enable = async () => {
    if (!pushSupported()) { setStatus("error"); setMsg("Este navegador no soporta avisos push. En iPhone: ábrela desde el icono de la pantalla de inicio (instalada), no desde Safari."); return; }
    if (!cloud || !cloud.user) { setStatus("error"); setMsg("Primero activa tu Cuenta en la nube (en Perfil), y luego vuelve aquí a activar los avisos."); return; }
    setStatus("working"); setMsg("");
    try {
      const sb = await getSupa();
      const r = await enablePush(sb, cloud.user.id);
      if (r.ok) { setStatus("ok"); setMsg("¡Activados! Te llegarán aunque tengas la app cerrada o el móvil bloqueado."); onOn && onOn(true); }
      else if (r.reason === "denied") { setStatus("error"); setMsg("No diste permiso. En iPhone: Ajustes → Brosinos → Notificaciones (permitir), y reintenta."); }
      else if (r.reason === "unsupported") { setStatus("error"); setMsg("En iPhone tienes que abrirla desde el icono instalado en la pantalla de inicio para poder activar avisos."); }
      else { setStatus("error"); setMsg("No se pudo activar. Reintenta en un momento."); }
    } catch (e) { setStatus("error"); setMsg("Error al activar. Reintenta."); }
  };
  return (
    <div>
      <div style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.55, marginBottom: 14 }}>
        Activa esto para que Brosin te avise de eventos, cumpleaños y metas <b style={{ color: C.textHi }}>aunque tengas la app cerrada o el móvil bloqueado</b>. Necesitas tener la <b style={{ color: C.textHi }}>Cuenta en la nube</b> activada.
      </div>
      <PrimaryBtn full color={status === "ok" ? C.good : C.purple} onClick={enable}>
        {status === "working" ? <><span style={{ display: "inline-flex", animation: "bspin 1s linear infinite" }}><RefreshCcw size={18} /></span> Activando…</> : status === "ok" ? <><Check size={18} strokeWidth={3} /> <span>Avisos activados ✓</span></> : <><BellRing size={18} /> <span style={{ color: "#fff" }}>Activar avisos en el móvil</span></>}
      </PrimaryBtn>
      {msg && <div style={{ marginTop: 12, color: status === "ok" ? C.good : C.textLo, fontSize: 13, lineHeight: 1.5 }}>{msg}</div>}
      {status === "ok" && (
        <button onClick={enable} style={{ ...iconBtn, width: "auto", paddingInline: 14, height: 38, marginTop: 12, gap: 8, fontSize: 13, color: C.textLo }}><RefreshCcw size={14} /> Reactivar en este móvil</button>
      )}
      <div style={{ color: C.textLo, fontSize: 11.5, marginTop: 14, lineHeight: 1.5 }}>Consejo: haz esto en el móvil donde quieras recibir los avisos (uno por móvil). Los avisos pueden tardar un poco en llegar; iPhone a veces los agrupa.</div>
    </div>
  );
}

const FEEDBACK_WA = "34644466134";
const FEEDBACK_EMAIL = "brosin420culture@gmail.com";
function FeedbackPanel({ name }) {
  const [text, setText] = useState("");
  const signed = (name ? `${name}: ` : "") + (text || "");
  const waHref = `https://wa.me/${FEEDBACK_WA}?text=${encodeURIComponent("Feedback de Brosinos — " + signed)}`;
  const mailHref = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent("Feedback de Brosinos")}&body=${encodeURIComponent(signed)}`;
  return (
    <div>
      <div style={{ color: C.textLo, fontSize: 13.5, marginBottom: 14, lineHeight: 1.5 }}>¿Qué te ha gustado o qué mejorarías? Cuéntamelo y me llega directo. ¡Gracias por probar Brosinos! 🐝</div>
      <Field label="Tu mensaje"><textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} value={text} onChange={(e) => setText(e.target.value)} placeholder="Lo que quieras contarme…" /></Field>
      <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", marginBottom: 10 }}>
        <div style={{ ...card, padding: 14, display: "flex", alignItems: "center", gap: 12, background: "rgba(37,211,102,.12)", border: "1px solid #25D366" }}>
          <MessageCircle size={20} color="#25D366" />
          <span style={{ flex: 1, color: C.textHi, fontWeight: 800, fontSize: 14.5 }}>Enviar por WhatsApp</span>
          <ChevronRight size={18} color={C.textLo} />
        </div>
      </a>
      <a href={mailHref} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ ...card, padding: 14, display: "flex", alignItems: "center", gap: 12, background: C.ink3 }}>
          <Send size={19} color={C.yellow} />
          <span style={{ flex: 1, color: C.textHi, fontWeight: 800, fontSize: 14.5 }}>Enviar por correo</span>
          <ChevronRight size={18} color={C.textLo} />
        </div>
      </a>
      <div style={{ color: C.textLo, fontSize: 11.5, marginTop: 12, textAlign: "center" }}>Se abrirá WhatsApp o tu correo con el mensaje ya puesto.</div>
    </div>
  );
}

function NotifSettings({ notif, onChange }) {
  const leadOptions = [
    { v: 1440, l: "1 día antes" },
    { v: 120, l: "2 h antes" },
    { v: 60, l: "1 h antes" },
    { v: 30, l: "30 min antes" },
    { v: 10, l: "10 min antes" },
    { v: 0, l: "A la hora" },
  ];
  const nagOptions = [
    { v: 15, l: "Cada 15 min" },
    { v: 30, l: "Cada 30 min" },
    { v: 60, l: "Cada hora" },
    { v: 120, l: "Cada 2 h" },
  ];
  const leads = notif.leads || [];
  const toggleLead = (v) => onChange({ leads: leads.includes(v) ? leads.filter((x) => x !== v) : [...leads, v].sort((a, b) => b - a) });
  const enable = async () => {
    if (notif.enabled) { onChange({ enabled: false }); return; }
    const ok = await notify.ensure();
    onChange({ enabled: true });
    if (ok) notify.fire("Brosin activado", "Te avisaré para que no se te escape nada, bro.");
  };
  return (
    <div>
      <button onClick={enable} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
        background: notif.enabled ? "rgba(61,220,132,.1)" : C.ink, border: `1.5px solid ${notif.enabled ? C.good : C.line}`,
        borderRadius: 16, padding: "14px 16px", cursor: "pointer",
      }}>
        <BellRing size={20} color={notif.enabled ? C.good : C.textLo} />
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ color: C.textHi, fontWeight: 800, fontSize: 15 }}>Notificaciones</div>
          <div style={{ color: C.textLo, fontSize: 12 }}>{notif.enabled ? "Activadas — no te quedas sin nada" : "Toca para activar y dar permiso"}</div>
        </div>
        <span style={{ width: 46, height: 28, borderRadius: 999, background: notif.enabled ? C.good : C.line, position: "relative" }}>
          <span style={{ position: "absolute", top: 3, left: notif.enabled ? 21 : 3, width: 22, height: 22, borderRadius: 999, background: "#fff", transition: "all .2s" }} />
        </span>
      </button>

      <div style={{ opacity: notif.enabled ? 1 : 0.45, pointerEvents: notif.enabled ? "auto" : "none" }}>
        <div style={{ color: C.textLo, fontSize: 12, fontWeight: 700, marginBottom: 8, letterSpacing: 0.3 }}>PRE-RECORDATORIOS (antes de cada cosa)</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {leadOptions.map((o) => <Chip key={o.v} active={leads.includes(o.v)} onClick={() => toggleLead(o.v)}>{o.l}</Chip>)}
        </div>

        <div style={{ ...card, padding: 12, background: C.well, fontSize: 12.5, color: C.textLo, lineHeight: 1.5 }}>
          El <b style={{ color: C.textHi }}>recordatorio insistente</b> ya no es general: se activa <b style={{ color: C.textHi }}>en cada evento</b> cuando lo creas (opción "recordatorio insistente"). Así solo insisten las cosas que tú marques.
        </div>

        <div style={{ ...card, padding: 12, marginTop: 12, background: C.well, fontSize: 12.5, color: C.textLo, lineHeight: 1.5 }}>
          Brosin te avisa mientras la app está abierta o en segundo plano (según tu móvil). Para avisos con la app cerrada, añádela a tu pantalla de inicio (PWA) y permite notificaciones.
        </div>
      </div>
    </div>
  );
}
const settingRow = { ...card, padding: 12, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: `1px solid ${C.line}` };

function BackupConfirm({ data, onCancel, onRestore }) {
  return (
    <div>
      <div style={{ ...card, padding: 14, marginBottom: 14 }}>
        <div style={{ color: C.textHi, fontWeight: 800, fontSize: 14.5, marginBottom: 8 }}>Esta copia contiene:</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {Object.entries(countData(data)).map(([k, v]) => (
            <div key={k} style={{ color: C.textLo, fontSize: 12.5 }}><span style={{ color: C.yellow, fontWeight: 800 }}>{v}</span> {k.toLowerCase()}</div>
          ))}
        </div>
      </div>
      <div style={{ ...card, padding: 12, marginBottom: 14, border: `1px solid ${C.line}`, background: "rgba(61,220,132,.06)", color: C.textHi, fontSize: 12.5, lineHeight: 1.5 }}>
        Tranquilo: antes de restaurar, Brosin guarda automáticamente una copia de lo que tienes ahora (por si acaso, la verás en “Automáticas”).
      </div>
      <PrimaryBtn full color={C.bad} onClick={() => onRestore(data)}><RefreshCcw size={18} color="#fff" /> <span style={{ color: "#fff" }}>Restaurar ahora</span></PrimaryBtn>
      <button onClick={onCancel} style={{ ...iconBtn, width: "100%", height: 44, marginTop: 10, gap: 8, fontWeight: 700, fontSize: 13.5, color: C.textLo }}>Cancelar</button>
    </div>
  );
}

function BackupPanel({ state, onRestore, onMark }) {
  const [tab, setTab] = useState("export"); // export | restore | auto
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(null); // staged data awaiting confirm
  const [err, setErr] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null); // {ok, t}
  const [autos, setAutos] = useState([]);

  const snapshot = () => { const { ready, ...rest } = state; return { app: "BrosinOS", v: 6, at: nowISO(), data: rest }; };
  const exportText = JSON.stringify(snapshot());
  const exportCode = encodeBackup(snapshot());
  const counts = countData(state);
  const totalPieces = Object.values(counts).reduce((a, b) => a + b, 0);

  const refreshAutos = () => { readAutoBaks().then(setAutos); };
  useEffect(() => { refreshAutos(); }, []);

  const doSave = async () => {
    setSaveMsg({ ok: true, t: "Preparando copia…" });
    const how = await saveBackup(`brosin-copia-${todayISO()}.json`, exportText);
    onMark && onMark();
    if (how === "shared") setSaveMsg({ ok: true, t: "Elige “Guardar en Archivos” para dejarla en tu móvil." });
    else if (how === "download") setSaveMsg({ ok: true, t: "Copia descargada. Guárdala en un sitio seguro." });
    else if (how === "open") setSaveMsg({ ok: true, t: "Copia abierta: mantén pulsado y guárdala/compártela." });
    else if (how === "cancel") setSaveMsg(null);
    else setSaveMsg({ ok: false, t: "No pude guardar el archivo. Usa “Copiar como código” de abajo." });
  };
  const doDownload = () => { const ok = downloadFile(`brosin-copia-${todayISO()}.json`, exportText); onMark && onMark(); setSaveMsg(ok ? { ok: true, t: "Archivo descargado." } : { ok: false, t: "Tu móvil bloqueó la descarga directa. Prueba “Guardar / compartir” o copia el código." }); };
  const doCopy = () => { try { navigator.clipboard && navigator.clipboard.writeText(exportCode); setCopied(true); onMark && onMark(); setTimeout(() => setCopied(false), 2000); } catch (e) { setSaveMsg({ ok: false, t: "No pude copiar automáticamente." }); } };

  const stage = (obj) => {
    const data = obj && obj.data ? obj.data : obj;
    if (!data || typeof data !== "object" || !("profile" in data || "tx" in data || "events" in data)) { setErr(true); setPending(null); return; }
    setErr(false); setPending(data);
  };
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { let obj = null; try { obj = JSON.parse(r.result); } catch (x) { obj = decodeBackup(r.result); } stage(obj); };
    r.readAsText(f);
    e.target.value = "";
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" }}>
        <Chip active={tab === "export"} onClick={() => { setTab("export"); setPending(null); }}>Guardar</Chip>
        <Chip active={tab === "restore"} onClick={() => { setTab("restore"); setPending(null); }}>Restaurar</Chip>
        <Chip active={tab === "auto"} onClick={() => { setTab("auto"); setPending(null); refreshAutos(); }}>Automáticas</Chip>
      </div>

      {tab === "export" && (
        <div>
          <p style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.55, marginTop: 0 }}>
            Guarda TODO lo de la app (agenda, dinero, colecciones, empresas, equipo, objetivos…). Ahora mismo hay <b style={{ color: C.textHi }}>{totalPieces}</b> cosas guardadas.
          </p>
          <PrimaryBtn full onClick={doSave}><Share2 size={18} strokeWidth={2.6} /> Guardar / compartir copia</PrimaryBtn>
          <button onClick={doDownload} style={{ ...iconBtn, width: "100%", height: 46, marginTop: 10, gap: 8, fontWeight: 800, fontSize: 13.5, background: C.ink2 }}>
            <Download size={16} /> Descargar archivo (ordenador)
          </button>
          <button onClick={doCopy} style={{ ...iconBtn, width: "100%", height: 46, marginTop: 10, gap: 8, fontWeight: 800, fontSize: 13.5, background: C.ink2 }}>
            {copied ? <><Check size={16} color={C.good} /> Código copiado</> : <><Copy size={16} /> Copiar como código</>}
          </button>
          {saveMsg && (
            <div style={{ borderRadius: 12, padding: "10px 12px", marginTop: 12, fontSize: 12.8, background: saveMsg.ok ? "rgba(61,220,132,.12)" : "rgba(255,92,92,.1)", border: `1px solid ${saveMsg.ok ? C.good : C.bad}`, color: C.textHi }}>{saveMsg.t}</div>
          )}
          <div style={{ color: C.textLo, fontSize: 11.5, marginTop: 12, lineHeight: 1.5 }}>
            En iPhone usa <b style={{ color: C.textHi }}>Guardar / compartir</b> → “Guardar en Archivos”. Además, Brosin guarda copias automáticas solo en tu móvil (pestaña “Automáticas”). Si tienes la nube activada, tus datos también viajan solos entre dispositivos.
          </div>
        </div>
      )}

      {tab === "restore" && (
        <div>
          {!pending ? (
            <>
              <p style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.55, marginTop: 0 }}>
                Recupera tus datos desde un archivo de copia o pegando el código.
              </p>
              <label style={{ ...inputStyle, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", fontWeight: 800, color: C.textHi, marginBottom: 12 }}>
                <Download size={18} /> Elegir archivo de copia
                <input type="file" accept=".json,application/json,text/plain" onChange={onFile} style={{ display: "none" }} />
              </label>
              <Field label="…o pega el código">
                <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical", fontFamily: "monospace", fontSize: 12 }} value={code} onChange={(e) => { setCode(e.target.value); setErr(false); }} placeholder="BRSNBAK1:…" />
              </Field>
              {err && <div style={{ color: C.bad, fontSize: 12.5, marginBottom: 10 }}>No reconozco esa copia. Pega el código completo (a veces se corta al copiar).</div>}
              <PrimaryBtn full color={C.ink3} onClick={() => { let obj = null; try { obj = JSON.parse(code); } catch (x) { obj = decodeBackup(code); } stage(obj); }}>
                <span style={{ color: C.textHi }}>Revisar copia</span>
              </PrimaryBtn>
            </>
          ) : <BackupConfirm data={pending} onCancel={() => setPending(null)} onRestore={onRestore} />}
        </div>
      )}

      {tab === "auto" && (
        <div>
          {pending ? <BackupConfirm data={pending} onCancel={() => setPending(null)} onRestore={onRestore} /> : (
            <>
              <p style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.55, marginTop: 0 }}>
                Copias que Brosin guarda solo, en este móvil, cada poco tiempo y antes de cada restauración. Si algo se pierde, recupéralo aquí.
              </p>
              {autos.length === 0 ? (
                <div style={{ ...card, padding: 16, textAlign: "center", color: C.textLo, fontSize: 13 }}>Aún no hay copias automáticas. Se crearán solas mientras usas la app.</div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {autos.map((s, i) => {
                    const c = countData(s.data || {});
                    const tot = Object.values(c).reduce((a, b) => a + b, 0);
                    return (
                      <button key={i} onClick={() => stage(s.data)} style={{ ...card, padding: 12, textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: C.ink3, display: "grid", placeItems: "center", flexShrink: 0 }}><RefreshCcw size={15} color={C.yellow} /></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: C.textHi, fontWeight: 700, fontSize: 13.5 }}>{i === 0 ? "Más reciente" : fmtDateTime(s.at)}</div>
                          <div style={{ color: C.textLo, fontSize: 11.5 }}>{fmtDateTime(s.at)} · {tot} cosas</div>
                        </div>
                        <ChevronRight size={16} color={C.textLo} />
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function CloudPanel({ cloud }) {
  const [email, setEmail] = useState((cloud.user && cloud.user.email) || "");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState("in"); // in | up
  if (cloud.user) {
    return (
      <div>
        <div style={{ ...card, padding: 14, marginBottom: 12, borderColor: C.good, background: "rgba(61,220,132,.08)" }}>
          <div style={{ color: C.textHi, fontWeight: 800, fontSize: 14.5, display: "flex", alignItems: "center", gap: 8 }}><Check size={16} color={C.good} /> Sesión iniciada</div>
          <div style={{ color: C.textLo, fontSize: 13, marginTop: 4 }}>{cloud.user.email}</div>
        </div>
        <p style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.55 }}>
          Tus datos se guardan en la nube y se sincronizan solos entre todos tus dispositivos. Entra con este mismo email en otro móvil u ordenador y tendrás todo.
        </p>
        {cloud.msg && <div style={{ color: cloud.msg.ok ? C.good : C.bad, fontSize: 12.5, marginBottom: 10 }}>{cloud.msg.t}</div>}
        <button onClick={cloud.signOut} style={{ ...iconBtn, width: "100%", height: 46, gap: 8, fontWeight: 800, fontSize: 14, color: C.textLo }}>
          <X size={16} /> Cerrar sesión en este dispositivo
        </button>
      </div>
    );
  }
  return (
    <div>
      <p style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.55, marginTop: 0 }}>
        Crea una cuenta (o entra) para <strong style={{ color: C.textHi }}>guardar tus datos en la nube</strong> y sincronizarlos entre el móvil y el ordenador. Gratis.
      </p>
      <Field label="Email"><input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@email.com" type="email" autoFocus /></Field>
      <Field label="Contraseña"><input style={inputStyle} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="mínimo 6 caracteres" type="password" /></Field>
      {cloud.msg && (
        <div style={{ borderRadius: 12, padding: "10px 12px", marginBottom: 12, fontSize: 12.8, background: cloud.msg.ok ? "rgba(61,220,132,.12)" : "rgba(255,92,92,.1)", border: `1px solid ${cloud.msg.ok ? C.good : C.bad}`, color: C.textHi }}>
          {cloud.msg.t}
        </div>
      )}
      <PrimaryBtn full color={C.good} onClick={cloud.busy ? undefined : () => (mode === "in" ? cloud.signIn(email, pw) : cloud.signUp(email, pw))}>
        <span style={{ color: C.ink }}>{cloud.busy ? "Un momento…" : mode === "in" ? "Entrar" : "Crear cuenta"}</span>
      </PrimaryBtn>
      <button onClick={() => setMode(mode === "in" ? "up" : "in")} style={{ ...iconBtn, width: "100%", height: 42, marginTop: 10, fontWeight: 700, fontSize: 13, color: C.textLo }}>
        {mode === "in" ? "No tengo cuenta — crear una" : "Ya tengo cuenta — entrar"}
      </button>
      <div style={{ color: C.textLo, fontSize: 11.5, marginTop: 12, lineHeight: 1.5 }}>
        Tus datos actuales de este dispositivo se subirán a la nube al entrar por primera vez.
      </div>
    </div>
  );
}

function AiKeyForm({ value, onSave }) {
  const [k, setK] = useState(value || "");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState(null); // {ok, msg}
  const testAndSave = async () => {
    const key = k.trim();
    if (!key) { onSave("", null); setRes(null); return; }
    setBusy(true); setRes(null);
    const r = await testAiKey(key);
    setBusy(false);
    if (r.status === "ok") { onSave(key, "ok"); setRes({ ok: true, msg: "¡Conectada! La Mente Brosin ya funciona." }); }
    else if (r.status === "nocredits") { onSave(key, "nocredits"); setRes({ ok: false, msg: "La clave es válida, pero no tienes saldo. Compra créditos en Anthropic (Settings → Billing → Buy credits) y listo." }); }
    else if (r.status === "invalid") { onSave(key, "invalid"); setRes({ ok: false, msg: "Clave inválida. Copia la clave completa (empieza por sk-ant-api03- y es larga), sin espacios ni saltos." }); }
    else if (r.code === "net") { onSave(key, null); setRes({ ok: false, msg: "No llego a la IA: la llamada directa está bloqueada en tu móvil. Necesitas la versión con el intermediario del servidor (te la paso). Tu clave queda guardada." }); }
    else { onSave(key, null); setRes({ ok: false, msg: `No pude comprobarla${r.raw ? " — Anthropic dice: " + r.raw : ". Reinténtalo."}` }); }
  };
  return (
    <div>
      <p style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.55, marginTop: 0 }}>
        Dentro de la app de Claude la IA funciona sola. En la versión instalada en tu móvil, pega tu clave de Anthropic para activar La Mente Brosin. Al guardar, <strong style={{ color: C.textHi }}>probamos que funciona de verdad</strong>. Se guarda solo en tu teléfono.
      </p>
      <Field label="Clave de Anthropic (sk-ant-api03-…)">
        <input style={{ ...inputStyle, fontFamily: "monospace", fontSize: 12.5 }} value={k} onChange={(e) => { setK(e.target.value); setRes(null); }} placeholder="sk-ant-api03-…" type="password" autoFocus />
      </Field>
      {res && (
        <div style={{ borderRadius: 12, padding: "11px 13px", marginBottom: 12, fontSize: 13, lineHeight: 1.45, background: res.ok ? "rgba(61,220,132,.12)" : "rgba(255,92,92,.1)", border: `1px solid ${res.ok ? C.good : C.bad}`, color: C.textHi, display: "flex", gap: 8, alignItems: "flex-start" }}>
          {res.ok ? <Check size={16} color={C.good} style={{ marginTop: 1, flexShrink: 0 }} /> : <X size={16} color={C.bad} style={{ marginTop: 1, flexShrink: 0 }} />}
          <span>{res.msg}</span>
        </div>
      )}
      <PrimaryBtn full color={C.purple} onClick={busy ? undefined : testAndSave}>
        {busy ? <span style={{ color: "#fff" }}>Probando conexión…</span> : <><Sparkles size={18} color="#fff" /> <span style={{ color: "#fff" }}>Probar y conectar</span></>}
      </PrimaryBtn>
      {value && (
        <button onClick={() => { onSave("", null); setK(""); setRes(null); }} style={{ ...iconBtn, width: "100%", height: 44, marginTop: 10, gap: 8, fontWeight: 700, fontSize: 13.5, color: C.textLo }}>
          <X size={15} /> Quitar clave
        </button>
      )}
      <div style={{ color: C.textLo, fontSize: 11.5, marginTop: 12, lineHeight: 1.5 }}>
        La clave se crea en console.anthropic.com. Necesitas <strong style={{ color: C.textHi }}>saldo</strong> (Billing → Buy credits) para que responda. Es personal — no la compartas.
      </div>
    </div>
  );
}

/* ============================================================
   PANTALLA — bienestar digital (registro manual + gráficas)
   ============================================================ */
const fmtMin = (m) => { m = Math.round(Number(m) || 0); const h = Math.floor(m / 60); return h ? `${h}h ${m % 60}m` : `${m}m`; };

function ScreenTimeScreen({ state, dispatch, back }) {
  const [sheet, setSheet] = useState(false);
  const apps = state.screenApps || [];
  const total = apps.reduce((s, a) => s + Number(a.minutes || 0), 0);
  const over = apps.filter((a) => a.limitMin && Number(a.minutes || 0) > a.limitMin);
  return (
    <div style={{ padding: "20px 18px 0" }}>
      <button onClick={back} style={{ ...linkBtn, marginBottom: 10 }}><ChevronLeft size={16} /> Inicio</button>
      <Title kicker="Bienestar digital">Pantalla</Title>

      <div style={{ ...card, padding: 18, marginBottom: 14, background: C.tintY, border: "1px solid rgba(255,212,0,.28)", boxShadow: "0 1px 0 rgba(255,255,255,.06) inset, 0 8px 22px rgba(255,212,0,.1), 0 10px 26px rgba(0,0,0,.35)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(180deg,#ffe561,#eec400)", boxShadow: "0 1px 0 rgba(255,255,255,.4) inset, 0 -2px 0 rgba(0,0,0,.2) inset, 0 5px 14px rgba(255,212,0,.35)", display: "grid", placeItems: "center" }}><Smartphone size={24} color={C.ink} /></div>
          <div>
            <div style={{ color: C.textLo, fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase" }}>Hoy en pantalla</div>
            <div style={{ color: C.textHi, fontWeight: 900, fontSize: 30, lineHeight: 1, letterSpacing: -0.8, fontVariantNumeric: "tabular-nums" }}>{fmtMin(total)}</div>
          </div>
        </div>
      </div>

      {over.length > 0 && (
        <div style={{ ...card, padding: 12, marginBottom: 12, border: `1px solid ${C.bad}`, background: "rgba(255,92,92,.08)", color: C.textHi, fontSize: 13 }}>
          Te has pasado del límite en {over.map((a) => a.name).join(", ")}. Suelta un poco el móvil, bro.
        </div>
      )}

      {apps.length === 0 ? (
        <EmptyState face="neutral" title="Controla tu pantalla" sub="Anota cuánto usas cada app (lo ves en Ajustes › Tiempo de uso) y ponte límites. Brosin te avisa si te pasas." cta="Añadir app" onCta={() => setSheet(true)} />
      ) : (
        <>
          <HBars icon={BarChart3} title="Reparto por app" sub={fmtMin(total)} accent={C.yellow}
            data={[...apps].sort((a, b) => Number(b.minutes || 0) - Number(a.minutes || 0)).map((a) => ({ label: a.name, value: Number(a.minutes || 0), display: fmtMin(a.minutes) }))} />
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {[...apps].sort((a, b) => Number(b.minutes || 0) - Number(a.minutes || 0)).map((a) => (
              <AppRow key={a.id} a={a}
                onSet={(min) => dispatch({ type: "update", col: "screenApps", id: a.id, patch: { minutes: Number(min) } })}
                onDel={() => dispatch({ type: "remove", col: "screenApps", id: a.id })} />
            ))}
          </div>
        </>
      )}

      <div style={{ ...card, padding: 12, marginTop: 12, background: C.well, fontSize: 11.5, color: C.textLo, lineHeight: 1.5 }}>
        El móvil no deja que una app web lea tu uso real por privacidad. Aquí lo registras tú (rápido) o lo copias desde Tiempo de uso (iPhone) / Bienestar digital (Android), y Brosin te lo grafica y te avisa de tus límites.
      </div>
      <div style={{ height: 122 }} />
      <FAB onClick={() => setSheet(true)} label="App" />

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Añadir app">
        <AppForm onSave={(d) => { dispatch({ type: "add", col: "screenApps", item: { id: uid(), ...d } }); setSheet(false); }} />
      </Sheet>
    </div>
  );
}
function AppRow({ a, onSet, onDel }) {
  const [editing, setEditing] = useState(false);
  const [v, setV] = useState("");
  const pct = a.limitMin ? Math.min(100, (Number(a.minutes || 0) / a.limitMin) * 100) : null;
  const over = a.limitMin && Number(a.minutes || 0) > a.limitMin;
  return (
    <div style={{ ...card, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: C.ink3, display: "grid", placeItems: "center", flexShrink: 0 }}><Smartphone size={17} color={C.yellow} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>{a.name}</div>
          {a.limitMin ? <div style={{ color: over ? C.bad : C.textLo, fontSize: 12 }}>Límite {fmtMin(a.limitMin)}{over ? " · superado" : ""}</div> : null}
        </div>
        <div style={{ color: C.textHi, fontWeight: 800, fontSize: 14 }}>{fmtMin(a.minutes)}</div>
        <button onClick={() => setEditing((e) => !e)} style={{ ...iconBtn, width: 32, height: 32 }}><Pencil size={14} /></button>
      </div>
      {pct != null && (
        <div style={{ height: 6, borderRadius: 999, background: C.ink3, overflow: "hidden", marginTop: 10 }}>
          <div style={{ width: `${pct}%`, height: "100%", background: over ? C.bad : C.yellow, borderRadius: 999, transition: "width .4s" }} />
        </div>
      )}
      {editing && (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input type="number" inputMode="numeric" autoFocus style={{ ...inputStyle, padding: "9px 12px" }} value={v} onChange={(e) => setV(e.target.value)} placeholder="Minutos de hoy" />
          <button onClick={() => { if (v !== "") onSet(v); setV(""); setEditing(false); }} style={{ ...iconBtn, width: 42, height: 42, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Check size={18} strokeWidth={3} /></button>
          <button onClick={onDel} style={{ ...iconBtn, width: 42, height: 42, color: C.textLo }}><Trash2 size={15} /></button>
        </div>
      )}
    </div>
  );
}
function AppForm({ onSave }) {
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [limitMin, setLimitMin] = useState("");
  const quick = ["Instagram", "TikTok", "WhatsApp", "YouTube", "X", "Chrome", "Juegos", "Correo"];
  return (
    <div>
      <Field label="App"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la app" autoFocus /></Field>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {quick.map((q) => <Chip key={q} active={name === q} onClick={() => setName(q)}>{q}</Chip>)}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><Field label="Minutos hoy"><input type="number" inputMode="numeric" style={inputStyle} value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="Ej. 45" /></Field></div>
        <div style={{ flex: 1 }}><Field label="Límite (min/día)"><input type="number" inputMode="numeric" style={inputStyle} value={limitMin} onChange={(e) => setLimitMin(e.target.value)} placeholder="Opcional" /></Field></div>
      </div>
      <PrimaryBtn full onClick={() => name.trim() && onSave({ name: name.trim(), minutes: Number(minutes || 0), limitMin: Number(limitMin || 0) })}><Check size={18} strokeWidth={3} /> Guardar</PrimaryBtn>
    </div>
  );
}

/* ============================================================
   MODO CONDUCCIÓN — banco de mensajes + pantalla zen
   ============================================================ */
function DrivingScreen({ state, dispatch, back, toast }) {
  const drive = state.drive || {};
  const [sheet, setSheet] = useState(false);
  const [editMsg, setEditMsg] = useState(false);
  const [draft, setDraft] = useState(drive.defaultMsg || "");
  const copy = (text) => {
    try { navigator.clipboard && navigator.clipboard.writeText(text); toast && toast("Copiado", "Mensaje listo para pegar."); } catch (e) {}
  };
  const setActive = (v) => dispatch({ type: "drive", payload: { active: v } });

  return (
    <div style={{ padding: "20px 18px 0" }}>
      <button onClick={back} style={{ ...linkBtn, marginBottom: 10 }}><ChevronLeft size={16} /> Inicio</button>
      <Title kicker="Al volante, sin distracciones">Conducción</Title>

      <button onClick={() => setActive(true)} style={{
        width: "100%", background: "linear-gradient(135deg,#a844ff 0%,#9013FE 40%,#6a0fb8 100%)", border: "none", borderRadius: 22,
        padding: "22px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, marginBottom: 16,
        boxShadow: "0 1px 0 rgba(255,255,255,.3) inset, 0 -3px 0 rgba(0,0,0,.25) inset, 0 12px 30px rgba(144,19,254,.35), 0 14px 34px rgba(0,0,0,.4)",
      }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,.18)", display: "grid", placeItems: "center" }}><Car size={28} color="#fff" /></div>
        <div style={{ textAlign: "left", flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 19 }}>Activar modo conducción</div>
          <div style={{ color: "rgba(255,255,255,.8)", fontSize: 13 }}>Pantalla zen + respuestas automáticas</div>
        </div>
        <Power size={24} color="#fff" />
      </button>

      {/* default message */}
      <div style={{ ...card, padding: 16, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <MessageCircle size={16} color={C.yellow} />
          <span style={{ color: C.textHi, fontWeight: 800, fontSize: 14.5, flex: 1 }}>Mensaje por defecto</span>
          <button onClick={() => copy(drive.defaultMsg)} style={{ ...iconBtn, width: 32, height: 32 }}><Copy size={14} /></button>
          <button onClick={() => { setDraft(drive.defaultMsg || ""); setEditMsg(true); }} style={{ ...iconBtn, width: 32, height: 32 }}><Pencil size={14} /></button>
        </div>
        {editMsg ? (
          <div>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => { dispatch({ type: "drive", payload: { defaultMsg: draft } }); setEditMsg(false); }} style={miniBtn(C.yellow, C.ink)}>Guardar</button>
              <button onClick={() => setEditMsg(false)} style={miniBtn(C.ink3, C.textLo)}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.5, background: C.well, borderRadius: 12, padding: 12 }}>{drive.defaultMsg}</div>
        )}
      </div>

      {/* special contacts */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h3 style={sectionH}>Gente especial</h3>
        <button onClick={() => setSheet(true)} style={{ ...iconBtn, width: 36, height: 36, background: C.yellow, color: C.ink, borderColor: C.yellow }}><Plus size={18} strokeWidth={3} /></button>
      </div>
      {(drive.contacts || []).length === 0 ? (
        <div style={{ ...card, padding: 16, textAlign: "center", color: C.textLo, fontSize: 13.5 }}>
          Mensajes personalizados para quien tú quieras: pareja, familia, jefe… cada uno con su detalle.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {drive.contacts.map((c) => (
            <div key={c.id} style={{ ...card, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: C.purple, display: "grid", placeItems: "center" }}><Star size={15} color="#fff" /></div>
                <span style={{ color: C.textHi, fontWeight: 800, fontSize: 14.5, flex: 1 }}>{c.name}</span>
                <button onClick={() => copy(c.msg)} style={{ ...iconBtn, width: 30, height: 30 }}><Copy size={13} /></button>
                <button onClick={() => dispatch({ type: "drive", payload: { contacts: drive.contacts.filter((x) => x.id !== c.id) } })} style={{ ...iconBtn, width: 30, height: 30, color: C.textLo }}><Trash2 size={13} /></button>
              </div>
              <div style={{ color: C.textLo, fontSize: 13, lineHeight: 1.5, background: C.well, borderRadius: 10, padding: 10 }}>{c.msg}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ ...card, padding: 12, marginTop: 14, background: C.well, fontSize: 11.5, color: C.textLo, lineHeight: 1.5 }}>
        Para que el móvil responda solo con la app cerrada, activa el Modo Conducción nativo (iPhone: Concentración › Conducir › Respuesta automática; Android: Modo de conducción). Pega aquí tus mensajes con el botón copiar. Brosin guarda y organiza tus plantillas.
      </div>
      <div style={{ height: 122 }} />

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Mensaje personalizado">
        <DriveContactForm onSave={(d) => { dispatch({ type: "drive", payload: { contacts: [...(drive.contacts || []), { id: uid(), ...d }] } }); setSheet(false); }} />
      </Sheet>
    </div>
  );
}
function DriveZen({ drive, onClose }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${C.purple}, #4b0a8a)`, zIndex: 88, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
      <div style={{ animation: "bfloat 3.5s ease-in-out infinite" }}><BeeMark size={96} face="sleep" color={C.yellow} /></div>
      <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 30, margin: "20px 0 6px", textTransform: "uppercase", letterSpacing: -0.5 }}>Conduciendo</h2>
      <p style={{ color: "rgba(255,255,255,.85)", fontSize: 15, maxWidth: 300, lineHeight: 1.55 }}>
        Tú al volante, Brosin a los mensajes. Manos en el volante, bro.
      </p>
      <div style={{ background: "rgba(0,0,0,.25)", borderRadius: 18, padding: 16, marginTop: 22, maxWidth: 320 }}>
        <div style={{ color: C.yellow, fontSize: 11.5, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Respuesta automática</div>
        <div style={{ color: "#fff", fontSize: 14.5, lineHeight: 1.5 }}>{drive.defaultMsg}</div>
      </div>
      <button onClick={onClose} style={{ marginTop: 26, background: "#fff", color: C.purple, border: "none", borderRadius: 999, padding: "15px 28px", fontWeight: 900, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
        <Power size={20} /> Llegué — desactivar
      </button>
    </div>
  );
}
function DriveContactForm({ onSave }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <div>
      <Field label="¿Para quién?"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" autoFocus /></Field>
      <Field label="Su mensaje"><textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ej. Mi amor, conduciendo. En cuanto pare te llamo ❤️" /></Field>
      <PrimaryBtn full color={C.purple} onClick={() => name.trim() && msg.trim() && onSave({ name: name.trim(), msg: msg.trim() })}><Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>Guardar</span></PrimaryBtn>
    </div>
  );
}

/* ============================================================
   EQUIPO — proyectos compartidos
   ============================================================ */
function Avatar({ name, color, size = 26 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 999, background: color || C.purple, display: "grid", placeItems: "center", flexShrink: 0, color: color === C.yellow ? C.ink : "#fff", fontWeight: 800, fontSize: size * 0.4 }}>
      {initials(name)}
    </div>
  );
}

function TeamScreen({ state, dispatch, back, me }) {
  const [activeId, setActiveId] = useState(null);
  const [sheet, setSheet] = useState(null); // 'new' | 'import'
  const projects = state.teamProjects || [];
  const active = projects.find((p) => p.id === activeId);

  const patchProject = (id, patch) => dispatch({ type: "update", col: "teamProjects", id, patch });

  if (active) {
    return <ProjectDetail project={active} me={me} back={() => setActiveId(null)} patch={(p) => patchProject(active.id, p)} onDelete={() => { dispatch({ type: "remove", col: "teamProjects", id: active.id }); setActiveId(null); }} />;
  }

  return (
    <div style={{ padding: "20px 18px 0" }}>
      <button onClick={back} style={{ ...linkBtn, marginBottom: 10 }}><ChevronLeft size={16} /> Inicio</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Title kicker="Juntos llega más lejos">Equipo</Title>
        <button onClick={() => setSheet("import")} style={{ ...iconBtn, width: 46, height: 46 }}><Download size={20} /></button>
      </div>

      {projects.length === 0 ? (
        <EmptyState face="happy" title="Sin proyectos aún" sub="Crea un proyecto compartido con horarios, tareas y tablón — o importa uno que te hayan pasado." cta="Crear proyecto" onCta={() => setSheet("new")} />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {projects.map((p) => {
            const open = (p.tasks || []).filter((t) => !t.done).length;
            return (
              <button key={p.id} onClick={() => setActiveId(p.id)} style={{ ...card, padding: 16, textAlign: "left", cursor: "pointer", borderLeft: `4px solid ${p.color || C.purple}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ color: C.textHi, fontWeight: 800, fontSize: 17, flex: 1 }}>{p.name}</div>
                  <ChevronRight size={18} color={C.textLo} />
                </div>
                <div style={{ color: C.textLo, fontSize: 12.5, marginTop: 4 }}>{(p.members || []).length} miembros · {open} tarea{open !== 1 ? "s" : ""} abierta{open !== 1 ? "s" : ""} · {(p.events || []).length} en agenda</div>
                <div style={{ display: "flex", gap: -6, marginTop: 10 }}>
                  {(p.members || []).slice(0, 6).map((m, i) => <div key={m.id} style={{ marginLeft: i ? -8 : 0 }}><Avatar name={m.name} color={MEMBER_COLORS[i % MEMBER_COLORS.length]} /></div>)}
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div style={{ ...card, padding: 12, marginTop: 12, background: C.well, fontSize: 11.5, color: C.textLo, lineHeight: 1.5 }}>
        Ahora mismo el equipo se comparte pasando un código (botón compartir dentro del proyecto). Para sincronización en vivo entre móviles hace falta conectar un servidor — te lo monto cuando quieras.
      </div>
      <div style={{ height: 122 }} />
      {projects.length > 0 && <FAB onClick={() => setSheet("new")} label="Proyecto" />}

      <Sheet open={sheet === "new"} onClose={() => setSheet(null)} title="Nuevo proyecto">
        <ProjectForm me={me} onSave={(d) => { dispatch({ type: "add", col: "teamProjects", item: { id: uid(), color: MEMBER_COLORS[(projects.length) % MEMBER_COLORS.length], tasks: [], events: [], notes: [], ...d } }); setSheet(null); }} />
      </Sheet>
      <Sheet open={sheet === "import"} onClose={() => setSheet(null)} title="Importar proyecto">
        <ImportForm onImport={(obj) => {
          if (!obj || !obj.name) return false;
          const exists = projects.some((p) => p.id === obj.id);
          if (exists) patchProject(obj.id, obj);
          else dispatch({ type: "add", col: "teamProjects", item: { ...obj, id: obj.id || uid() } });
          setSheet(null);
          return true;
        }} />
      </Sheet>
    </div>
  );
}

function ProjectForm({ onSave, me }) {
  const [name, setName] = useState("");
  return (
    <div>
      <Field label="Nombre del proyecto"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Reforma local, Viaje, Negocio…" autoFocus /></Field>
      <PrimaryBtn full color={C.purple} onClick={() => name.trim() && onSave({ name: name.trim(), members: [{ id: uid(), name: me || "Yo" }] })}>
        <Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>Crear</span>
      </PrimaryBtn>
    </div>
  );
}
function ImportForm({ onImport }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div>
      <Field label="Pega el código del proyecto"><textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical", fontFamily: "monospace", fontSize: 12 }} value={code} onChange={(e) => { setCode(e.target.value); setErr(false); }} placeholder="BRSN1:…" autoFocus /></Field>
      {err && <div style={{ color: C.bad, fontSize: 12.5, marginBottom: 10 }}>Código no válido. Revisa que esté completo.</div>}
      <PrimaryBtn full color={C.purple} onClick={() => { const obj = decodeShare(code); if (!onImport(obj)) setErr(true); }}>
        <Download size={18} color="#fff" /> <span style={{ color: "#fff" }}>Importar</span>
      </PrimaryBtn>
    </div>
  );
}

function ProjectDetail({ project, back, patch, onDelete, me }) {
  const [tab, setTab] = useState("tareas");
  const [sheet, setSheet] = useState(null); // 'task' | 'event' | 'member' | 'note' | 'share'
  const members = project.members || [];
  const colorOf = (name) => { const i = members.findIndex((m) => m.name === name); return MEMBER_COLORS[(i < 0 ? 0 : i) % MEMBER_COLORS.length]; };

  return (
    <div style={{ padding: "20px 18px 0" }}>
      <button onClick={back} style={{ ...linkBtn, marginBottom: 10 }}><ChevronLeft size={16} /> Equipo</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: C.textHi, fontWeight: 900, fontSize: 24, margin: 0 }}>{project.name}</h2>
        </div>
        <button onClick={() => setSheet("share")} style={{ ...iconBtn, width: 42, height: 42, background: C.purple, borderColor: C.purple }}><Share2 size={18} color="#fff" /></button>
        <button onClick={onDelete} style={{ ...iconBtn, width: 42, height: 42, marginLeft: 8, color: C.textLo }}><Trash2 size={16} /></button>
      </div>

      {/* members */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {members.map((m, i) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, background: C.ink2, border: `1px solid ${C.line}`, borderRadius: 999, padding: "4px 10px 4px 4px" }}>
            <Avatar name={m.name} color={MEMBER_COLORS[i % MEMBER_COLORS.length]} size={22} />
            <span style={{ color: C.textHi, fontSize: 12.5, fontWeight: 600 }}>{m.name}</span>
            {members.length > 1 && <button onClick={() => patch({ members: members.filter((x) => x.id !== m.id) })} style={{ background: "none", border: "none", color: C.textLo, cursor: "pointer", padding: 0, display: "grid" }}><X size={12} /></button>}
          </div>
        ))}
        <button onClick={() => setSheet("member")} style={{ ...iconBtn, width: 30, height: 30 }}><UserPlus size={15} /></button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Chip active={tab === "tareas"} onClick={() => setTab("tareas")} accent={C.purple}>Tareas</Chip>
        <Chip active={tab === "agenda"} onClick={() => setTab("agenda")} accent={C.purple}>Agenda</Chip>
        <Chip active={tab === "tablon"} onClick={() => setTab("tablon")} accent={C.purple}>Tablón</Chip>
      </div>

      {tab === "tareas" && (
        (project.tasks || []).length === 0 ? (
          <EmptyState face="neutral" title="Sin tareas" sub="Reparte el trabajo: cada tarea con su responsable y su fecha." cta="Añadir tarea" onCta={() => setSheet("task")} />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {[...project.tasks].sort((a, b) => Number(a.done) - Number(b.done)).map((t) => (
              <div key={t.id} style={{ ...card, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, opacity: t.done ? 0.55 : 1 }}>
                <button onClick={() => patch({ tasks: project.tasks.map((x) => x.id === t.id ? { ...x, done: !x.done } : x) })} style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, cursor: "pointer", border: `2px solid ${t.done ? C.purple : C.line}`, background: t.done ? C.purple : "transparent", display: "grid", placeItems: "center" }}>
                  {t.done && <Check size={15} color="#fff" strokeWidth={3.5} />}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: C.textHi, fontWeight: 600, fontSize: 14.5, textDecoration: t.done ? "line-through" : "none" }}>{t.text}</div>
                  <div style={{ color: C.textLo, fontSize: 12, marginTop: 2 }}>{t.due ? fmtDate(t.due) : "Sin fecha"}</div>
                </div>
                {t.assignee && <Avatar name={t.assignee} color={colorOf(t.assignee)} size={24} />}
                <button onClick={() => patch({ tasks: project.tasks.filter((x) => x.id !== t.id) })} style={{ ...iconBtn, width: 28, height: 28, color: C.textLo }}><Trash2 size={13} /></button>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "agenda" && (
        (project.events || []).length === 0 ? (
          <EmptyState face="sleep" title="Agenda compartida vacía" sub="Pon las citas y horarios del equipo en un solo sitio." cta="Añadir cita" onCta={() => setSheet("event")} />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {[...project.events].sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || ""))).map((e) => (
              <div key={e.id} style={{ ...card, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: C.purple, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: C.textHi, fontWeight: 700, fontSize: 14.5 }}>{e.title}</div>
                  <div style={{ color: C.textLo, fontSize: 12, marginTop: 2 }}>{fmtDate(e.date)}{e.time ? ` · ${e.time}` : ""}</div>
                </div>
                {e.assignee && <Avatar name={e.assignee} color={colorOf(e.assignee)} size={24} />}
                <button onClick={() => patch({ events: project.events.filter((x) => x.id !== e.id) })} style={{ ...iconBtn, width: 28, height: 28, color: C.textLo }}><Trash2 size={13} /></button>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "tablon" && (
        (project.notes || []).length === 0 ? (
          <EmptyState face="happy" title="Tablón en blanco" sub="Ideas, enlaces, recados — todo lo que el equipo deba ver." cta="Escribir" onCta={() => setSheet("note")} />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {[...project.notes].reverse().map((n) => (
              <div key={n.id} style={{ ...card, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Avatar name={n.author} color={colorOf(n.author)} size={22} />
                  <span style={{ color: C.textLo, fontSize: 12, fontWeight: 700, flex: 1 }}>{n.author || "Anónimo"}</span>
                  <button onClick={() => patch({ notes: project.notes.filter((x) => x.id !== n.id) })} style={{ background: "none", border: "none", color: C.textLo, cursor: "pointer" }}><Trash2 size={13} /></button>
                </div>
                <div style={{ color: C.textHi, fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{n.text}</div>
              </div>
            ))}
          </div>
        )
      )}

      <div style={{ height: 122 }} />
      <FAB onClick={() => setSheet(tab === "agenda" ? "event" : tab === "tablon" ? "note" : "task")} label={tab === "agenda" ? "Cita" : tab === "tablon" ? "Nota" : "Tarea"} />

      <Sheet open={sheet === "member"} onClose={() => setSheet(null)} title="Añadir miembro">
        <SimpleNameForm placeholder="Nombre del miembro" onSave={(name) => { patch({ members: [...members, { id: uid(), name }] }); setSheet(null); }} />
      </Sheet>
      <Sheet open={sheet === "task"} onClose={() => setSheet(null)} title="Nueva tarea">
        <TeamTaskForm members={members} onSave={(d) => { patch({ tasks: [{ id: uid(), done: false, ...d }, ...(project.tasks || [])] }); setSheet(null); }} />
      </Sheet>
      <Sheet open={sheet === "event"} onClose={() => setSheet(null)} title="Nueva cita">
        <TeamEventForm members={members} onSave={(d) => { patch({ events: [{ id: uid(), ...d }, ...(project.events || [])] }); setSheet(null); }} />
      </Sheet>
      <Sheet open={sheet === "note"} onClose={() => setSheet(null)} title="Nueva nota del tablón">
        <TeamNoteForm members={members} me={me} onSave={(d) => { patch({ notes: [{ id: uid(), ...d }, ...(project.notes || [])] }); setSheet(null); }} />
      </Sheet>
      <Sheet open={sheet === "share"} onClose={() => setSheet(null)} title="Compartir proyecto">
        <SharePanel project={project} />
      </Sheet>
    </div>
  );
}

function MemberPicker({ members, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {members.map((m, i) => <Chip key={m.id} active={value === m.name} onClick={() => onChange(value === m.name ? "" : m.name)} accent={C.purple}>{m.name}</Chip>)}
    </div>
  );
}
function TeamTaskForm({ members, onSave }) {
  const [text, setText] = useState("");
  const [assignee, setAssignee] = useState("");
  const [due, setDue] = useState("");
  return (
    <div>
      <Field label="Tarea"><input style={inputStyle} value={text} onChange={(e) => setText(e.target.value)} placeholder="¿Qué hay que hacer?" autoFocus /></Field>
      <Field label="Responsable"><MemberPicker members={members} value={assignee} onChange={setAssignee} /></Field>
      <Field label="Fecha límite (opcional)"><input type="date" style={inputStyle} value={due} onChange={(e) => setDue(e.target.value)} /></Field>
      <PrimaryBtn full color={C.purple} onClick={() => text.trim() && onSave({ text: text.trim(), assignee, due })}><Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>Añadir</span></PrimaryBtn>
    </div>
  );
}
function TeamEventForm({ members, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [assignee, setAssignee] = useState("");
  return (
    <div>
      <Field label="Cita"><input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" autoFocus /></Field>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><Field label="Fecha"><input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} /></Field></div>
        <div style={{ flex: 1 }}><Field label="Hora"><input type="time" style={inputStyle} value={time} onChange={(e) => setTime(e.target.value)} /></Field></div>
      </div>
      <Field label="Quién"><MemberPicker members={members} value={assignee} onChange={setAssignee} /></Field>
      <PrimaryBtn full color={C.purple} onClick={() => title.trim() && onSave({ title: title.trim(), date, time, assignee })}><Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>Añadir</span></PrimaryBtn>
    </div>
  );
}
function TeamNoteForm({ members, me, onSave }) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState(me || (members[0] && members[0].name) || "");
  return (
    <div>
      <Field label="Nota"><textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe para el equipo…" autoFocus /></Field>
      <Field label="De parte de"><MemberPicker members={members} value={author} onChange={setAuthor} /></Field>
      <PrimaryBtn full color={C.purple} onClick={() => text.trim() && onSave({ text: text.trim(), author })}><Check size={18} strokeWidth={3} color="#fff" /> <span style={{ color: "#fff" }}>Publicar</span></PrimaryBtn>
    </div>
  );
}
function SharePanel({ project }) {
  const code = encodeShare(project);
  const [copied, setCopied] = useState(false);
  const copy = () => { try { navigator.clipboard && navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (e) {} };
  return (
    <div>
      <p style={{ color: C.textLo, fontSize: 13.5, lineHeight: 1.5, marginTop: 0 }}>
        Copia este código y pásalo (WhatsApp, mail…). Quien lo reciba lo pega en Equipo › Importar y tendrá el proyecto con sus tareas, agenda y tablón.
      </p>
      <div style={{ ...card, padding: 12, background: C.well, maxHeight: 130, overflow: "auto", marginBottom: 12 }}>
        <code style={{ color: C.yellow, fontSize: 11, wordBreak: "break-all", fontFamily: "monospace" }}>{code}</code>
      </div>
      <PrimaryBtn full color={C.purple} onClick={copy}>
        {copied ? <><Check size={18} color="#fff" strokeWidth={3} /> <span style={{ color: "#fff" }}>Copiado</span></> : <><Copy size={18} color="#fff" /> <span style={{ color: "#fff" }}>Copiar código</span></>}
      </PrimaryBtn>
      <div style={{ color: C.textLo, fontSize: 11.5, marginTop: 12, lineHeight: 1.5 }}>
        Nota: es una copia. Si los dos editáis, cada uno tiene la suya hasta volver a compartir. Para edición en vivo simultánea hace falta servidor.
      </div>
    </div>
  );
}

/* ============================================================
   TAB BAR
   ============================================================ */
function TabBar({ active, onChange, ai }) {
  const tabs = [
    { key: "home", label: "Hoy", icon: Home },
    { key: "agenda", label: "Agenda", icon: CalendarDays },
    { key: "dinero", label: "Dinero", icon: Wallet },
    { key: "coleccion", label: "Colección", icon: Package },
    { key: "cerebro", label: "Cerebro", icon: Brain },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, minHeight: 72, paddingBottom: "env(safe-area-inset-bottom)", background: C.glass, backdropFilter: "blur(20px) saturate(1.6)", WebkitBackdropFilter: "blur(20px) saturate(1.6)", borderTop: `1px solid ${C.edge}`, boxShadow: `0 1px 0 rgba(255,255,255,.04) inset, 0 -14px 34px ${C.dropSheet}`, display: "flex", zIndex: 40 }}>
      {tabs.map((t) => {
        const on = active === t.key;
        const Ico = t.icon;
        return (
          <button key={t.key} onClick={() => onChange(t.key)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, paddingTop: 6 }}>
            <div style={{
              width: 40, height: 30, borderRadius: 11, display: "grid", placeItems: "center",
              background: on ? "linear-gradient(180deg,#ffe561 0%,#eec400 100%)" : "transparent",
              boxShadow: on ? "0 1px 0 rgba(255,255,255,.45) inset, 0 -1.5px 0 rgba(0,0,0,.2) inset, 0 6px 16px rgba(255,212,0,.4)" : "none",
              transition: "transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s",
              transform: on ? "translateY(-3px)" : "none",
            }}>
              <Ico size={21} color={on ? C.ink : C.textLo} strokeWidth={on ? 2.6 : 2} />
            </div>
            <span style={{ fontSize: 10.5, fontWeight: on ? 800 : 600, color: on ? C.yellow : C.textLo, transition: "color .2s" }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function BrosinOS() {
  const [state, dispatch] = useReducer(reducer, EMPTY);
  const [tab, setTab] = useState("home");
  const [booted, setBooted] = useState(false);
  const [pin, setPin] = useState(null); // saved pin string or null
  const [locked, setLocked] = useState(false);
  const [settingPin, setSettingPin] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [ai] = useState(true); // AI brain enabled
  const [toasts, setToasts] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [moneyTab, setMoneyTab] = useState("movimientos");
  const firstSave = useRef(true);
  const lastSnap = useRef(0);
  const firedRef = useRef(new Set());
  const nagRef = useRef(0);
  const eventNagRef = useRef({});
  const sleepNagRef = useRef(null);
  const [cloudUser, setCloudUser] = useState(null);
  const [cloudBusy, setCloudBusy] = useState(false);
  const [cloudMsg, setCloudMsg] = useState(null);
  const stateRef = useRef(state);
  const cloudSkip = useRef(false);
  const syncedUserRef = useRef(null);
  useEffect(() => { stateRef.current = state; });

  /* lightbox bus */
  useEffect(() => { lightboxBus.open = (src) => setLightbox(src); return () => { lightboxBus.open = () => {}; }; }, []);

  /* sync optional AI key (used by the installed PWA) */
  useEffect(() => { if (typeof window !== "undefined") window.__BROSIN_AI_KEY = (state.profile && state.profile.aiKey) || null; }, [state.profile && state.profile.aiKey]);

  /* cloud: watch auth session */
  useEffect(() => {
    let sub = null;
    (async () => {
      const sb = await getSupa();
      if (!sb) return;
      try {
        const { data } = await sb.auth.getSession();
        const s = data && data.session;
        if (s && s.user) setCloudUser({ id: s.user.id, email: s.user.email });
        const r = sb.auth.onAuthStateChange((_e, sess) => setCloudUser(sess && sess.user ? { id: sess.user.id, email: sess.user.email } : null));
        sub = r && r.data && r.data.subscription;
      } catch (e) {}
    })();
    return () => { try { sub && sub.unsubscribe(); } catch (e) {} };
  }, []);

  /* cloud: initial sync on login (pull cloud, or push local if cloud empty) */
  useEffect(() => {
    if (!cloudUser || !state.ready) return;
    if (syncedUserRef.current === cloudUser.id) return;
    syncedUserRef.current = cloudUser.id;
    (async () => {
      const sb = await getSupa(); if (!sb) return;
      const cloudData = await cloudLoad(sb, cloudUser.id);
      if (cloudData && (cloudData.profile || cloudData.events)) {
        cloudSkip.current = true;
        dispatch({ type: "hydrate", payload: { ...EMPTY, ...cloudData, ready: true } });
        setCloudMsg({ ok: true, t: "Datos traídos de la nube ✓" });
      } else {
        const { ready, ...persist } = stateRef.current;
        await cloudSave(sb, cloudUser.id, persist);
        setCloudMsg({ ok: true, t: "Sincronizado ✓" });
      }
    })();
  }, [cloudUser, state.ready]);

  /* cloud: auto-save on changes (debounced) */
  useEffect(() => {
    if (!cloudUser || !state.ready) return;
    if (cloudSkip.current) { cloudSkip.current = false; return; }
    const id = setTimeout(async () => {
      const sb = await getSupa(); if (!sb) return;
      const { ready, ...persist } = state;
      cloudSave(sb, cloudUser.id, persist);
    }, 900);
    return () => clearTimeout(id);
  }, [state, cloudUser]);

  /* push: keep the server-side reminder schedule in sync (so avisos fire with the app closed) */
  useEffect(() => {
    if (!cloudUser || !state.ready) return;
    const id = setTimeout(async () => {
      const sb = await getSupa(); if (!sb) return;
      syncReminders(sb, cloudUser.id, state);
    }, 2000);
    return () => clearTimeout(id);
  }, [state.events, state.people, state.goals, cloudUser, state.ready]);

  const cloudSignIn = async (email, password) => {
    setCloudBusy(true); setCloudMsg(null);
    const sb = await getSupa();
    if (!sb) { setCloudBusy(false); setCloudMsg({ ok: false, t: "La nube solo funciona en la app instalada." }); return; }
    try {
      const { error } = await sb.auth.signInWithPassword({ email: (email || "").trim(), password });
      setCloudBusy(false);
      if (error) setCloudMsg({ ok: false, t: error.message });
      else setCloudMsg({ ok: true, t: "Sesión iniciada. Sincronizando…" });
    } catch (e) { setCloudBusy(false); setCloudMsg({ ok: false, t: "No pude conectar. Reintenta." }); }
  };
  const cloudSignUp = async (email, password) => {
    setCloudBusy(true); setCloudMsg(null);
    const sb = await getSupa();
    if (!sb) { setCloudBusy(false); setCloudMsg({ ok: false, t: "La nube solo funciona en la app instalada." }); return; }
    try {
      const { data, error } = await sb.auth.signUp({ email: (email || "").trim(), password });
      setCloudBusy(false);
      if (error) setCloudMsg({ ok: false, t: error.message });
      else if (data && data.session) setCloudMsg({ ok: true, t: "Cuenta creada. Sincronizando…" });
      else setCloudMsg({ ok: true, t: "Cuenta creada. Ahora pulsa Entrar." });
    } catch (e) { setCloudBusy(false); setCloudMsg({ ok: false, t: "No pude conectar. Reintenta." }); }
  };
  const cloudSignOut = async () => {
    const sb = await getSupa(); if (sb) { try { await sb.auth.signOut(); } catch (e) {} }
    syncedUserRef.current = null; setCloudUser(null); setCloudMsg(null);
  };
  const cloud = { user: cloudUser, busy: cloudBusy, msg: cloudMsg, signIn: cloudSignIn, signUp: cloudSignUp, signOut: cloudSignOut };

  const pushToast = useCallback((title, body, useNotif = true) => {
    const id = uid();
    setToasts((t) => [...t.slice(-3), { id, title, body }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500);
    if (useNotif) notify.fire(title, body);
  }, []);

  /* notification scheduler */
  useEffect(() => {
    const notif = state.profile.notif;
    if (!state.ready || !notif || !notif.enabled) return;
    if (nagRef.current === 0) nagRef.current = Date.now() - (notif.nagMin || 30) * 60000 + 12000;
    const check = () => {
      const now = Date.now();
      const leads = notif.leads && notif.leads.length ? notif.leads : [0];
      state.events.forEach((e) => {
        if (e.done || e.remind === false) return;
        const dt = eventDate(e);
        if (!dt) return;
        const start = dt.getTime();
        // per-event single pre-reminder ("aviso único") overrides the global defaults
        const evLeads = (e.lead != null) ? (e.lead === 0 ? [0] : [e.lead, 0]) : leads;
        evLeads.forEach((lead) => {
          const target = start - lead * 60000;
          const key = `${e.id}:${lead}:${e.date}:${e.time || ""}`;
          if (firedRef.current.has(key)) return;
          if (now >= target && now <= start + 60000) {
            firedRef.current.add(key);
            const tag = lead === 0 ? "¡Es la hora!" : `${leadLabel(lead)}`;
            pushToast(`${lead === 0 ? "Ahora" : "Pronto"}: ${e.title}`, `${fmtDate(e.date)}${e.time ? ` · ${e.time}` : ""} · ${tag}`);
          }
        });
      });
      // per-event insistent reminders (only events with their own "nag" set)
      state.events.forEach((e) => {
        if (e.done || !e.nag || e.nag <= 0) return;
        const dt = eventDate(e);
        if (!dt) return;
        const start = dt.getTime();
        if (now >= start && now - start < 12 * 3600 * 1000) {
          const last = eventNagRef.current[e.id] || 0;
          if (now - last >= e.nag * 60000) {
            eventNagRef.current[e.id] = now;
            pushToast(`Sigue pendiente: ${e.title}`, `Márcalo como hecho cuando lo tengas. Te aviso cada ${e.nag % 60 === 0 ? e.nag / 60 + " h" : e.nag + " min"}.`);
          }
        }
      });
      // goal deadline reminders — nudge at 7 / 3 / 1 / 0 days before the meta
      (state.goals || []).forEach((g) => {
        if (!g.deadline || g.notif === false) return;
        if (g.steps && g.steps.length > 0 && g.steps.every((s) => s.done)) return; // done
        const dd = daysFromNow(g.deadline);
        if (dd < 0 || dd > 7) return;
        const milestone = dd === 0 ? 0 : dd <= 1 ? 1 : dd <= 3 ? 3 : 7;
        if (dd > milestone) return;
        const key = `goal:${g.id}:${g.deadline}:${milestone}`;
        if (firedRef.current.has(key)) return;
        firedRef.current.add(key);
        const left = g.steps ? g.steps.filter((s) => !s.done).length : 0;
        pushToast(dd === 0 ? `Hoy es la meta: ${g.title}` : `Se acerca: ${g.title}`, `${dd === 0 ? "Es hoy" : `Faltan ${dd} día${dd === 1 ? "" : "s"}`}${left ? ` · ${left} paso(s) pendientes` : ""}. ${g.why ? "Recuerda: " + g.why : "A por ello."}`);
      });
      // birthday reminders — nudge at 7 / 1 / 0 days before a loved one's birthday
      (state.people || []).forEach((p) => {
        if (p.remind === false || !p.birthday) return;
        const dd = daysUntilBirthday(p.birthday);
        if (dd == null || dd > 7) return;
        const milestone = dd === 0 ? 0 : dd === 1 ? 1 : 7;
        if (dd > milestone) return;
        const key = `bday:${p.id}:${new Date().getFullYear()}:${milestone}`;
        if (firedRef.current.has(key)) return;
        firedRef.current.add(key);
        const pend = (p.giftIdeas || []).some((g) => !g.done);
        pushToast(dd === 0 ? `🎂 Hoy cumple ${p.name}` : dd === 1 ? `🎂 Mañana cumple ${p.name}` : `🎂 ${p.name} cumple en ${dd} días`, pend ? "Tienes ideas de regalo apuntadas — prepáralo." : "Prepárale un detalle y felicítale.");
      });
      // sleep nudge — remind to rest when recent sleep is below normal
      const lastSleep = [...(state.sleepLog || [])].sort((a, b) => b.date.localeCompare(a.date))[0];
      const smin = state.profile.sleepMin || 7;
      if (lastSleep && lastSleep.hours < smin && sleepNagRef.current !== todayISO()) {
        sleepNagRef.current = todayISO();
        pushToast("A descansar, bro", `Vienes de ${lastSleep.hours} h de sueño. Necesitas descansar más — hazte un favor hoy.`);
      }
    };
    check();
    const iv = setInterval(check, 25000);
    return () => clearInterval(iv);
  }, [state.events, state.sleepLog, state.goals, state.people, state.profile.notif, state.profile.sleepMin, state.ready, pushToast]);

  /* hydrate once */
  useEffect(() => {
    (async () => {
      const saved = await store.get(STATE_KEY);
      const savedPin = await store.get(PIN_KEY);
      if (saved && typeof saved === "object") {
        dispatch({ type: "hydrate", payload: { ...EMPTY, ...saved, ready: true } });
        if (!saved.profile || !saved.profile.created) setNeedsOnboarding(true);
      } else {
        dispatch({ type: "ready" });
        setNeedsOnboarding(true);
      }
      if (savedPin) { setPin(savedPin); setLocked(true); }
      setBooted(true);
    })();
  }, []);

  /* persist (batched) */
  useEffect(() => {
    if (!state.ready) return;
    if (firstSave.current) { firstSave.current = false; return; }
    const id = setTimeout(() => {
      const { ready, ...persist } = state;
      store.set(STATE_KEY, persist);
      // rolling safety snapshot at most once every 10 min
      const now = Date.now();
      if (now - lastSnap.current > 10 * 60 * 1000) { lastSnap.current = now; writeAutoBak(persist); }
    }, 400);
    return () => clearTimeout(id);
  }, [state]);

  const finishOnboarding = (profile, people) => {
    dispatch({ type: "profile", payload: profile });
    if (people && people.length) dispatch({ type: "setCol", col: "people", items: people });
    setNeedsOnboarding(false);
  };
  const savePin = async (val) => { await store.set(PIN_KEY, val); setPin(val); setLocked(false); setSettingPin(false); };
  const tryUnlock = (val, cb) => { if (val === pin) { setLocked(false); cb(true); } else cb(false); };
  const resetAll = async () => {
    const { ready, ...persist } = EMPTY;
    await store.set(STATE_KEY, persist);
    await store.set(PIN_KEY, null);
    dispatch({ type: "hydrate", payload: { ...EMPTY, ready: true } });
    setPin(null);
    setNeedsOnboarding(true);
    setTab("home");
  };

  // tema activo (noche por defecto) — vuelca la paleta sobre C y los átomos ANTES de renderizar hijos
  applyTheme(state.profile && state.profile.theme === "light" ? "light" : "dark");

  const styleTag = (
    <style>{`
      @keyframes bshimmer {0%{background-position:200% 0}100%{background-position:-200% 0}}
      @keyframes bfloat {0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      @keyframes bfade {from{opacity:0}to{opacity:1}}
      @keyframes bsheet {0%{transform:translateY(56px);opacity:.5}65%{transform:translateY(-5px);opacity:1}100%{transform:translateY(0);opacity:1}}
      @keyframes bslide {from{transform:translateX(18px);opacity:0}to{transform:translateX(0);opacity:1}}
      @keyframes bshake {0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-9px)}40%,80%{transform:translateX(9px)}}
      @keyframes bbounce {0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-5px);opacity:1}}
      @keyframes bspin {to{transform:rotate(360deg)}}
      @keyframes bdrop {from{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}
      @keyframes bpulse {0%,100%{box-shadow:0 0 0 0 rgba(255,92,92,.5)}50%{box-shadow:0 0 0 9px rgba(255,92,92,0)}}
      @keyframes bpop {0%{transform:scale(.4);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1);opacity:1}}
      @keyframes blistin {from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}
      @keyframes bcelepulse {0%{box-shadow:0 0 0 0 rgba(255,212,0,.45)}100%{box-shadow:0 0 0 30px rgba(255,212,0,0)}}
      @keyframes bparty {0%{transform:rotate(var(--a)) translateY(0) scale(1);opacity:1}100%{transform:rotate(var(--a)) translateY(-52px) scale(.4);opacity:0}}
      * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
      body { -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      input::placeholder, textarea::placeholder { color: ${C.mode === "light" ? "#a39a83" : "#5a5a5a"}; }
      input[type="date"], input[type="time"] { color-scheme: ${C.mode}; }
      @keyframes bpagein {from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes bnumpop {from{opacity:.35;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
      input:focus, textarea:focus {
        border-color: rgba(255,212,0,.55) !important;
        box-shadow: 0 0 0 3px rgba(255,212,0,.13), 0 2px 5px rgba(0,0,0,.4) inset !important;
      }
      /* --- feedback físico universal: todo botón se hunde al pulsarlo --- */
      button { transition: transform .13s cubic-bezier(.3,.9,.4,1), box-shadow .13s, filter .13s; }
      button:active { transform: translateY(1px) scale(.98); filter: brightness(.94); }
      /* --- botones 3D: superficie con volumen, canto superior de luz, halo y hundimiento real --- */
      .b3d, .b3d-purple, .b3d-good, .b3d-red, .b3d-dark {
        transition: transform .12s cubic-bezier(.3,.9,.4,1), box-shadow .12s, filter .12s;
        will-change: transform;
      }
      .b3d {
        background: linear-gradient(180deg,#ffe561 0%,#FFD400 55%,#e2bb00 100%) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,.55) inset, 0 -2px 0 rgba(0,0,0,.22) inset,
          0 6px 16px rgba(255,212,0,.28), 0 10px 24px rgba(0,0,0,.45);
      }
      .b3d:active {
        transform: translateY(2px) scale(.985);
        box-shadow: 0 1px 0 rgba(255,255,255,.25) inset, 0 -1px 0 rgba(0,0,0,.25) inset,
          0 2px 6px rgba(255,212,0,.18), 0 3px 8px rgba(0,0,0,.35);
        filter: brightness(.96);
      }
      .b3d-purple {
        background: linear-gradient(180deg,#a844ff 0%,#9013FE 55%,#7a0fd6 100%) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,.35) inset, 0 -2px 0 rgba(0,0,0,.3) inset,
          0 6px 16px rgba(144,19,254,.32), 0 10px 24px rgba(0,0,0,.45);
      }
      .b3d-purple:active {
        transform: translateY(2px) scale(.985);
        box-shadow: 0 1px 0 rgba(255,255,255,.18) inset, 0 -1px 0 rgba(0,0,0,.3) inset,
          0 2px 6px rgba(144,19,254,.2), 0 3px 8px rgba(0,0,0,.35);
        filter: brightness(.95);
      }
      .b3d-good {
        background: linear-gradient(180deg,#5fe89c 0%,#3ddc84 55%,#2eb96b 100%) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 -2px 0 rgba(0,0,0,.25) inset,
          0 6px 16px rgba(61,220,132,.28), 0 10px 24px rgba(0,0,0,.45);
      }
      .b3d-good:active {
        transform: translateY(2px) scale(.985);
        box-shadow: 0 1px 0 rgba(255,255,255,.22) inset, 0 -1px 0 rgba(0,0,0,.25) inset,
          0 2px 6px rgba(61,220,132,.18), 0 3px 8px rgba(0,0,0,.35);
        filter: brightness(.96);
      }
      .b3d-red {
        background: linear-gradient(180deg,#ff7d7d 0%,#ff5c5c 55%,#e04444 100%) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,.35) inset, 0 -2px 0 rgba(0,0,0,.28) inset,
          0 6px 16px rgba(255,92,92,.28), 0 10px 24px rgba(0,0,0,.45);
      }
      .b3d-red:active {
        transform: translateY(2px) scale(.985);
        box-shadow: 0 1px 0 rgba(255,255,255,.18) inset, 0 -1px 0 rgba(0,0,0,.28) inset,
          0 2px 6px rgba(255,92,92,.18), 0 3px 8px rgba(0,0,0,.35);
        filter: brightness(.95);
      }
      .b3d-dark {
        background: ${C.btnDark} !important;
        box-shadow: 0 1px 0 rgba(255,255,255,${C.mode === "light" ? ".9" : ".08"}) inset, 0 -2px 0 ${C.keycapIn} inset,
          0 6px 14px ${C.dropBtn};
      }
      .b3d-dark:active {
        transform: translateY(2px) scale(.985);
        box-shadow: 0 1px 0 rgba(255,255,255,.04) inset, 0 -1px 0 ${C.keycapIn} inset,
          0 2px 5px ${C.dropBtn};
      }
      /* --- teclas físicas (calculadora, PIN): grosor marcado + hundimiento --- */
      .bkeycap {
        box-shadow: 0 1px 0 rgba(255,255,255,${C.mode === "light" ? ".85" : ".09"}) inset, 0 -3px 0 ${C.keycapIn} inset,
          0 5px 12px ${C.dropBtn};
        transition: transform .1s cubic-bezier(.3,.9,.4,1), box-shadow .1s, filter .1s;
        will-change: transform;
      }
      .bkeycap:active {
        transform: translateY(2px) scale(.985);
        box-shadow: 0 1px 0 rgba(255,255,255,.04) inset, 0 -1px 0 ${C.keycapIn} inset,
          0 1px 3px ${C.dropBtn};
        filter: brightness(${C.mode === "light" ? ".97" : ".92"});
      }
      /* --- FAB: pop al montar --- */
      .bfab { animation: bpop .45s cubic-bezier(.34,1.56,.64,1) backwards; }
      /* --- entrada de listas con stagger sutil (solo transform+opacity) --- */
      .bstagger > * { animation: blistin .38s cubic-bezier(.2,.9,.3,1) backwards; }
      .bstagger > *:nth-child(1) { animation-delay: .02s; }
      .bstagger > *:nth-child(2) { animation-delay: .055s; }
      .bstagger > *:nth-child(3) { animation-delay: .09s; }
      .bstagger > *:nth-child(4) { animation-delay: .125s; }
      .bstagger > *:nth-child(5) { animation-delay: .16s; }
      .bstagger > *:nth-child(6) { animation-delay: .195s; }
      .bstagger > *:nth-child(7) { animation-delay: .23s; }
      .bstagger > *:nth-child(8) { animation-delay: .265s; }
      .bstagger > *:nth-child(n+9) { animation-delay: .3s; }
      /* --- herramientas con personalidad: cada icono "actúa" al tocarlo --- */
      .banim-car svg { animation: bcarout .43s ease-in forwards; }
      .broadfx { position: absolute; left: 7px; right: 7px; bottom: 10px; height: 2px; border-radius: 2px;
        background: repeating-linear-gradient(90deg, ${C.mode === "light" ? "rgba(60,50,20,.4)" : "rgba(255,255,255,.55)"} 0 6px, transparent 6px 13px);
        animation: broadmove .43s linear forwards; }
      @keyframes bcarout { 0%{transform:translateX(0)} 22%{transform:translateX(-5px) rotate(-5deg)} 100%{transform:translateX(48px) rotate(7deg);opacity:.15} }
      @keyframes broadmove { 0%{transform:translateX(10px);opacity:0} 25%{opacity:1} 100%{transform:translateX(-22px);opacity:0} }
      .banim-camera svg { animation: bcamzoom .43s cubic-bezier(.34,1.56,.64,1); }
      .bflashfx { position: absolute; inset: 0; border-radius: inherit;
        background: radial-gradient(circle, rgba(255,255,255,.95), rgba(255,255,255,0) 72%);
        animation: bflash .43s ease-out forwards; }
      @keyframes bcamzoom { 0%{transform:scale(1)} 45%{transform:scale(1.35)} 100%{transform:scale(1)} }
      @keyframes bflash { 0%,32%{opacity:0} 45%{opacity:1} 100%{opacity:0} }
      .banim-bulb svg { animation: bbulbglow .45s ease forwards; }
      .banim-bulb { animation: bbulbtile .45s ease; }
      @keyframes bbulbglow { 0%{filter:none} 40%{filter:drop-shadow(0 0 10px rgba(255,212,0,.95)) brightness(1.9)} 100%{filter:drop-shadow(0 0 6px rgba(255,212,0,.75)) brightness(1.45)} }
      @keyframes bbulbtile { 40%{box-shadow:0 0 24px rgba(255,212,0,.6), 0 1px 0 rgba(255,255,255,.07) inset} }
      .banim-team svg { animation: bhop .45s cubic-bezier(.34,1.56,.64,1); }
      .bpeep { position: absolute; width: 11px; height: 11px; border-radius: 999px; background: #fff;
        bottom: 13px; left: 50%; margin-left: -5.5px; opacity: 0; box-shadow: 0 0 0 2px rgba(0,0,0,.3); }
      .bpeepL { animation: bpeepl .42s ease-out forwards; }
      .bpeepR { animation: bpeepr .42s .07s ease-out forwards; }
      @keyframes bpeepl { 0%{transform:translate(0,5px) scale(.3);opacity:0} 100%{transform:translate(-14px,-5px) scale(1);opacity:1} }
      @keyframes bpeepr { 0%{transform:translate(0,5px) scale(.3);opacity:0} 100%{transform:translate(14px,-5px) scale(1);opacity:1} }
      .banim-chart svg path, .banim-chart svg polyline { stroke-dasharray: 72; stroke-dashoffset: 72; animation: bdraw .48s ease forwards; }
      @keyframes bdraw { to { stroke-dashoffset: 0; } }
      .banim-cake svg { animation: bhop .45s cubic-bezier(.34,1.56,.64,1); }
      @keyframes bhop { 0%{transform:translateY(0)} 40%{transform:translateY(-9px) rotate(-6deg)} 72%{transform:translateY(2px) rotate(3deg)} 100%{transform:translateY(0)} }
      .banim-calc svg { animation: bwig .4s ease; }
      @keyframes bwig { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-11deg)} 55%{transform:rotate(9deg)} 80%{transform:rotate(-4deg)} }
      .banim-phone svg { animation: bbuzz .4s linear; }
      @keyframes bbuzz { 0%,100%{transform:translateX(0)} 15%{transform:translateX(-2px) rotate(-3deg)} 30%{transform:translateX(2px) rotate(3deg)} 45%{transform:translateX(-2px)} 60%{transform:translateX(2px)} 75%{transform:translateX(-1px)} }
    `}</style>
  );

  /* shell */
  return (
    <div style={{ minHeight: "100vh", background: C.outer, display: "flex", justifyContent: "center", fontFamily: "'Inter','SF Pro Display',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" }}>
      {styleTag}
      {/* key={C.mode}: al cambiar de tema se remonta el marco entero — evita estilos obsoletos
          en los átomos mutados que se pasan por referencia (style={iconBtn}, style={settingRow}…) */}
      <div key={C.mode} style={{ position: "relative", width: "100%", maxWidth: 440, minHeight: "100vh", background: C.bg0, overflow: "hidden", boxShadow: C.mode === "light" ? "0 0 60px rgba(120,100,40,.25)" : "0 0 60px rgba(0,0,0,.6)" }}>
        {/* subtle dotted texture like brand + luz cenital de la colmena */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.line} 1px, transparent 1px)`, backgroundSize: "22px 22px", opacity: 0.22, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 55% at 50% -10%, rgba(255,212,0,.05), transparent 60%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", height: "100vh", overflowY: "auto", paddingTop: "env(safe-area-inset-top)", paddingBottom: "calc(72px + env(safe-area-inset-bottom))" }}>
          {!booted ? (
            <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
              <div style={{ animation: "bfloat 2s ease-in-out infinite" }}><BeeMark size={64} face="happy" /></div>
            </div>
          ) : (
            <div key={tab} style={{ animation: "bpagein .3s cubic-bezier(.2,.9,.3,1)" }}>
              {tab === "home" && <HomeScreen state={state} dispatch={dispatch} go={setTab} ai={ai} toast={pushToast} openMarkets={() => { setMoneyTab("mercados"); setTab("dinero"); }} />}
              {tab === "agenda" && <AgendaScreen state={state} dispatch={dispatch} />}
              {tab === "dinero" && <MoneyScreen state={state} dispatch={dispatch} tab={moneyTab} setTab={setMoneyTab} toast={pushToast} />}
              {tab === "coleccion" && <CollectionScreen state={state} dispatch={dispatch} />}
              {tab === "cerebro" && <BrainScreen state={state} dispatch={dispatch} ai={ai} />}
              {tab === "camara" && <CameraScreen state={state} dispatch={dispatch} back={() => setTab("home")} toast={pushToast} />}
              {tab === "personas" && <PeopleScreen state={state} dispatch={dispatch} back={() => setTab("home")} />}
              {tab === "pantalla" && <ScreenTimeScreen state={state} dispatch={dispatch} back={() => setTab("home")} />}
              {tab === "conduccion" && <DrivingScreen state={state} dispatch={dispatch} back={() => setTab("home")} toast={pushToast} />}
              {tab === "equipo" && <TeamScreen state={state} dispatch={dispatch} back={() => setTab("home")} me={state.profile.name} />}
              {tab === "perfil" && <ProfileScreen state={state} dispatch={dispatch} hasPin={!!pin} onChangePin={() => setSettingPin(true)} onResetAll={resetAll} cloud={cloud} onRestore={(data) => { const { ready, ...cur } = state; writeAutoBak(cur); dispatch({ type: "hydrate", payload: { ...EMPTY, ...data, ready: true } }); setTab("home"); }} />}
            </div>
          )}
        </div>

        {booted && !needsOnboarding && !locked && !settingPin && <TabBar active={tab} onChange={setTab} ai={ai} />}

        {/* driving zen overlay (persists across tabs) */}
        {booted && !needsOnboarding && !locked && state.drive?.active && <DriveZen drive={state.drive} onClose={() => dispatch({ type: "drive", payload: { active: false } })} />}

        {/* toasts + lightbox */}
        {booted && !locked && !needsOnboarding && toasts.length > 0 && <Toasts items={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />}
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />

        {/* overlays */}
        {booted && needsOnboarding && <Onboarding onDone={finishOnboarding} />}
        {booted && !needsOnboarding && locked && <LockScreen mode="enter" onUnlock={tryUnlock} />}
        {booted && settingPin && <LockScreen mode="set" onSet={savePin} />}
      </div>
    </div>
  );
}
