// https://nuxt.com/docs/api/configuration/nuxt-config
import Kuaikuai from '@unickhow/vite-plugin-kuaikuai'

export default defineNuxtConfig({
  app: {
    // ! there is a bug that will cause the page cache, and all dom manipulations will be lost (e.g. exhibition, image in content)
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: '<unickhow />',
      link: [
        {
          rel: 'canonical',
          href: 'https://unick.how/'
        },
        {
          rel: 'icon',
          type: 'image/webp',
          href: '/favicon.webp'
        }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' },
        { hid: 'description', name: 'description', content: 'frontend explorer, driven by interest' },
        { hid: 'og:title', property: 'og:title', content: 'unickhow' },
        { hid: 'og:description', property: 'og:description', content: 'frontend explorer, driven by interest' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image', property: 'og:image', content: 'https://media.licdn.com/dms/image/v2/D4E2DAQH-tfzIZH8qGA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1729177683347?e=1729962000&v=beta&t=QRwkdloPZ0-7ESDomFl2GuWivBBjEGCr8XeYwE-cw38' },
        { hid: 'og:url', property: 'og:url', content: 'https://unick.how/' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'unickhow' },
        { hid: 'og:image:width', property: 'og:image:width', content: '480' },
        { hid: 'og:image:height', property: 'og:image:height', content: '272' },
        { hid: 'twitter:site', name: 'twitter:site', content: 'https://unick.how/' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://media.licdn.com/dms/image/v2/D4E2DAQH-tfzIZH8qGA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1729177683347?e=1729962000&v=beta&t=QRwkdloPZ0-7ESDomFl2GuWivBBjEGCr8XeYwE-cw38' }
      ]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    preconnect: true,
    prefetch: true,
    families: {
      Ubuntu: true,
      'Fira Code': {
        wght: [100, 400, 700]
      },
      'Press Start 2P': true
    }
  },
  css: [
    '@/styles/main.css'
  ],
  content: {
    // documentDriven: true,
    highlight: {
      theme: 'one-dark-pro',
    },
  },
  runtimeConfig: {
    public: {
      NUXT_THEME_STORE: process.env.NUXT_THEME_STORE
    }
  },
  vite: {
    plugins: [
      Kuaikuai({
        onBuild: true,
      })
    ],
  }
})
