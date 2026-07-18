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
const CACHE = "invasion-v44";
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
  const req = e.request;

  /* ── Le JEU lui-même (le document HTML) : RÉSEAU D'ABORD ──────
     Ainsi, dès qu'il y a du réseau, on obtient TOUJOURS la dernière
     version (nouvelle cinématique, nouveaux mini-jeux…). Le cache
     ne sert qu'en secours, hors-ligne. C'est ce qui évite de rester
     coincé sur une vieille version en cache. */
  const isHTML = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");
  if (isHTML) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(() => {});
        return res;
      }).catch(() =>
        caches.match("./index.html", { ignoreSearch: true })
          .then(h => h || caches.match("./"))
      )
    );
    return;
  }

  /* ── Le reste (polices, jsQR, icônes) : CACHE D'ABORD ───────── */
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      });
    }).catch(() => caches.match("./index.html"))
  );
});
