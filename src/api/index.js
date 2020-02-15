/* eslint-disable camelcase */
// 引入封装的ajax
import ajax from './ajax'
// 引入请求地址
import {
  LOGOIN_URL,
  USERINFO_URL,
  RESETPASSWORD_URL,
  LOGOUT_URL
}
  from './req_url'

// 封装请求接口

// 登录接口
export const req_login = ({ username, password }) => ajax(LOGOIN_URL, { username, password }, 'post')
// 获取用户信息
export const req_userinfo = ({ token }) => ajax(USERINFO_URL, { token })
// 修改密码
export const req_resetpass = (params) => ajax(RESETPASSWORD_URL, params, 'post')
// 退出登录
export const req_logout = () => ajax(LOGOUT_URL)
