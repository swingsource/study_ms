export default [
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
  }
]