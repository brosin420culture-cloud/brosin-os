// Brosinos — build: transpila BrosinOS.jsx y genera brosin-pwa/index.html
// Uso: node build_pwa.js   (requiere: npm i -g typescript  o  npm i typescript)
const fs = require("fs");
const path = require("path");
let src = fs.readFileSync(path.join(__dirname, "BrosinOS.jsx"), "utf8");

// 1) make the default export a plain function and add a mount call
src = src.replace("export default function BrosinOS", "function BrosinOS");

const appModuleJsx =
`import { createRoot } from "react-dom/client";
` + src + `
const _el = document.getElementById("root");
_el.innerHTML = "";
createRoot(_el).render(React.createElement(BrosinOS));
`;

// Pre-transpile JSX -> JS at build time (no Babel in the browser => much faster startup)
const ts = require("typescript");
const appModule = ts.transpileModule(appModuleJsx, {
  compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2019, module: ts.ModuleKind.ESNext },
}).outputText;

const REACT = "https://esm.sh/react@18.3.1";
const RDOM = "https://esm.sh/react-dom@18.3.1";
const LUCIDE = "https://esm.sh/lucide-react@0.456.0?external=react&deps=react@18.3.1";

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no" />
<title>Brosin OS</title>
<meta name="description" content="Tu segundo cerebro. Bro, no te quedes sin." />
<meta name="brosin-build" content="v20" />
<meta name="theme-color" content="#0a0a0a" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Brosin" />
<link rel="manifest" href="./manifest.webmanifest" />
<link rel="apple-touch-icon" href="./apple-touch-icon.png" />
<link rel="icon" type="image/png" href="./icon-192.png" />
<style>
  html,body{margin:0;padding:0;background:#0a0a0a;height:100%;overscroll-behavior:none;-webkit-tap-highlight-color:transparent}
  body{font-family:'Inter','SF Pro Display',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
  #root{min-height:100vh}
  #splash{position:fixed;inset:0;background:radial-gradient(120% 70% at 50% 30%,#141414 0%,#0a0a0a 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999}
  #splash .bl{width:168px;max-width:46vw;height:auto;animation:intro .7s cubic-bezier(.2,.9,.3,1) both,flo 2.6s .7s ease-in-out infinite;filter:drop-shadow(0 14px 38px rgba(255,212,0,.28))}
  #splash .s{color:#777;font-size:12px;margin-top:18px;letter-spacing:.5px;animation:fin .5s .35s ease both}
  @keyframes intro{from{transform:scale(.82) translateY(10px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
  @keyframes fin{from{opacity:0}to{opacity:1}}
  @keyframes flo{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes sp{to{transform:rotate(360deg)}}
  #splash .l{margin-top:26px;width:26px;height:26px;border:3px solid #262626;border-top-color:#FFD400;border-radius:50%;animation:sp 0.9s linear infinite,fin .5s .35s ease both}
</style>
<script type="importmap">
{ "imports": {
  "react": "${REACT}",
  "react-dom": "${RDOM}",
  "react-dom/client": "${RDOM}/client",
  "lucide-react": "${LUCIDE}",
  "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2"
}}
</script>
<script>
  // Route AI calls through the same-origin serverless proxy (avoids mobile CORS blocking)
  window.__BROSIN_PROXY = "/api/claude";
  // Cloud sync (Supabase) — publishable key is safe to embed (protected by Row-Level Security)
  window.__SB_URL = "https://xjawjkrgxdhxanwtjcpb.supabase.co";
  window.__SB_KEY = "sb_publishable_cc5n2vvUF6SeLcGEz7DgOg_R_b54kJd";
  // Push notifications: VAPID public key (safe to embed; it's the public half)
  window.__VAPID_PUBLIC = "BIU_VfkgQ5nh9VYOZrIvMaWFPFc1NmSJwy5nGRjRQQ-1aavXArXnBjHaa4vwJNumrNR-1zvgSVLqhy19BUO_734";
  // Local persistence shim so the app's window.storage works on-device (no Claude sandbox here)
  window.storage = {
    get: async function(k){ try { var v = localStorage.getItem("brosin:"+k); return v ? JSON.parse(v) : null; } catch(e){ return null; } },
    set: async function(k,v){ try { localStorage.setItem("brosin:"+k, JSON.stringify(v)); } catch(e){} }
  };
  // Register service worker (needs https or localhost)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function(){ navigator.serviceWorker.register("./service-worker.js").catch(function(){}); });
  }
</script>
</head>
<body>
<div id="root">
  <div id="splash">
    <img class="bl" src="./brosin_eye.png" alt="Brosin" />
    <div class="s">Despertando la colmena… · v20</div>
    <div class="l"></div>
  </div>
</div>
<script type="module">
${appModule}
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "brosin-pwa", "index.html"), html);
console.log("index.html written:", html.length, "bytes");
