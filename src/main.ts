import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import { router } from './router'
import '@/styles/main.css'

const app = createApp(App)

app
  .use(router)
  .mount('#app')
