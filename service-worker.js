// service-worker.js

const CACHE_NAME = 'checklist-cache-v2'; // Updated cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/offline.html', // Offline fallback page
  '/app.js',
  '/manifest.json',
  '/icon.jpg',
  'Chewy-Regular.ttf',
  'https://fonts.googleapis.com/css2?family=Chewy&display=swap', // External font
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css', // Font Awesome
];

// Install service worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker and remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch resources from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // If the resource is cached, return it; otherwise try to fetch it
      return response || fetch(event.request).catch(() => {
        // If fetching fails (offline), serve the offline page
        return caches.match('/offline.html');
      });
    })
  );
});
