<template>
  <div class="usbScanSet">
    <div class="headText">
      U盘扫描设置
    </div>
    <div class="device">
      <device-status
        :imgUrl="imgUrl"
        :status="status"
        @func="getStatus"
      >
      </device-status>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import {req_getConfig,req_sysConfig} from '@/api'
import deviceStatus from '@/component/deviceStatus/index.vue'
import imgUrl from '@/assets/img/public/USB3@2x.png'
export default {
  name: 'usbScanSet',
  components: {
    deviceStatus
  },
  data () {
    return {
      imgUrl: imgUrl,
      status: false // 进入页面请求后台返回开关状态
    }
  },
  methods: {
    // 获取系统参数配置
    getConfig () {
      let that = this
      let key = ['scan_usb']
      for (let i = 0; i < key.length; i++) {
        let params = {
          cmdlist: [{
            'cmd': 132372,
            'ncmd': 'getSystemConfig',
            'data': {
              'key': key[i] // 根据key获取配置值
            }
          }]
        }
        req_getConfig(params).then(res => {
          if (res.results.config.key === 'scan_usb') {
            that.status = res.results.config.value !== '0'
          }
        })
      }
    },
    getStatus (val) {
      let data = [{
        'key': 'scan_usb',
        'value': val ? '1' : '0'
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
