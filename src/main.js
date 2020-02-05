
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入自适应方案核心： 阿里可伸缩布局方案 lib-flexible
import 'lib-flexible'
// 引入 状态管理 vuex
import store from './store'
// 引入中英文切换
import i18n from './vue-i18n'
// import VueI18n from 'vue-i18n'
// import zh from './lang/zh/zh.js'
// import en from './lang/en/en.js'
// Vue.use(VueI18n)
// const i18n = new VueI18n({
//   locale: localStorage.getItem('language') || 'en', // 使用localStorage缓存到本地，当下次使用时可默认当前使用语言
//   messages: {
//     'zh': zh,
//     'en': en
//   }
// })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
