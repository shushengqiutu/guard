// 引入vue和vuex实例；
import Vue from 'vue'
import Vuex from 'vuex'
// 引入vuex相关模块
// import createPersistedState from 'vuex-persistedstate'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'
import router from './modules/router'
import app from './modules/app'
// 注入vuex
Vue.use(Vuex)
// 开发环境输出logger
// const debug = process.env.NODE_DEV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    user,
    router,
    app
  }
  // plugins: [createPersistedState()] //防止数据刷新丢失
})
