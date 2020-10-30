import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 组件全局注册
import register from "@/utils/register";
Vue.use(register)

import lazyLoad from '@/utils/lazyLoad'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
