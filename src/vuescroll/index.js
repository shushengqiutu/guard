// 滚动条
import vuescroll from 'vuescroll'
import Vue from 'vue'
Vue.use(vuescroll, {
  mode: 'native',
  sizeStrategy: 'number',
  detectResize: true,
  ops: {
    rail: {
      opacity: '0.2',
      background: 'green',
      specifyBorderRadius: '5px',
      border: 'none',
      size: '1px'
    },
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: '#c1c1c1',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: '6px',
      disable: false
    },
    scrollButton: {
      enable: false,
      background: 'transparent'
    },
    scrollPanel: {
      easing: 'easeInQuad',
      speed: 800
    },
    vuescroll: {
      wheelScrollDuration: 0
    }
  },
  name: 'myScroll'
})
