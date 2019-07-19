import Vue from 'vue'

import VueRouter from 'vue-router'
import Login from '@/views/login.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'default',
      path: '/',
      component: Login
    }
  ]
})

export default router
