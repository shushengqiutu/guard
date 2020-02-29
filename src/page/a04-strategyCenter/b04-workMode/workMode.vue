<template>
  <div class="workmode">
    <open-one :firstObj="firstObj"
              :secondObj="secondObj"
              :title="title"
              @changeFirstStatus="protectMode"
              @changeSecondStatus="auditMode"></open-one>
    <show-tipmsg :tipmsg="tipmsg">
    </show-tipmsg>
  </div>
</template>
<script>
// eslint-disable-next-line camelcase
import { req_workmode, req_programStatus} from '@/api'
import openOne from '@/component/openOne/index.vue'
import protectImgUrl from '@/assets/img/public/审计@2x(2).png'
import auditImgUrl from '@/assets/img/public/图层 13 拷贝@2x.png'
import showTipmsg from '@/component/showTipmsg/'
import { workModeTip } from '@/component/showTipmsg/lang/zh-module.js'
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
        status: false,
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
    // 获取客户端状态信息
    getProgramStatus () {
      let data = {
        'cmdlist': [{
          'cmd': 132400,
          'ncmd': '客户端状态'
        }]
      }
      req_programStatus(data).then(res => {
        if (res.results.status) {
          if (res.results.work_mode === 1) {
            this.firstObj.status = true // 当前工作模式（ 0 审计，1 保护）
            this.secondObj.status = false
          } else {
            this.firstObj.status = false
            this.secondObj.status = true
          }
        }
      })
    },
    // 保护模式
    protectMode (val) {
      if (!val) {
        this.secondObj.status = true
        let queryParams = {
          cmdlist: [{
            'cmd': 132865,
            'ncmd': 'SwitchOperatingMode',
            'data': {
              'mode': 0 // 0 审计，1 保护
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
              'mode': 1 // 0 保护，1 审计
            }
          }]
        }
        req_workmode(queryParams).then(res => {
          if (res.results.status) {

          }
        })
      }
    }
  },
  created () {
    this.getProgramStatus()
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
