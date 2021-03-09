import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugin/normalize.css/index'
import '@/plugin/elementUI/index'
import '@/plugin/iconfont/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
