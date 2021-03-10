import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Index'
import Tradition from '@/views/layout/Tradition'
import Card from '@/views/layout/Card'

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
    component: Tradition
  },
  {
    path: '/card',
    name: 'Card',
    component: Card
  }
]

const router = new VueRouter({
  routes
})

export default router
