export default {
  // 系统主题，默认为高亮
  theme: localStorage.getItem('theme') || 'light',
  // 系统布局，默认为侧边栏
  layout: localStorage.getItem('layout') || 'tra',
  // 当前选中菜单
  currentNav: localStorage.getItem('currentNav') || 'home',
  // token
  token: localStorage.getItem('token') || ''
}
