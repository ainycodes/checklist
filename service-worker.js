// service-worker.js

const CACHE_NAME = 'checklist-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/app.js', // Include all your JS files
  '/manifest.json', // Include manifest if necessary
  '/icon.jpg',
  '/icon.jpg',
  'Chewy-Regular.ttf',
  'https://fonts.googleapis.com/css2?family=Chewy&display=swap', // External font
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css', // Font Awesome
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

