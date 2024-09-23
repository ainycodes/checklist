// service-worker.js

const CACHE_NAME = 'checklist-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',  // Add your CSS files
  '/app.js',      // Add your JavaScript files
  '/favicon.ico'  // Any other assets you want to cache
];

// Install service worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch resources from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
