<template>
  <div class="signIn">
    <div class="closeWarp"> <span class="close"><i class="el-icon-close icon"> </i></span></div>
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
        <el-form :model="userInfo"
                 :rules="rules"
                 ref="userInfo">
          <el-form-item prop="username">
            <p class="textWarp">
              <el-input v-model="userInfo.username"
                        placeholder="请输入用户名"></el-input> <span class="nameIcon icon"></span>
            </p>
          </el-form-item>
          <el-form-item prop="password">
            <p class="passwordWarp">
              <el-input v-model="userInfo.password"
                        placeholder="请输入密码"></el-input> <span class="passwordIcon icon"></span>
            </p>
          </el-form-item>
          <p class="signInWarp"
             @click="signIn('userInfo')"> {{$t('public.signIn')}}</p>
        </el-form>
      </div>

    </div>
  </div>
</template>
<script>
import { validcodeName } from '@/utill/formValid'
import { mapActions } from 'vuex'
export default {
  name: 'signIn',
  data () {
    return {
      userInfo: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        name: [
          { required: true, message: this.$t('public.signInNameNull'), trigger: 'blur' },
          { validator: validcodeName, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['Login']),
    signIn (formName) {
      let valid = this.submitForm(formName)
      console.log(valid)
      if (valid) {
        // 账号密码通过前台验证
        this.loading = true
        this.Login(this.userInfo).then(res => {
          console.log(res, 888)
          if (res.code === 200) {
            // let pathName = 'smartExam'
            // console.log(this, 9944)
            this.$router.push({ name: 'smartExam' })
          }
        })
        // this.$store
        //   .dispatch('Login', this.userInfo)
        // .then(data => {
        //   this.loading = false
        //   if (data) {
        //     // 页面跳转
        //     let pathName = 'smartExam'
        //     this.$router.push({ path: pathName })
        //   }
        // })
        // .catch(() => {
        //   this.loading = false
        // })
      } else {

      }
    },
    submitForm (formName) {
      let flag = true
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          flag = false
          return false
        }
      })
      return flag
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
