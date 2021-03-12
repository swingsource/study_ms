import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Index'
import Tradition from '@/views/layout/Tradition'
import Card from '@/views/layout/Card'

import traRoutes from './traRoute'
import cardRoutes from './cardRoute'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/tra',
    name: 'Tradition',
    component: Tradition,
    children: traRoutes
  },
  {
    path: '/card',
    name: 'Card',
    component: Card,
    children: cardRoutes
  }
]

const router = new VueRouter({
  routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
