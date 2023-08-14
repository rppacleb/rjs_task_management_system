var staticCacheName = "pofpersonal-cache-v3.1.5";
var dynamicCacheName = "pofpersonal-cache-dynamic-3.1.5";
var filesToCache = [
    '/'
];

// Cache on install
self.addEventListener("install", event => {
    // this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(filesToCache);
        })
    )
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith('pofpersonal-cache')))
                    .filter(cacheName => (cacheName !== dynamicCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
self.addEventListener("fetch", event => {
    if (!(event.request.url.indexOf('http') === 0)) return;

    if (navigator.onLine === false) {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request)
            }).catch(() => {
                return caches.match('offline');
            })
        )
    } else {
        // let ext = /\.css$|.js$|.jpg$|.png$|.pdf$|.swf$|.svg$|.svgz$|.ico$|.ttf$|.ttc$|.otf$|.eot$|.woff$|.woff2$|.webp$|.jfif$/.test(event.request.url)
        let ext = /\.css$|.jpg$|.png$|.pdf$|.swf$|.svg$|.svgz$|.ico$|.ttf$|.ttc$|.otf$|.eot$|.woff$|.woff2$|.webp$|.jfif$/.test(event.request.url)
        if (ext) {  
            event.respondWith(
                caches.match(event.request).then(response => {
                    return response || fetch(event.request).then(fetchRes => {
                        return caches.open(dynamicCacheName).then(cache => {
                            cache.put(event.request.url, fetchRes.clone())
                            return fetchRes
                        })
                    })
                }).catch(() => {
                    return caches.match('offline');
                })
            )
        } else {    
            event.respondWith(
                caches.match(event.request).then(response => {
                    return fetch(event.request).then(fetchRes => {
                        return caches.open(dynamicCacheName).then(cache => {
                            cache.delete(event.request.url)
                            cache.put(event.request.url, fetchRes.clone())
                            return fetchRes
                        })
                    })
                }).catch(() => {
                    return caches.match('offline');
                })
            )
        }
    }
});