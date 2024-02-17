import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
// import 'regenerator-runtime';
// import CacheHelper from './utils/cache-helper';

precacheAndRoute(self.__WB_MANIFEST);

const themoviedbApi = new Route(
  ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
  new StaleWhileRevalidate({
    cacheName: 'themoviedb-api',
  }),
);

const themoviedbImageApi = new Route(
  ({ url }) => url.href.startsWith('https://image.tmdb.org/t/p/w500/'),
  new StaleWhileRevalidate({
    cacheName: 'themoviedb-image-api',
  }),
);

registerRoute(themoviedbApi);
registerRoute(themoviedbImageApi);

self.addEventListener('install', () => {
  console.log('service worker: installed');
  self.skipWaiting();
});

self.addEventListener('push', (e) => {
  console.log('service worker: pushed');

  const dataJson = e.data.json();

  const notificationData = {
    title: dataJson.title,
    options: {
      body: dataJson.options.body,
      icon: dataJson.options.icon,
      image: dataJson.options.image,
    },
  };

  // const showNotification = self.registration.showNotification(
  //   notificationData.title,
  //   notificationData.options,
  // );

  e.waitUntil(self.registration.showNotification(notificationData.title, notificationData.options));
});

// const assetsToCache = [
//   './',
//   './icons/icon-72x72.png',
//   './icons/icon-96x96.png',
//   './icons/icon-128x128.png',
//   './icons/icon-144x144.png',
//   './icons/icon-152x152.png',
//   './icons/icon-192x192.png',
//   './icons/icon-384x384.png',
//   './icons/icon-512x512.png',
//   './index.html',
//   './favicon.png',
//   './app.bundle.js',
//   './app.webmanifest',
//   './bundle.js',
// ];

// self.addEventListener('install', (e) => {
//   console.log('installing service worker..');
//   e.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
// });

// self.addEventListener('activate', (e) => {
//   console.log('activating service worker..');
//   e.waitUntil(CacheHelper.deleteOldCache());
// });

// self.addEventListener('fetch', (e) => {
//   console.log(e.request);

//   e.respondWith(CacheHelper.revalidateCache(e.request));
// });
