<template>
  <div class="setPassWord">
    <div class="titleWarp">
      <div class="title">修改密码</div>
      <div @click="sendFatherPasswordShow"
           class="close"><i class="el-icon-close icon"> </i></div>
    </div>
    <div class="tipText">
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="name">
          <el-input v-model="ruleForm.name"
                    disabled=""></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pass">
          <el-input type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="checkPass">
          <el-input type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">
      <div class="okSty"
           @mouseover="mouseOverOk"
           @mouseleave="mouseLeaveOk"
           :style="okActive"
           @click="submitForm('ruleForm')">确定</div>
      <div class="okSty"
           @mouseover="mouseOverNo"
           @mouseleave="mouseLeaveNo"
           :style="noActive"
           @click="resetForm('ruleForm')">取消</div>
    </div>
  </div>
</template>
<script>
import { req_resetpass } from '@/api'
export default {
  name: 'setPassword',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      okActive: 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)',
      noActive: 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)',
      isShow: this.setPasswordShow,
      ruleForm: {
        name: this.getname,
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    getname: {
      type: String,
      required: true
    },
    setPasswordShow: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    sendFatherPasswordShow () {
      this.$emit('func', false)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('func', false)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          req_resetpass(this.ruleForm).then(res => {
            if (res.code === 200) {

            } else {

            }
            this.$emit('func', false)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    mouseOverOk () {
      this.okActive = 'background:red;color: rgba(255,255,255,1)'
      this.noActive = 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)'
    },
    mouseLeaveOk () {
      this.okActive = 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)'
    },
    mouseOverNo () {
      this.noActive = 'background:red;color: rgba(255,255,255,1)'
      this.okActive = 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)'
    },
    mouseLeaveNo () {
      this.noActive = 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)'
    }
  },
  watch: {
    setPasswordShow (newVal, oldVal) {
      this.ruleForm.pass = ''
      this.ruleForm.checkPass = ''
    }
  },
  created () {

  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
>>> .el-icon-close:before {
  font-size: 18px;
}
>>> .form-item--small .el-form-item__label {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
>>> .el-input__inner {
  width: 230px;
  height: 30px;
}
>>> .el-input--small .el-input__inner {
  padding: 8px;
}
>>> .el-input__suffix {
  right: 60px;
}
.setPassWord {
  width: 415px;
  height: 270px;
  background: rgba(238, 238, 238, 1);
  box-shadow: 11px 19px 29px 3px rgba(19, 19, 19, 0.25);
  border-radius: 5px;
  position: fixed;
  top: 150px;
  left: 330px;
  z-index: 100;
}
.titleWarp {
  display: flex;
}
.title {
  margin-top: 12px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  align-items: center;
  margin-left: 170px;
}
.close {
  width: 15px;
  height: 15px;
  margin-left: 150px;
  margin-top: 12px;
  cursor: pointer;
}
.tipSty {
  padding-top: 13px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  width: 100%;
  line-height: 16px;
}
.tipText {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 27px;
  margin-left: 25px;
}
.btn {
  margin-top: 29px;
  display: flex;
}
.okSty {
  width: 125px;
  height: 30px;
  margin-left: 55px;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  border-radius: 3px;
}
</style>
