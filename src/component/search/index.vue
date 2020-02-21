
<template>
  <div class="mySearch">

    <span class="el-icon-search icon"></span>
    <input type="text"
           class="content"
           v-model="content"
           :class="{ 'active':active }"
           placeholder="搜索..."
           @blur="changeblur">
  </div>

</template>
<script>
export default {
  name: 'search',
  // props: {
  //   placeHolder: ''
  // },
  data () {
    return {
      active: false,
      content: '',
      searchVal: ''
    }
  },
  methods: {
    changeblur () {
      if (this.content) {
        this.active = true
        debugger
        this.$emit('paramsChange', 'key', this.content)
      } else {
        this.active = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
