export default [
  {
    path: '',
    redirect: 'home'
  },
  {
    path: 'home',
    name: 'Home',
    meta: {
      navName: '首页'
    },
    component: () => import('@/views/home/Index.vue')
  },
  {
    path: 'user',
    name: 'User',
    meta: {
      navName: '用户管理'
    },
    component: () => import('@/views/user/Index.vue')
  },
  {
    path: 'book',
    name: 'Book',
    meta: {
      navName: '书籍管理'
    },
    component: () => import('@/views/book/Index.vue')
  },
  {
    path: 'message',
    name: 'Message',
    meta: {
      navName: '留言管理'
    },
    component: () => import('@/views/message/Index.vue')
  },
  {
    path: 'approval',
    name: 'Approval',
    meta: {
      navName: '推荐审核'
    },
    component: () => import('@/views/approval/Index.vue')
  },
  {
    path: 'monitor',
    name: 'Monitor',
    meta: {
      navName: '前台监测'
    },
    component: () => import('@/views/monitor/Index.vue')
  }
]
