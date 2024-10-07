// /src/main/resources/static/serviceworker.js
const CACHE_NAME = 'springbootjs-cache-v1';
const urlsToCache = [
  '/',
  '/styles/styles.css',
  '/scripts/main.js',
  '/views/home.html',
  '/views/about.html',
];

// Install service worker and cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch cached resources
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response; // Return from cache
      }
      return fetch(event.request); // Fetch from network
    })
  );
});

// Update service worker and remove old caches
self.addEventListener('activate', function (event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
