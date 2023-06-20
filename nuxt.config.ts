// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: '<unickhow />',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' },
        { hid: 'description', name: 'description', content: 'frontend explorer, driven by interest' },
        { hid: 'og:title', property: 'og:title', content: 'unickhow' },
        { hid: 'og:description', property: 'og:description', content: 'frontend explorer, driven by interest' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image', property: 'og:image', content: 'https://hackmd.io/_uploads/ByO3VfeP3.png' },
        { hid: 'og:url', property: 'og:url', content: 'https://unick.how/' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'unickhow' },
        { hid: 'og:image:width', property: 'og:image:width', content: '480' },
        { hid: 'og:image:height', property: 'og:image:height', content: '272' },
        { hid: 'twitter:site', name: 'twitter:site', content: 'https://unick.how/' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://hackmd.io/_uploads/ByO3VfeP3.png' }
      ]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    'nuxt-icon',
    '@vueuse/nuxt'
  ],
  css: [
    '@/styles/main.css'
  ]
})
