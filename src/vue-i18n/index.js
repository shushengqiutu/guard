// 中英文切换vueI18n配置
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from '@/lang/zh-main.js'
import en from '@/lang/en-main.js'
Vue.use(VueI18n)

export default new VueI18n({
  locale: setLocale(), // 当前使用语言
  messages: {
    'zh': zh,
    'en': en
  }
})
// 修改默认语言 需要同步修改此处 和  C:\Users\hezhifu\Desktop\guard\guard\src\store\state.js 中lang
function setLocale () {
  if (localStorage.getItem('language')) {
    return localStorage.getItem('language')
  } else {
    localStorage.setItem('language', 'zh')
    return 'zh'
  }
}
