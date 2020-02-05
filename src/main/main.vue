<template>
  <div class="warp">
    <div class="leftMean">
      <div class="logo">
        <img class="logoImg"
             src="@/assets/img/public/allow.png"
             alt="">
        <span class="itemName"> {{$t('item.name')}}</span>
      </div>
      <div class="user">
        <div class="userInfo">
          <img class="userImg"
               src="@/assets/img/public/allow.png"
               alt="">
          <span class="logoin"> {{$t('public.signIn')}} </span>
        </div>
      </div>
      <div class="mean">

      </div>
    </div>
    <div class="rightView">
      <!-- <div class="head">
        <span @click="change_theme({theme:'1'})"> 主题1</span>
        <span @click="change_theme({theme:'2'})">主题2 </span>
        <span @click="change_lang({lang:'zh'})"> 中文1</span>
        <span @click="change_lang({lang:'en'})">英文2 {{$t('item.name')}}</span>

        <span></span>
      </div> -->

      <my-head></my-head>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import myHead from './component/head/myHead.vue'

export default {
  name: 'Main',
  components: {
    myHead
  },
  data () {
    return {

    }
  },
  created () {
    console.log(this, 91119)
    console.log(this.$store, 91119)
  },
  methods: {
    ...mapMutations(['change_theme', 'change_lang'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
