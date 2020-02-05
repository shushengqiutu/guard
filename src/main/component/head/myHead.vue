<template>
  <div class="head">
    <div class="left"> {{title}}</div>
    <div class="right">
      <div class="mean">1</div>
      <div class="minimize">2</div>
      <div class="close">3</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myHead',
  props: {
    title: {
      type: String,
      default: 'NAN'
    }
  },
  data () {
    return {

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
