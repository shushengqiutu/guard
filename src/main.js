
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入自适应方案核心： 阿里可伸缩布局方案 lib-flexible
import './utill/lib-flexible'
// 引入 状态管理 vuex
import store from './store'
// 引入中英文切换
import i18n from './vue-i18n'
// 按需引入elmentui
import './element'
// 引入滚动条
import './vuescroll'
// 引入确认组件并挂载到原型上
import theConfirm from './component/comfirm/comfirm.js'
// 引入mockjs 调试接口
// import '../mock'
// import axios from 'axios' // mock.js
// Vue.config.productionTip = false // axios http请求库

// axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url
// Vue.prototype.$http = axios
/* eslint-disable no-new */
import './permission'
Vue.prototype.$confirm = theConfirm // 将确认框挂载到原型上
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
