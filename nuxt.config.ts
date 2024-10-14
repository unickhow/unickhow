// https://nuxt.com/docs/api/configuration/nuxt-config
import Kuaikuai from '@unickhow/vite-plugin-kuaikuai'

const trackers = process.env.NODE_ENV === 'production'
  ? [
    // Google Analytics
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-0ERCV84DE1',
      async: true
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-0ERCV84DE1');
      `
    },
    {
      // Clarity tracking code for my site
      innerHTML: `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "f3zey4tjot");
      `
    },
    {
      // Hotjar Tracking Code for my site
      innerHTML: `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:2135847,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `
    }]
  : []

export default defineNuxtConfig({
  app: {
    // ! there is a bug that will cause the page cache, and all dom manipulations will be lost (e.g. exhibition, image in content)
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: '<unickhow />',
      script: [
        ...trackers
      ],
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
        { hid: 'og:image', property: 'og:image', content: 'https://hackmd.io/_uploads/SylCzI7Ja.png' },
        { hid: 'og:url', property: 'og:url', content: 'https://unick.how/' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'unickhow' },
        { hid: 'og:image:width', property: 'og:image:width', content: '480' },
        { hid: 'og:image:height', property: 'og:image:height', content: '272' },
        { hid: 'twitter:site', name: 'twitter:site', content: 'https://unick.how/' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://hackmd.io/_uploads/SylCzI7Ja.png' }
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
