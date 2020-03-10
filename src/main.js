
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入自适应方案核心： 阿里可伸缩布局方案 lib-flexible
import './utill/lib-flexible'
// vue 全局过滤器
import './utill/vue-filters'
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
// 引入确认组件并挂载到原型上
import stopComfirm from './component/stopComfirm/comfirm.js'
import { Notification } from 'element-ui'
// 引入阿里矢量图标
import '@/assets/font/iconfont.css'
// 引入思源字体
import '@/assets/font/fontcss.css'
// 引入websocket
import global from './global.js'
/* eslint-disable no-new */
import './permission'
Vue.prototype.$confirm = theConfirm // 将确认框挂载到原型上
Vue.prototype.$stopConfirm = stopComfirm // 将确认框挂载到原型上
Vue.prototype.global = global
Vue.prototype.$notify = Notification
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
