/* Généré au build : ne pas modifier. */
const CACHE = 'mon-suivi-4093724e2ed8';
const ASSETS = ["./index.html","./assets/excel-export-CwniC70r.js","./assets/excel-template-DyLFRqC6.js","./assets/index-BEj3AOd6.js","./assets/index-DKxtVMYI.css","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./icons/icon.svg","./manifest.webmanifest"];

// Téléchargement fichier par fichier (sans cache HTTP) : un fichier manquant fait échouer l'installation
// avec un message explicite, et l'ancienne version reste active.
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    for (const url of ASSETS) {
      const response = await fetch(url, { cache: 'reload' });
      if (!response.ok) throw new Error('Mise en cache impossible : ' + url);
      await cache.put(url, response);
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('mon-suivi-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(caches.match('./index.html').then((r) => r || fetch(request)));
    return;
  }
  event.respondWith(caches.match(request).then((r) => r || fetch(request)));
});
