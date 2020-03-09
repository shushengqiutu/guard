<template>
  <div>
    <div class="tipSty" @click="drawer = true" v-show="!drawer">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="tipCloseSty" @click="drawer = false" v-if="drawer">
      <i class="el-icon-arrow-right"></i>
    </div>
    <el-drawer
      title="提示信息"
      size="322px"
      :visible.sync="drawer"
      :wrapperClosable="false"
      :with-header="false"
      :modal="false"
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

  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
