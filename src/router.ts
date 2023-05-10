import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Index.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: 'blog',
      name: 'Blog',
      component: () => import('@/pages/blog/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Undefined',
      redirect: '/'
    }
  ]
})
