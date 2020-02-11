// 英文语言模板
// 项目 OEM 相关文字
let item = require('@/lang/item/lang/en-item.js')
// 外层主框架
let main = require('@/main/lang/en-module.js')
console.log(item, 55)
module.exports = {
  item: item.item, // 项目 OEM 相关文字
  main: main.main,
  public: {
    signIn: 'Sign in',
    signInNameNull: 'User name cannot be empty',
    signInNameError: 'Incorrect user name',
    signInPasswordError: 'Password error'
  }
}
