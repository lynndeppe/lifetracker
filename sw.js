const CACHE = "life-log-v1";
const ASSETS = [
  "/life-tracker/",
  "/life-tracker/index.html",
  "https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Playfair+Display:wght@400;600&display=swap"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
