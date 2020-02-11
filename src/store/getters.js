
// getters.js
export default {
  // 获取主题
  getTheme (state) {
    if (localStorage.getItem('theme')) {
      // debugger
      state.theme = localStorage.getItem('theme')
    }
    return state.theme
  },
  // 获取语言
  getLang (state) {
    if (localStorage.getItem('language')) {
      state.lang = localStorage.getItem('language')
    }
    return state.lang
  }
}
