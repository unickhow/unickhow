import App from './App.vue'
import 'virtual:windi.css'
import { routes } from './routes'
import '@/styles/main.css'
import { ViteSSG } from 'vite-ssg'

export const createApp = ViteSSG(
  App,
  {
    routes
  },
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }
)
