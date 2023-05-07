import Home from '@/pages/Index.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog/:slug?',
    name: 'Blog',
    component: () => import('@/pages/blog/index.vue'),
    children: [
      // {
      //   path: ':title',
      //   name: 'BlogPost',
      //   component: () => import('@/pages/blog/_title.vue')
      // }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Undefined',
    redirect: '/'
  }
]
