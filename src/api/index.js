/* eslint-disable camelcase */
// 引入封装的ajax
import ajax from './ajax'
// 引入请求地址
import {
  LOGOIN_URL,
  USERINFO_URL,
  RESETPASSWORD_URL,
  LOGOUT_URL,
  SCANWHITELIST_URL,
  STOPSCAN_URL,
  SCANSTATUS_URL,
  SHOWWHITELIST_URL,
  OPERATELOGQUERY_URL,
  EVENTQUERY_URL,
  SHOWPOLICYLIST_URL,
  SHOWWHITELIST_USB_NET_URL,
  WORKMODE_URL,
  INWHITELIST_URL,
  INWHITELISTINFO_URL,
  DISKDIRECTORY_URL,
  DELCURRENTPOLICY_URL,
  DELETEWHITELISTPOLICY_URL,
  ADDWHITELISTPOLICY_URL,
  UPDATAWHITELISTPOLICY_URL
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

/** *************************************查询白名单策略列表开始********************************************/
// api文档接口07
/* let ShowPolicyListParams = {
  cmdlist: [{
    cmd:   0x00020503,
    ncmd: 'ShowPolicyList',
    data:
    {

      page: 0, // 第几页 0为第一页
      size: 10, // 每页记录数，可选参数
      status: 0, //可选参数 1为当前策略
      type: 0 //可选参数
    }
  }]
} */

export const req_ShowPolicyList = (data) => ajax(SHOWPOLICYLIST_URL, {
  cmdlist: [{
    cmd: 0x00020503,
    ncmd: 'ShowPolicyList',
    data: data
  }]
}, 'POST')

/** *************************************查询白名单策略列表结束********************************************/

/** *************************************显示策略详情 应用程序白名单明细开始********************************************/
// api文档接口09
/* let ShowWhiteListParams = {
  cmdlist: [{
    cmd:  0x00020506,
    ncmd: 'SearchWhiteList',
    data:
    {
      policyID: 1, // 策略ID(0为授信策略)
      page: 0, // 第几页 0为第一页
      size: 10, // 每页记录数，可选参数
      type: 1 // 白名单类型：1文件、2usb、3网卡
      params：{
        模糊搜索
      }
    }
  }]
} */
export const req_ShowWhiteList = (data) => ajax(SHOWWHITELIST_URL, {
  cmdlist: [{
    cmd: 0x00020506,
    ncmd: 'SearchWhiteList',
    data: data
  }]
}, 'POST')
/** *************************************显示策略详情 应用程序白名单明细结束********************************************/

/** *************************************查询内置白名单列表开始***********************************/
// api文档接口09 不支持搜索
/* let ShowWhiteListParams = {
  cmdlist: [{
    cmd:  0x00020504,
    ncmd: 'ShowWhiteList',
    data:
    {
      policyID: 1, // 策略ID(0为授信策略)
      page: 0, // 第几页 0为第一页
      size: 10, // 每页记录数，可选参数
      type: 2 // 白名单类型：1文件、2usb、3网卡
    }
  }]
} */
export const req_ShowWhiteUsbNetList = (data) => ajax(SHOWWHITELIST_USB_NET_URL, {
  cmdlist: [{
    cmd: 0x00020504,
    ncmd: 'ShowWhiteList',
    data: data
  }]
}, 'POST')
/** *************************************查询内置白名单列表结束********************************/

/** *************************************查询内置白名单列表开始***********************************/
// api文档接口21
/* let ShowWhiteListParams = {
  cmdlist: [{
    cmd:   0x00020511,
    ncmd: 'WhiteListCreditCategoryList',
    data:
    {

      page: 0, // 第几页 0为第一页
      size: 10, // 每页记录数，可选参数
      wl_type: 0  //白名单类型（0：操作系统，1：工控应用，2：非工控应用），可选参数
    }
  }]
} */
export const req_Inwhitelist = (data) => ajax(INWHITELIST_URL, {
  cmdlist: [{
    cmd: 0x00020511,
    ncmd: 'WhiteListCreditCategoryList',
    data: data
  }]
}, 'POST')
/** *************************************查询内置白名单列表结束********************************/

/** *************************************查看内置白名单详情开始***********************************/
// api文档接口22
/* let ShowWhiteListParams = {
  cmdlist: [{
    cmd:   0x00020512,
    ncmd: 'WhiteListCreditCategory',
    data:
    {

      page: 0, // 第几页 0为第一页
      size: 10, // 每页记录数，可选参数
       wl_type: 1, //白名单类型（0：操作系统，1：工控应用，2：非工控应用）
       os_version:"windows:6.0.2.1"
    }
  }]
} */
export const req_InwhitelistInfo = (data) => ajax(INWHITELISTINFO_URL, {
  cmdlist: [{
    cmd: 0x00020512,
    ncmd: 'WhiteListCreditCategory',
    data: data
  }]
}, 'POST')
/** *************************************查看内置白名单详情结束********************************/

/** *************************************文件扫描接口开始 序号02********************************************/
export const req_scanFile = (data) => ajax(SCANWHITELIST_URL, data, 'POST')
/** *************************************文件扫描接口结束********************************************/

/** *************************************文件扫描停止接口开始 序号03  ********************************************/
export const req_stopScan = (data) => ajax(STOPSCAN_URL, data, 'POST')
/** *************************************文件扫描停止接口结束********************************************/

/** *************************************获取磁盘目录结构 序号54  ********************************************/
export const req_diskDirectory = (data) => ajax(DISKDIRECTORY_URL, data, 'POST')
/** *************************************文件扫描停止接口结束********************************************/

/** *************************************查询扫描任务状态接口开始 序号05********************************************/
export const req_scanStatus = (data) => ajax(SCANSTATUS_URL, data, 'POST')
/** *************************************查询扫描任务状态接口结束  ********************************************/

/** *************************************审计事件开始序号35********************************************/

// let eventqueryParams = {
//   cmdlist: [{
//     cmd: 0x0002050e,
//     ncmd: 'eventquery',
//     data:
//     {
//       page: '页数',
//       size: '每页记录数', // 可选
//       start_time: '开始时间',
//       end_time: '结束时间',
//       params: {
//        // 模糊搜索
//
//       }
//     }
//   }]
// }
export const req_eventquery = (data) => ajax(EVENTQUERY_URL, {
  cmdlist: [{
    cmd: 0x0002050e,
    ncmd: 'eventquery',
    data: data
  }]
}, 'POST')
/** *************************************审计事件结束   ********************************************/

/** *************************************操作日志列表接口开始序号39********************************************/
// let operatelogquery = {
//   cmdlist: [{
//     cmd: 0x00020510,
//     ncmd: 'operatelogquery',
//     data:
//     {
//       page: '页数',
//       size: '每页记录数', // 可选
//       start_time: '开始时间',
//       end_time: '结束时间',
//       params: {
//         "action: 'xxxx', // 执行对象
//       }
//     }
//   }]
// }
export const req_operatelogquery = (data) => ajax(OPERATELOGQUERY_URL, {
  cmdlist: [{
    cmd: 0x00020510,
    ncmd: 'operatelogquery',
    data: data
  }]
}, 'POST')
/** *************************************操作日志列表接口结束  ********************************************/

/** *************************************切换工作模式开始 序号44********************************************/
export const req_workmode = (data) => ajax(WORKMODE_URL, data, 'POST')
/** *************************************切换工作模式结束********************************************/

/** *************************************删除当前策略网卡 序号17********************************************/
export const req_delCurrentPolicy = (data) => ajax(DELCURRENTPOLICY_URL, data, 'POST')
/** *************************************删除当前策略网卡********************************************/

/** *************************************删除所有策略 序号16********************************************/
// let params={
// "cmd": 0x0002050a,
//  "ncmd": "deletePolicy",
//    "data": {
//      *"policyID": 1
// }
//   }
export const req_deleteWhiteListPolicy = (data) => ajax(DELETEWHITELISTPOLICY_URL, {
  cmdlist: [{
    cmd: 0x0002050a,
    ncmd: 'deletePolicy',
    data: data
  }]
}, 'POST')
/** *************************************删除当前策略********************************************/

/** *************************************创建白名单策略 序号10********************************************/
export const req_addWhiteList = (data) => ajax(ADDWHITELISTPOLICY_URL, data, 'POST')
/** *************************************删除当前策略网卡********************************************/

/** *************************************修改白名单策略 序号10********************************************/
export const req_updataWhiteList = (data) => ajax(UPDATAWHITELISTPOLICY_URL, data, 'POST')
/** *************************************删除当前策略网卡********************************************/
