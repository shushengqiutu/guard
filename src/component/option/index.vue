
<template>
  <div class="myoption"
       :style="{color:color,margin:margin}">
    <i :class="icon"></i>
    <span class="text">{{text}}</span>
  </div>
</template>
<script>
export default {
  name: 'myoption',
  props: {
    margin: {
      type: String,
      default: '0'
    },
    color: {
      type: String,
      default: '#fff'
    },
    icon: {
      type: String,
      default: 'el-icon-delete',
      required: true
    },
    text: {
      type: String,
      default: '请传入操作名',
      required: true
    }
  },
  data () {
    return {

    }
  },

  methods: {
    // search () {
    //   this.$emit('searchVal', this.searchVal)
    // }

  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
