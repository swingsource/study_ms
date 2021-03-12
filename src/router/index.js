import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Index'
import Tradition from '@/views/layout/Tradition'
import Card from '@/views/layout/Card'

Vue.use(VueRouter)

// 两种布局下的页面路由
const pageRoutes = [
  {
    path: 'home',
    name: 'Home',
    component: () => import('@/views/home/Index.vue')
  },
  {
    path: 'user',
    name: 'User',
    component: () => import('@/views/user/Index.vue')
  },
  {
    path: 'book',
    name: 'Book',
    component: () => import('@/views/book/Index.vue')
  },
  {
    path: 'message',
    name: 'Message',
    component: () => import('@/views/message/Index.vue')
  },
  {
    path: 'approval',
    name: 'Approval',
    component: () => import('@/views/approval/Index.vue')
  },
  {
    path: 'monitor',
    name: 'Monitor',
    component: () => import('@/views/monitor/Index.vue')
  },
]

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
    children: pageRoutes
  },
  {
    path: '/card',
    name: 'Card',
    component: Card,
    children: pageRoutes
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
