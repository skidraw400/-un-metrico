var CACHE_NAME = 'my-cache-v1';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/css/bootstrap.min.css',
  '/script/main.js',
  '/script/bootstrap.bundle.min.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});