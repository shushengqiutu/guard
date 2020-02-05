<template>
  <div class="signIn">
    <div class="closeWarp"> <span class="close">x</span></div>
    <div class="user">
      <div class="userInfo">
        <img class="userImg"
             src="@/assets/img/public/allow.png"
             alt="">
        <span class="logoin"> {{$t('public.signIn')}} </span>
      </div>
    </div>
    <div class="signInfoWarp">
      <div class="signInfo">
        <p class="textWarp"> <input type="text"
                 v-model="user.name"> <span class="nameIcon icon"></span></p>
        <p class="passwordWarp"> <input type="password"
                 v-model="user.password"> <span class="passwordIcon icon"></span></p>
        <p class="signInWarp"> {{$t('public.signIn')}}</p>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'signIn',
  data () {
    return {
      user: {
        name: null,
        password: null
      }
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
