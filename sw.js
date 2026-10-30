/* =========================================================
   Service worker de «Escandallo de mezclas»
   Guarda los archivos de la app en el móvil para que funcione sin internet.

   SI MODIFICAS LA APP: cambia VERSION (por ejemplo a 'escandallo-v2') y sube
   este archivo junto con los demás. Así los móviles descargan la versión nueva.
   ========================================================= */
const VERSION = 'escandallo-v1';

const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// 1. Instalación: descarga y guarda todos los archivos de la app
self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

// 2. Activación: borra las copias de versiones antiguas
self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(claves => Promise.all(
        claves
          .filter(clave => clave.startsWith('escandallo-') && clave !== VERSION)
          .map(clave => caches.delete(clave))
      ))
      .then(() => self.clients.claim())
  );
});

// 3. Peticiones: responde al instante con la copia guardada y, si hay
//    internet, descarga en segundo plano la versión más nueva para la próxima vez.
self.addEventListener('fetch', evento => {
  const peticion = evento.request;
  if (peticion.method !== 'GET') return;
  if (new URL(peticion.url).origin !== self.location.origin) return;

  const deLaRed = fetch(peticion)
    .then(async respuesta => {
      if (respuesta && respuesta.ok) {
        const cache = await caches.open(VERSION);
        await cache.put(peticion, respuesta.clone());
      }
      return respuesta;
    })
    .catch(() => null);

  evento.waitUntil(deLaRed.then(() => undefined));

  evento.respondWith((async () => {
    const guardada = await caches.match(peticion, { ignoreSearch: true });
    if (guardada) return guardada;

    const respuesta = await deLaRed;
    if (respuesta) return respuesta;

    // Sin internet y sin copia: si es la página, se abre la app igualmente
    if (peticion.mode === 'navigate') {
      const inicio = await caches.match('./index.html');
      if (inicio) return inicio;
    }
    return Response.error();
  })());
});
