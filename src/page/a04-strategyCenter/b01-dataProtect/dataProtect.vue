<template>
  <div>
    <div class="titleSty">
      应用防护策略配置
    </div>
    <div class="titleMargin">
      <div class="leftCont">应用防护匹配策略</div>
      <div><el-radio v-model="radio" label="0">文件绝对路径</el-radio></div>
    </div>
    <div class="lineMargin">
      <div class="leftCont"></div>
      <div><el-radio v-model="radio" label="1">文件指纹</el-radio></div>
    </div>
    <div class="lineMargin">
      <div class="leftCont"></div>
      <div><el-radio v-model="radio" label="2">文件指纹+文件路径</el-radio></div>
    </div>
    <div style="display: flex">
      <div class="leftCont"></div>
      <div style="display: flex;margin-top: 29px">
        <div class="okButton buttonMargin"
             @mouseover="okFlag=true"
             @mouseleave="okFlag=false"
             :class="{'active':okFlag}"
             @click="submitForm()"
        ><span>确定</span></div>
        <div class="cancelButton"
             @click="resetForm"
             @mouseover="cancelFlag=true"
             @mouseleave="cancelFlag=false"
             :class="{'active':cancelFlag}"
        ><span>取消</span></div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import {req_getConfig, req_sysConfig} from '@/api'
export default {
  name: 'dataProtect',
  data () {
    return {
      radio: null,
      okFlag: false,
      cancelFlag: false
    }
  },
  methods: {
    // 确定
    submitForm () {
      let data = [{
        'key': 'match_policy',
        'value': this.radio
      }]
      let params = {
        cmdlist: [{
          'cmd': 132374,
          'ncmd': 'setSystemConfig',
          data: {
            params: data
          }
        }]
      }
      req_sysConfig(params).then(res => {
        if (res.results.status) {
          this.$msg({
            message: '配置成功',
            type: 'success'
          })
        }
      })
    },
    resetForm () {
      this.getConfig()
    },
    // 获取系统参数配置
    getConfig () {
      let keyArr = [{
        key: 'match_policy'
      }]
      let params = {
        cmdlist: [{
          'cmd': 132372,
          'ncmd': 'getSystemConfig',
          'data': keyArr
        }]
      }
      req_getConfig(params).then(res => {
        if (res.results.status) {
          this.radio = res.results.list[0].value
        }
      })
    }
  },
  created () {
    this.getConfig()
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
