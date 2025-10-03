// Define a name for the cache
const CACHE_NAME = 'work-monitor-cache-v1';

// List the files to be cached
const URLS_TO_CACHE = [
  './work_monitoring_app_v31.html'
];

// Install event: This is triggered when the service worker is first installed.
self.addEventListener('install', event => {
  // Wait until the installation is complete
  event.waitUntil(
    // Open the cache
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all the specified files to the cache
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch event: This is triggered for every request the page makes.
self.addEventListener('fetch', event => {
  event.respondWith(
    // Try to find a matching response in the cache
    caches.match(event.request)
      .then(response => {
        // If a cached response is found, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch the request from the network
        return fetch(event.request);
      })
  );
});

