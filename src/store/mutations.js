// 引入类型定义
import * as MTYPS from './mutation-types'

export default {
  // 修改主题函数
  [MTYPS.CHANGE_THEME] (state, { theme }) {
    state.theme = theme
    localStorage.setItem('theme', theme)
  },
  // 修改语言参数
  [MTYPS.CHANGE_LANG] (state, { lang }) {
    state.lang = lang
    localStorage.setItem('language', lang)
  }
}
