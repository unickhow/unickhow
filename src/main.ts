import App from './App.vue'
import 'virtual:windi.css'
import routes from '~pages'
import '@/styles/main.css'
import { ViteSSG } from 'vite-ssg'
import '@fontsource/fira-code'
import '@fontsource/roboto'
import '@fontsource/ntr'
import '@fontsource/noto-sans-tc'

import PostProvider from './components/PostProvider.vue'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    }
  },
  (ctx) => {
    const { app } = ctx
    app.component('PostProvider', PostProvider)
  }
)
