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
        <p class="item"
           @click='appLogout'>退出</p>
      </div>
      <div v-show="getname&&setPasswordShow">
        <set-password @func="getPasswordShow"
                      :getname="getname"
                      :setPasswordShow="setPasswordShow"></set-password>
      </div>
      <div class="mean">
        <my-menu></my-menu>
      </div>
    </div>

    <div class="rightView">
      <my-head></my-head>
      <div class="contentWarp">
        <my-scroll>
          <transition :name="transitionName">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Main',
  components: {
    myHead, myMenu, setPassword
  },
  data () {
    return {
      operationShow: false,
      setPasswordShow: false,
      transitionName: ''
    }
  },
  computed: {
    ...mapGetters({
      getname: 'getname'

    })
  },
  created () {
    // console.log(this, 99)
  },
  methods: {
    ...mapActions(['Logout']),
    appLogout () {
      this.Logout().then(res => {
        if (res.code === 200) {
          this.$router.push({ name: 'signIn' })
        }
      })
    },
    setOperationShow () {
      //
      this.operationShow = false
    },
    getPasswordShow (boolean) {
      this.setPasswordShow = boolean
    }
  },
  watch: {
    // 使用watch 监听$router的变化
    $route (to, from) {
      // console.log(to, 9)
      let n = to.meta.animationId - from.meta.animationId
      let b = n % 100

      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (b !== 0) {
        // 设置动画名称
        if (n > 0) {
          // 前进
          this.transitionName = 'slide-top'
        } else {
          // 后退
          this.transitionName = 'slide-bottom'
        }
      } else {
        // 设置动画名称
        if (n > 0) {
          // 右滑

          this.transitionName = 'slide-left'
        } else {
          // 左滑
          this.transitionName = 'slide-right'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'  scoped>
@import "./css/index.scss";
.slide-bottom-enter-active,
.slide-bottom-leave-active,
.slide-top-enter-active,
.slide-top-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-top-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-top-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-bottom-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-bottom-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
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
