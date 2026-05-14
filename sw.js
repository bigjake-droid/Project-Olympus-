// sw.js - Vindex Offline Operations

const CACHE_NAME = 'vindex-tactical-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/evidence.html',
  '/guidebook.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

// Install Event - Caches the structural files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Vindex System] Armor Plating Applied: Files Cached');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event - Serves from cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the encrypted local copy
        if (response) {
          return response;
        }
        // Not in cache - fetch from the network
        return fetch(event.request);
      })
  );
});

// Activate Event - Cleans up old caches when we update the app
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Vindex System] Purging Old Cache: ', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});