<!-- 在此注明为页面的哪个页面或为哪个模块的子模块-->
<!-- 这是一个测试页面-->
<template>
  <!-- 采用scss写法 请给每个最外层添加一个类名-->
  <div class="warp">
    <div class="test1">
      <router-link :to="{ path: '/user'}">user</router-link>
      <router-link :to="{ path: '/'}">shouye</router-link>
    </div>
    <div class="test2">
      <div class="head">
        <span @click="change_theme({theme:1})">主题1</span>
        <span @click="change_theme({theme:2})">主题2</span>
        <span></span>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
// 引入所需模块
import { mapMutations } from 'vuex'
export default {
  // name 统一为当前文件名
  name: '',
  // data中所有数据需要都写在以功能，业务划分的模块里 例如
  data () {
    return {
      data: {

        table: {
          data: {}// 数据源
        }
      }
    }
  },
  /* 项目中常用生命周期 请按顺序书写 方法放在最后 生命周期只做函数调用，不写具体函数 */
  created () {
    // 进行ajax请求异步数据的获取、初始化数据
    // 在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
  },
  mounted () {
    // 挂载元素内dom节点的获取 能在在 created操作的在created
  },
  destroyed () {
    // 销毁一些监听事件及定时函数
  },
  watch () {
    // ：监听具体数据变化，并做相应的处理
  },
  methods: {
    ...mapMutations(['change_theme'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
