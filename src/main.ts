import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import { router } from './router'
import '@/styles/main.css'
import { createHead } from "@vueuse/head"

const app = createApp(App)
const head = createHead()

app
  .use(head)
  .use(router)
  .mount('#app')
