const CACHE_NAME = "medassist-cache-v1";
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/index.css",
  "/index.tsx",
  "/manifest.json",
  "/pwa-192x192.png",
  "/pwa-512x512.png"
];

const APP_ROUTES = [
  "/",
  "/calculators",
  "/medications",
  "/guide",
  "/prescriptions",
  "/ai",
  "/profile"
];

// Install process: precache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Precaching standard shell assets");
        // We use silent map in case some elements are generated dynamically at build
        return Promise.allSettled(
          PRECACHE_ASSETS.map(asset => {
            return cache.add(asset).catch(err => {
              console.warn(`[Service Worker] Failed to precache ${asset}:`, err);
            });
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate process: clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch handler using exact strategy requests
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Focus only on same-origin GET requests
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Check if it's a navigation or one of the configured application routes
  const isRouteNavigation = request.mode === "navigate" || 
    APP_ROUTES.some(route => url.pathname === route || url.pathname.endsWith(route));

  if (isRouteNavigation) {
    // Strategy: Network First with Cache Fallback for navigation requests
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseCopy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseCopy);
            });
          }
          return response;
        })
        .catch(() => {
          console.log("[Service Worker] Offline fallback for navigation:", url.pathname);
          // Retrieve from cache if matches this exact request
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fall back to main page or / index.html (SPA shell)
            return caches.match("/index.html") || caches.match("/");
          });
        })
    );
  } else {
    // Strategy: Cache First for static design resources (js, css, images, fonts)
    const isStaticResource = /\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|json)$/i.test(url.pathname);

    if (isStaticResource) {
      event.respondWith(
        caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Serve cached copy, then update in background (Stale-While-Revalidate pattern)
            fetch(request)
              .then((response) => {
                if (response && response.status === 200) {
                  caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, response);
                  });
                }
              })
              .catch(() => {});
            return cachedResponse;
          }

          // Fetch from network, then cache
          return fetch(request).then((response) => {
            if (response && response.status === 200) {
              const responseCopy = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseCopy);
              });
            }
            return response;
          });
        })
      );
    } else {
      // General requests strategy: Network, fall back to Cache
      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseCopy = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseCopy);
              });
            }
            return response;
          })
          .catch(() => caches.match(request))
      );
    }
  }
});
