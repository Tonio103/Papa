/* ═══════════════════════════════════════════════════════════
   Service worker — L'Invasion des Vans
   Stratégie : cache d'abord, réseau en secours.
   Le lecteur de QR est désormais EMBARQUÉ dans index.html : le scan
   fonctionne dès la première ouverture, même en mode avion. Seules
   les polices Google restent externes, et elles ont un repli — si
   elles manquent, le jeu est juste un peu moins typé.
   Ouvre quand même le jeu une fois avec du réseau pour que tout soit
   en cache (la caméra, elle, exige toujours HTTPS mais pas de réseau).
   Pour forcer une mise à jour après modification du jeu :
   incrémente le numéro de version ci-dessous (v1 → v2).
   ═══════════════════════════════════════════════════════════ */
const CACHE = "invasion-v118";
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

/* ── LE FOND DE CARTE ────────────────────────────────────────
   Les tuiles OpenStreetMap vivent dans leur PROPRE cache, et celui-ci
   n'est jamais purgé. C'est indispensable : le cache du jeu porte le
   numéro de version et se vide à chaque mise à jour. Les tuiles, elles,
   ne changent pas — et surtout, elles ont été téléchargées exprès pour
   le jour J, où il n'y aura peut-être pas de réseau. Les effacer à
   chaque correction de bug reviendrait à ruiner le repérage. */
const TUILES = "invasion-tuiles";
const estTuile = (u) => /tile\.openstreetmap\.org|tile\.opentopomap\.org/.test(u);

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE && k !== TUILES).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const req = e.request;

  /* ── TUILES : cache d'abord, toujours ──────────────────────
     Une tuile déjà vue ne se redemande jamais au réseau. C'est ce qui
     rend la carte utilisable hors-ligne, et ce qui évite de matraquer
     les serveurs d'OpenStreetMap, qui sont tenus par des bénévoles. */
  if (estTuile(req.url)) {
    e.respondWith(
      caches.open(TUILES).then(c =>
        c.match(req).then(hit => hit || fetch(req).then(res => {
          if (res && res.ok) c.put(req, res.clone());
          return res;
        }).catch(() => new Response("", { status: 504 }))))
    );
    return;
  }

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
