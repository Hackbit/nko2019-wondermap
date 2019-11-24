workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache'
  })
)

workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document': {
      console.log('Offline', caches.match('/offline'))
      return caches.match('/offline')
    }
    default: {
      return Response.error()
    }
  }
})

workbox.precaching.precacheAndRoute(self.__precacheManifest)