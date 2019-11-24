workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache'
  })
)

workbox.routing.setDefaultHandler(
  new workbox.strategies.NetworkOnly()
)

workbox.routing.setCatchHandler(({ event }) => {
  console.log('OwO', event)
  switch (event.request.destination) {
    case 'document': {
      return caches.match('/offline')
    }
    default: {
      return Response.error()
    }
  }
})

workbox.precaching.precacheAndRoute(self.__precacheManifest)