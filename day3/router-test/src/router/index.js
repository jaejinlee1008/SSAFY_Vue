import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NestedView from '../views/NestedView.vue'
import West from '../views/West.vue'
import East from '../views/East.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/nested',
      name: 'nested',
      component: NestedView,
      children: [
        {
          path: '/west',
          component: West
        },
        {
          path: '/east',
          component: East
        }
      ]
    },
    {
      path: '/named',
      name: 'named',
      components: {
        default: () => import('../views/TestView.vue'),
        first: East,
        second: West
      }
    },
  ]
})

export default router
