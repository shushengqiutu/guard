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
// eslint-disable-next-line
import {req_getConfig,req_sysConfig,req_workmode} from '@/api'
import openOne from '@/component/openOne/index.vue'
import protectImgUrl from '@/assets/img/public/baohu.png'
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
        name: '保护模式',
        startTime: ''
      },
      secondObj: {
        imgUrl: auditImgUrl,
        status: true, // 进入页面请求后台返回开关状态
        name: '审计模式'
      }
    }
  },
  methods: {
    subTime () {
      let data = [{
        'key': 'modetime',
        'value': this.dateFormat('YYYY-mm-dd HH:MM', new Date())
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
          this.getConfig()
        }
      })
    },
    // 时间格式化函数
    dateFormat (fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
      };
      return fmt
    },
    // 获取系统参数配置
    getConfig () {
      let keyArr = [{
        key: 'work_mode'
      }, {
        key: 'modetime'
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
          let resData = res.results.list
          for (let i = 0; i < resData.length; i++) {
            if (resData[i].key === 'work_mode') {
              this.firstObj.status = resData[i].value === '1'
            }
            if (resData[i].key === 'modetime') {
              this.firstObj.startTime = resData[i].value
            }
          }
        }
      })
    },
    // 保护模式
    protectMode (val) {
      let queryParams = {
        cmdlist: [{
          'cmd': 132865,
          'ncmd': 'SwitchOperatingMode',
          'data': {
            'mode': val ? 1 : 0// 0 审计，1 保护
          }
        }]
      }
      req_workmode(queryParams).then(res => {
        if (res.results.status) {
          this.$msg({
            message: '配置成功',
            type: 'success'
          })
        }
      })
      this.subTime()
    },
    // 审计模式
    auditMode (val) {

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
