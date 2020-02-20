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
// 显示白名单明细
export const SHOWWHITELIST_URL = `${BASE_URL}/whitelist/list`
// 查询操作日志列表
export const OPERATELOGLIST_URL = `${BASE_URL}/operateLog/list`
// 查询审计事件列表
export const EVENTLIST_URL = `${BASE_URL}/event/list`
// 搜索审计事件
export const EVENTQUERY_URL = `${BASE_URL}/event/query`
// 白名单扫描
export const SCANWHITELIST_URL = `${BASE_URL}/whitelist/scan`
// 停止白名单扫描
export const STOPSCAN_URL = `${BASE_URL}/whitelist/stopscan`
// 查询扫描任务状态
export const SCANSTATUS_URL = `${BASE_URL}/whitelist/ScanStatus`
