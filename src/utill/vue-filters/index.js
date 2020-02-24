// 全局过滤器
import Vue from 'vue'
// 操作日志表模块类型过滤
Vue.filter('filterModule', function (module) {
  let numModule = parseInt(module)
  switch (numModule) {
    case 1:
      return '用户登录'
    case 2:
      return '用户管理'
    case 3:
      return '参数配置'
    case 4:
      return '策略配置'
    case 5:
      return 'USB管控'
    case 6:
      return '安全U盘'
    case 7:
      return '事件审计日志'
    case 8:
      return '软件升级'
  }
})
// 审计事件用户是否确认 tag_status过滤
Vue.filter('filterTagStatus', function (tagStatus) {
  let numTagStatus = parseInt(tagStatus)
  switch (numTagStatus) {
    case 0:
      return '未确认'
    case 1:
      return '已确认'
  }
})
// 审计事件事件上报状态 status过滤
Vue.filter('filterStatus', function (status) {
  let numStatus = parseInt(status)
  switch (numStatus) {
    case 0:
      return '未上报'
    case 1:
      return '已上报'
  }
})
// 内置白名单列表白名单类型  wl_type过滤
Vue.filter('filterWlType', function (wlType) {
  let numWlType = parseInt(wlType)
  switch (numWlType) {
    case 0:
      return '操作系统'
    case 1:
      return '工控应用'
    case 2:
      return '非工控应用'
  }
})
// 内置白名单列表是否国产  os_type过滤
Vue.filter('filterOsType', function (osType) {
  let numOsType = parseInt(osType)
  switch (numOsType) {
    case 0:
      return '国外'
    case 1:
      return '国产'
  }
})
