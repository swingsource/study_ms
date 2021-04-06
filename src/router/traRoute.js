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
    path: 'teach',
    name: 'Teach',
    meta: {
      navName: '教程管理'
    },
    component: () => import('@/views/teach/Index')
  },
  {
    path: 'chapter',
    name: 'Chapter',
    meta: {
      navName: '目录管理'
    },
    component: () => import('@/views/chapter/Index.vue')
  },
  {
    path: 'content',
    name: 'Content',
    meta: {
      navName: '内容管理'
    },
    component: () => import('@/views/content/Index.vue')
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
    path: 'recommend',
    name: 'Recommend',
    meta: {
      navName: '推荐审核'
    },
    component: () => import('@/views/recommend/Index.vue')
  },
  {
    path: 'monitor',
    name: 'Monitor',
    meta: {
      navName: '前台监测'
    },
    component: () => import('@/views/monitor/Index.vue')
  },
  {
    path: 'shell',
    name: 'Shell',
    meta: {
      navName: '导入教程'
    },
    component: () => import('@/views/likeShell/Index.vue')
  }
]
