import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'

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
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    }
  ]
})

export default router
