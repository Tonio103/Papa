/* ═══════════════════════════════════════════════════════════
   Service worker — L'Invasion des Vans
   Stratégie : cache d'abord, réseau en secours.
   IMPORTANT : ouvre le jeu UNE FOIS avec du réseau. Le SW met
   alors en cache la page, les polices Google et jsQR. Ensuite,
   tout fonctionne en mode avion (seule la caméra a toujours
   besoin de HTTPS, pas de réseau).
   Pour forcer une mise à jour après modification du jeu :
   incrémente le numéro de version ci-dessous (v1 → v2).
   ═══════════════════════════════════════════════════════════ */
const CACHE = "invasion-v25";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    /* ignoreSearch : "?triche=1" sert bien la page en cache */
    caches.match(e.request, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        /* mise en cache dynamique : polices, jsQR, etc. */
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      });
    }).catch(() => caches.match("./index.html"))
  );
});
