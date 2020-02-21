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
