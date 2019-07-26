import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/users/user.vue'
import Role from '@/views/right/role.vue'
import Right from '@/views/right/right.vue'

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
      component: Home,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'role',
          path: 'roles',
          component: Role
        },
        {
          name: 'right',
          path: 'rights',
          component: Right
        }
      ]
    }

  ]
})

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('itcast_manage_34_token')
  // console.log('to', to)
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
