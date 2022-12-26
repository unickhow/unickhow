import App from './App.vue'
import 'virtual:windi.css'
import { routes } from './routes'
import '@/styles/main.css'
import { ViteSSG } from 'vite-ssg'

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
  }
)
