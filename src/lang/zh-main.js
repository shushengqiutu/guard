// 中文语言模板
let main = require('@/main/lang/zh-module.js')
let item = require('@/lang/item/lang/zh-item.js')// 项目 OEM 相关文字
console.log(item, 55)
module.exports = {
  item: item.item, // 项目 OEM 相关文字
  main: main.main,
  public: {
    signIn: '登录'
  }
}
