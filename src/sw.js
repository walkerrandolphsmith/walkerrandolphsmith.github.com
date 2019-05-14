var cacheName = "v1::static";

var assets = [
  "/",
  "/manifest.json",
  "/sw.js",
  "/static/icons/android-chrome-192x192.png",
  "/static/icons/android-chrome-512x512.png",
  "/static/icons/apple-icon-57x57.png",
  "/static/icons/apple-icon-72x72.png",
  "/static/icons/apple-icon-114x114.png",
  "/static/icons/apple-icon-144x144.png",
  "/static/icons/favicon.ico",
  "https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(cacheName).then(cache =>
      cache.match(event.request).then(res => {
        return res || fetch(event.request);
      })
    )
  );
});
