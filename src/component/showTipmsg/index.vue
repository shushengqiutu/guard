<template>
  <div>
    <div class="tipSty" @click="showTip">
      <i class="el-icon-arrow-left
"></i>
    </div>
    <el-drawer
      title="提示信息"
      :visible.sync="drawer"
      :wrapperClosable="true"
    >
      <div v-html="tipmsg" class="fontCss">
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'showTipmsg',
  data () {
    return {
      drawer: false
    }
  },
  props: {
    tipmsg: {
      type: String,
      default: ''
    }
  },
  methods: {
    showTip () {
      this.drawer = true
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
