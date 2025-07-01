import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/:shortUrl(\\w+)',
    name: 'ShortRedirect',
    component: HomePage,
    beforeEnter(to: RouteLocationNormalized) {
      window.location.href = `http://localhost:3000/${to.params.shortUrl}`

      return false
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
