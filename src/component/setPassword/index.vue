<template>
  <div class="setPassWord">
    <div class="titleWarp">
      <span class="title">修改密码</span>
      <span @click="sendFatherPasswordShow"
            class="close"><i class="el-icon-close icon"> </i></span>
    </div>
  </div>

</template>
<script>
export default {
  name: 'user',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    sendFatherPasswordShow () {
      this.$emit('func', false)
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
