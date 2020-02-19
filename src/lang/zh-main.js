// 中文语言模板
// 项目 OEM 相关文字
let item = require('@/lang/item/lang/zh-item.js')
// 外层主框架
let main = require('@/main/lang/zh-module.js')
// console.log(item, 55)
module.exports = {
  item: item.item, // 项目 OEM 相关文字
  main: main.main,
  public: {
    signIn: '登录',
    signInNameNull: '用户名不能为空',
    signInNameError: '用户名不正确',
    signInPasswordError: '密码错误'
  }
}
