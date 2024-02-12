import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './bundle.js',
];

self.addEventListener('install', (e) => {
  console.log('installing service worker..');
  e.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (e) => {
  console.log('activating service worker..');
  e.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (e) => {
  console.log(e.request);

  e.respondWith(CacheHelper.revalidateCache(e.request));
});
