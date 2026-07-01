// Brosin OS — service worker (offline app shell + runtime cache)
const CACHE = "brosin-os-v7";
const LOCAL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(LOCAL)).catch(() => {}));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return; // never touch the AI proxy / POSTs
  const url = new URL(req.url);
  if (url.hostname.includes("api.anthropic.com")) return;
  if (url.pathname.includes("/.netlify/functions/")) return;

  const isDoc = req.mode === "navigate" || req.destination === "document" || url.pathname.endsWith("index.html") || url.pathname === "/";

  if (isDoc) {
    // Network-first for the app HTML so new deploys always load
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then((h) => h || caches.match("./index.html")))
    );
    return;
  }

  // Cache-first for everything else (CDN libs, icons) with runtime caching
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        try {
          const copy = res.clone();
          if (res.ok && (res.type === "basic" || res.type === "cors")) {
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
        } catch (err) {}
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
