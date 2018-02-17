importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "giclock",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.e8476bc14bc028a12428.js",
    "revision": "6d91001216a3b4b4c92e6a62eb505b7f"
  },
  {
    "url": "/_nuxt/layouts/default.5d7d7bdfd559c758a598.js",
    "revision": "cd21eac816b6cbc9cb34ad2e5b68b685"
  },
  {
    "url": "/_nuxt/manifest.b425c3c1eee8c1f519c6.js",
    "revision": "330d0fa3fa54c94a8e37940095fddce6"
  },
  {
    "url": "/_nuxt/pages/index.e7c76311395f05e26832.js",
    "revision": "8906bf9edc99d36ac535a7254a1be4f8"
  },
  {
    "url": "/_nuxt/pages/preferences.286599d17b563998cbf4.js",
    "revision": "2404b809e84a6c14e0076d8239a5297e"
  },
  {
    "url": "/_nuxt/vendor.1239fa9f8c6e4ccb0ac5.js",
    "revision": "af9a24a8e21cae3b6068974bc1a9f58d"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('https://fonts.googleapis.com/css?.*'), workboxSW.strategies.networkFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('https://fonts.gstatic.com/.*'), workboxSW.strategies.networkFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('https://use.fontawesome.com/.*'), workboxSW.strategies.networkFirst({}), 'GET')

