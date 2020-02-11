/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { commontRouterMap, resetRouter } from '@/router'
import {
  req_login,
  req_userinfo

} from '@/api'
console.log(req_login, 111)
let app = 'token'
let storage = window.localStorage
const user = {
  state: {
    token: storage.getItem(app),
    name: '',
    avatar: '',
    roles: '',
    routes: commontRouterMap,
    addRoutes: ''
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = commontRouterMap.concat(routes)
    }

  },
  getters: {
    gettoken: state => state.token,
    getroles: state => state.roles,
    getname: state => state.name,
    getavatar: state => state.avatar,
    getroutes: state => state.routes

  },
  actions: {
    async Login ({ commit }, userInfo) {
      const result = await req_login(userInfo)
      // 存储token
      storage.setItem(app, result.result)
      commit('SET_TOKEN', result.result)
      // 结果返回给页面处理页面逻辑
      return result
    },
    // 获取用户信息
    async  GetInfo ({ commit, state }) {
      const result = await req_userinfo({ token: state.token })
      if (result) {
        const data = result.result
        // 保存 角色 到vuex
        commit('SET_ROLES', data.roles)
        // 保存 用户名 到vuex
        commit('SET_NAME', data.name)
        // 保存用户头像到 vuex
        commit('SET_AVATAR', data.avatar)
        // 保存后端返回路由表到vuex
        commit('SET_ROUTES', data.router)
        return result
      }
    }
    // 退出登录
    // LogOut ({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     serviceManger
    //       .logout(state.token)
    //       .then(() => {
    //         commit('SET_TOKEN', '')
    //         commit('SET_ROLES', '')
    //         // cookie.remove(app)
    //         // resetRouter()
    //         resolve()
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },
    // remove token
    // resetToken ({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', '')
    //     // cookie.remove(app)
    //     resolve()
    //   })
    // }
  }
}
export default user
