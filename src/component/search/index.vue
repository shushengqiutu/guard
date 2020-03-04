
<template>
  <div class="mySearch">

    <span class="el-icon-search icon"></span>
    <input type="text"
           class="content"
           v-model="content"
           @keyup.enter="$event.target.blur"
           :class="{ 'active':active }"
           placeholder="请输入搜索内容..."
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
      } else {
        this.active = false
      }
      this.$emit('paramsChange', 'key', this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
