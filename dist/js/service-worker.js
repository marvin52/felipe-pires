var cacheName = 'weatherPWA-step-5-1';
var filesToCache = [
'/felipe-pires/dist/img/topo.png',
'/felipe-pires/dist/css/material.min.css',
'/felipe-pires/dist/fonts/mdl.woff',
'/felipe-pires/dist/js/material.min.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});