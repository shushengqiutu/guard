/* eslint-disable camelcase */
// 引入封装的ajax
import ajax from './ajax'
// 引入请求地址
import {
  LOGOIN_URL,
  USERINFO_URL,
  RESETPASSWORD_URL,
  LOGOUT_URL,
  SHOWWHITELIST_URL,
  OPERATELOGLIST_URL,
  SCANWHITELIST_URL
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
/** *************************************显示白名单明细开始********************************************/
// api文档接口08
/* let ShowWhiteListParams = {
  cmdlist: [{
    cmd: 0x00020504,
    ncmd: 'ShowWhiteList',
    data:
    {
      policyID: 1, // 策略ID(0为授信策略)
      page: 0, // 第几页 0为第一页
      size: 10, // 每页记录数，可选参数
      type: 1 // 白名单类型：1文件、2usb、3网卡
    }
  }]
} */
export const req_ShowWhiteList = (data) => ajax(SHOWWHITELIST_URL, {
  cmdlist: [{
    cmd: 0x00020504,
    ncmd: 'ShowWhiteList',
    data: data
  }]
}, 'POST')
/** *************************************显示白名单明结束********************************************/

/** *************************************文件扫描接口开始 序号02********************************************/
export const req_ScanFile = (data) => ajax(SCANWHITELIST_URL, data, 'POST')
/** *************************************文件扫描接口结束********************************************/

/** *************************************文件扫描停止接口开始 序号03  ********************************************/
/** *************************************文件扫描停止接口结束********************************************/

/** *************************************查询扫描任务状态接口开始 序号05********************************************/
/** *************************************查询扫描任务状态接口结束  ********************************************/

/** *************************************查询策略接口开始 序号07 ********************************************/
/** *************************************查询策略接口结束  ********************************************/

/** *************************************删除策略下的白名单接口开始 序号17********************************************/
/** *************************************删除策略下的白名单接口结束********************************************/

/** *************************************查看安全事件列表接口开始 序号34********************************************/
/** *************************************查看安全事件列表接口结束   ********************************************/

/** *************************************查看安全事件开始序号35********************************************/
/** *************************************查看安全事件结束   ********************************************/

/** *************************************操作日志列表接口开始序号38********************************************/
// let operateloglist = {
//   cmdlist: [{
//     cmd: 0x0002050f,
//     ncmd: 'operateloglist',
//     data:
//     {
//       page: '页数', size: '每页记录数' // 可选
//     }
//   }]
// }
export const req_operateloglist = (data) => ajax(OPERATELOGLIST_URL, {
  cmdlist: [{
    cmd: 0x0002050f,
    ncmd: 'operateloglist',
    data: data
  }]
}, 'POST')

/** *************************************操作日志列表接口结束  ********************************************/

/** *************************************模糊查询操作日志接口开始 序号39********************************************/
/** *************************************模糊查询操作日志接口结束********************************************/

/** *************************************文件扫描接口开 序号42********************************************/
/** *************************************文件扫描接口结束********************************************/

/** *************************************USB扫描接口开始序号 43********************************************/
/** *************************************USB扫描接口结束  ********************************************/

/** *************************************网卡扫描接口开始 序号44********************************************/
/** *************************************网卡扫描接口结束********************************************/
