module.exports = {
  modules: [
    '@nuxtjs/pwa',
  ],
  manifest: {
    name: 'Clock',
    short_name: 'Clock',
    start_url: '/',
    background_color: '#000',
    theme_color: '#0f9',
    display: 'standalone',
    icons: [
      {
        sizes: '512x512',
        src: '/icon512.png',
        type: 'image/png',
      },
    ],
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Clock',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Clock' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Share+Tech+Mono' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.4/css/all.css' },
      { rel: 'icon', type: 'image/png', href: '/icon512.png' },
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  workbox: {
    runtimeCaching: [
      {
        handler: 'networkFirst',
        urlPattern: 'https://fonts.googleapis.com/css?.*',
      },
      {
        handler: 'networkFirst',
        urlPattern: 'https://fonts.gstatic.com/.*',
      },
      {
        handler: 'networkFirst',
        urlPattern: 'https://use.fontawesome.com/.*',
      },
    ],
  },
}
