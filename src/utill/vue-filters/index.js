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
// 审计事件类型状态 EventType过滤T
Vue.filter('filterEventType', function (eventType) {
  let numEventType = parseInt(eventType)
  switch (numEventType) {
    case 10:
      return '进程执行'
    case 11:
      return '进程拦截'
    case 20:
      return 'USB发现'
    case 21:
      return 'USB拦截'
    case 30:
      return '网卡发现'
    case 31:
      return '网卡禁用'
    case 32:
      return '网卡卸载'
    case 40:
      return '非法外联检测'
    case 41:
      return '非法外联拦截'
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
      return '否'
    case 1:
      return '是'
  }
})
// 格式化文件大小
Vue.filter('filterSize', function (value) {
  if (value == null || value === '') {
    return '0 Bytes'
  }
  let unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  let srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size = srcsize / Math.pow(1024, index)
  size = size.toFixed(0)// 保留的小数位数
  return size + unitArr[index]
})

// 格式化所有策略下的type类型
Vue.filter('filterType', function (type) {
  let numType = parseInt(type)
  switch (numType) {
    case 0:
      return '授信白名单策略'
    case 1:
      return '内置白名单策略'
    case 2:
      return '扫描白名单策略'
    case 3:
      return '远程下发白名单策略'
    case 4:
      return '本地导入白名单策略'
    case 5:
      return '驱动授信白名单策略'
  }
})

// 格式化所有策略下的type类型
Vue.filter('filterFile', function (file, num) {
  // 获取字节长度
  let str = file
  let count = str.replace(/[\u4e00-\u9fa5]/g, 'aa').length
  // 如果字节小于定义
  if (count < num) {
    return file
  } else {
    // 取最后一个文件
    let endStr = file.split('\\').pop()
    let endCount = endStr.replace(/[\u4e00-\u9fa5]/g, 'aa').length + 4
    if (endCount > num) {
      return `...\\${endStr}`
    } else {
      let startLen = num - endCount
      let startStr
      if (startLen < 3) {
        startStr = '\\'
      } else {
        startStr = file.substring(0, startLen)
      }

      return `${startStr}...\\${endStr}`
    }
  }
})
