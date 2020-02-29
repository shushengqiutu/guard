// 储存请求地址
const BASE_URL = '/api'
// 登录
export const LOGOIN_URL = `${BASE_URL}/user/login`
// 获取用户信息
export const USERINFO_URL = `${BASE_URL}/user/getInfo`
// 修改密码请求接口地址
export const RESETPASSWORD_URL = `${BASE_URL}/user/resetPassword`
// 退出登录
export const LOGOUT_URL = `${BASE_URL}/user/logout`
// 查询策略列表
export const SHOWPOLICYLIST_URL = `${BASE_URL}/whitelist/policylist`

// 显示白名单明细（策略详情 应用程序）
export const SHOWWHITELIST_URL = `${BASE_URL}/whitelist/query`
// 查询策略列表(策略详情 USB 网卡)
export const SHOWWHITELIST_USB_NET_URL = `${BASE_URL}/whitelist/list`
// 日志列表
export const OPERATELOGQUERY_URL = `${BASE_URL}/operateLog/query`
// 审计事件
export const EVENTQUERY_URL = `${BASE_URL}/event/query`
// 白名单扫描
export const SCANWHITELIST_URL = `${BASE_URL}/whitelist/scan`
// 停止白名单扫描
export const STOPSCAN_URL = `${BASE_URL}/whitelist/stopscan`
// 查询扫描任务状态
export const SCANSTATUS_URL = `${BASE_URL}/whitelist/ScanStatus`
// 获取磁盘目录结构
export const DISKDIRECTORY_URL = `${BASE_URL}/disk/directorys`
// 切换工作模式
export const WORKMODE_URL = `${BASE_URL}/policy/operatingmode`
// 查询内置白名单列表
export const INWHITELIST_URL = `${BASE_URL}/whitelist/categoryList`
// 查看内置白名单详情
export const INWHITELISTINFO_URL = `${BASE_URL}/whitelist/category`
// 删除当前策略网卡
export const DELCURRENTPOLICY_URL = `${BASE_URL}/whitelist/delete`
// 删除所有策略
export const DELETEWHITELISTPOLICY_URL = `${BASE_URL}/whitelist/deletePolicy`
// 新增白名单策略
export const ADDWHITELISTPOLICY_URL = `${BASE_URL}/whitelist/createPolicy`
// 修改白名单策略
export const UPDATAWHITELISTPOLICY_URL = `${BASE_URL}/whitelist/updatePolicy`
// 首页状态信息
export const HOMESTATUS_URL = `${BASE_URL}/home/status`
// 客户端状态信息
export const PROGRAMSTATUS_URL = `${BASE_URL}/program/status`
// 追加白名单文件
export const ADDWHILELIST_URL = `${BASE_URL}/whitelist/addDir`
