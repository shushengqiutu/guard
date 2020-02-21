<template>
  <div class="screen">
    <div class="item"
         :class="status?'active':''"
         @click="statusChange"> 筛选
      <i :class="status?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
    </div>
  </div>

</template>
<script>

export default {
  name: 'screen',
  // props: {
  //   status: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data () {
    return {
      status: false
    }
  },

  methods: {
    statusChange () {
      this.status = !this.status
      this.$emit('changeStatus', this.status)
    }
  }

}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
