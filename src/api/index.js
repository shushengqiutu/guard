/* eslint-disable camelcase */
// 引入封装的ajax
import ajax from './ajax'
// 引入请求地址
import {
  LOGOIN_URL,
  USERINFO_URL,
  resetPassword
}
  from './req_url'

// 封装请求接口

// 登录接口
export const req_login = ({ username, password }) => ajax(LOGOIN_URL, { username, password }, 'post')
// 获取用户信息
export const req_userinfo = ({ token }) => ajax(USERINFO_URL, { token })
// 修改密码
export const resetPass = (params) => ajax(resetPassword, params, 'post')
