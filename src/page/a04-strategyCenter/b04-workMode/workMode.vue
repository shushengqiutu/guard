<template>
  <div class="workmode">
    <open-one
      :firstObj="firstObj"
      :secondObj="secondObj"
      :title="title"
      @changeFirstStatus="protectMode"
      @changeSecondStatus="auditMode"
    ></open-one>
    <show-tipmsg :tipmsg="tipmsg">
      <!--<span v-html="tipmsg"></span>-->
    </show-tipmsg>
  </div>
</template>
<script>
import {req_workmode} from '@/api'
import openOne from '@/component/openOne/index.vue'
import protectImgUrl from '@/assets/img/public/审计@2x(2).png'
import auditImgUrl from '@/assets/img/public/图层 13 拷贝@2x.png'
import showTipmsg from '@/component/showTipmsg/'
import {workModeTip} from '@/assets/tipMsg/index.js'
export default {
  name: 'workMode',
  components: {
    openOne,
    showTipmsg
  },
  data () {
    return {
      tipmsg: workModeTip.replace(/\n/g, ' <br>'),
      title: '工作模式',
      firstObj: {
        imgUrl: protectImgUrl,
        status: true,
        name: '保护模式'
      },
      secondObj: {
        imgUrl: auditImgUrl,
        status: false, // 进入页面请求后台返回开关状态
        name: '审计模式'
      }
    }
  },
  methods: {
    // 保护模式
    protectMode (val) {
      if (!val) {
        this.secondObj.status = true
        let queryParams = {
          cmdlist: [{
            'cmd': 132865,
            'ncmd': 'SwitchOperatingMode',
            'data': {
              'mode': 0 // 0 审计，1保护
            }
          }]
        }
        req_workmode(queryParams).then(res => {
          if (res.results.status) {

          }
        })
      }
    },
    // 审计模式
    auditMode (val) {
      if (!val) {
        this.firstObj.status = true
        let queryParams = {
          cmdlist: [{
            'cmd': 132865,
            'ncmd': 'SwitchOperatingMode',
            'data': {
              'mode': 1 // 0 审计，1保护
            }
          }]
        }
        req_workmode(queryParams).then(res => {
          if (res.results.status) {

          }
        })
      }
    }
  }
}
</script>
<style lang='scss'  scoped>
  @import "./css/index.scss";
</style>
