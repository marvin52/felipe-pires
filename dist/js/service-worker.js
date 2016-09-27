var cacheName = 'weatherPWA-step-5-1';
var filesToCache = [
'/dist/img/topo.png',
'/dist/css/material.min.css',
'/dist/fonts/mdl.woff',
'/dist/js/material.min.js'
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