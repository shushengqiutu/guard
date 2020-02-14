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
               src="@/assets/img/public/person.png"
               alt="">
          <div class=" logoinWarp"
               @mouseenter="operationShow=true"
               @mouseleave="setOperationShow">
            <span class="logoin"> {{getname||$t('public.signIn')}} </span>
            <i v-show="getname&&!operationShow"
               class="el-icon-caret-bottom"></i>
            <i v-show="getname&&operationShow"
               class="el-icon-caret-top"></i>

          </div>

        </div>
      </div>
      <div class="operation"
           v-show="getname&&operationShow"
           @mouseenter="operationShow=true"
           @mouseleave="operationShow=false">

        <p class="item"
           @click="setPasswordShow=!setPasswordShow">修改密码</p>
        <p class="item">退出</p>
      </div>
      <div class="setPasswordWarp"
           v-show="getname&&setPasswordShow">
        <set-password @func="getPasswordShow"></set-password>
      </div>
      <div class="mean">
        <my-menu></my-menu>
      </div>
    </div>

      <div class="rightView">
      <my-head></my-head>
      <div class="contentWarp">
        <my-scroll>
    <transition name="slide-right">
               <router-view />
  </transition>
        </my-scroll>
      </div>
    </div>

  </div>
</template>

<script>

import myHead from './component/head/'
import myMenu from './component/menu/'
import setPassword from '@/component/setpassword/'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  components: {
    myHead, myMenu, setPassword
  },
  data () {
    return {
      operationShow: false,
      setPasswordShow: false
    }
  },

  computed: {
    ...mapGetters({
      getname: 'getname'

    })
  },
  created () {
    console.log(this, 99)
  },
  methods: {
    setOperationShow () {
      //

      this.operationShow = false
    },
    getPasswordShow (boolean) {
      this.setPasswordShow = boolean
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'  scoped>

@import "./css/index.scss";
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
 will-change: transform;
 transition: all 500ms;
 position: absolute;
}
.slide-right-enter {
 opacity: 0;
 transform: translate3d(0, 100%, 0);
}
.slide-right-leave-active {
 opacity: 0;
 transform: translate3d(0, -100%, 0);
}
.slide-left-enter {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
}

</style>
