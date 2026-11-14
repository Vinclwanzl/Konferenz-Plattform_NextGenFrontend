const CACHE_NAME = 'frontendnow-cache-v1'

// C-Umsetzung: Route-abhängige Caching-Regeln
// 1) App-Shell + statische Inhaltsseiten: Cache First (Precache)
// 2) Mein Programm: localStorage-Persistenz, aber Route ebenfalls im Precache
// 3) Fallback für unbekannte Requests: Network First mit Cache-Fallback

const APP_SHELL = [
  '/',
  '/speakers',
  '/user-program',
  '/favicon.ico',
  '/robots.txt'
]

const SESSION_ROUTES = [
  '/sessions/s01', '/sessions/s02', '/sessions/s03', '/sessions/s04',
  '/sessions/s05', '/sessions/s06', '/sessions/s07', '/sessions/s08',
  '/sessions/s09', '/sessions/s10', '/sessions/s11', '/sessions/s12',
  '/sessions/s13', '/sessions/s14', '/sessions/s15', '/sessions/s16',
  '/sessions/s17', '/sessions/s18', '/sessions/s19', '/sessions/s20'
]

const SPEAKER_ROUTES = [
  '/speakers/sp01', '/speakers/sp02', '/speakers/sp03', '/speakers/sp04',
  '/speakers/sp05', '/speakers/sp06', '/speakers/sp07', '/speakers/sp08',
  '/speakers/sp09', '/speakers/sp10', '/speakers/sp11', '/speakers/sp12',
  '/speakers/sp13', '/speakers/sp14', '/speakers/sp15', '/speakers/sp16',
  '/speakers/sp17', '/speakers/sp18'
]

const PRECACHE_URLS = [...APP_SHELL, ...SESSION_ROUTES, ...SPEAKER_ROUTES]

const isPrecachedRoute = (pathname) => {
  return PRECACHE_URLS.includes(pathname)
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  const url = new URL(request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  if (isPrecachedRoute(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached
        }

        return fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          }

          return response
        })
      })
    )
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && request.destination !== 'document') {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        }
        return response
      })
      .catch(() => caches.match(request))
  )
})
