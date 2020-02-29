<template>
  <div class="appProtect">
    <div class="headText">
      应用防护设置
    </div>
    <div class="device">
      <div class="deviceItem">
       <device-status
         :imgUrl="exeObj.exeImgUrl"
         :status="exeObj.exeStatus"
         :name="exeObj.name"
         @func="setExeStatus"
       >
       </device-status>
     </div>
      <div class="deviceItem">
        <device-status
          :imgUrl="batObj.batImgUrl"
          :status="batObj.batStatus"
          :name="batObj.name"
          @func="setBatStatus"
        >
        </device-status>
      </div>
      <div class="deviceItem">
        <device-status
          :imgUrl="vbsObj.vbsImgUrl"
          :status="vbsObj.vbsStatus"
          :name="vbsObj.name"
          @func="setVbsStatus"
        >
        </device-status>
      </div>
    </div>
  </div>
</template>
<script>
import deviceStatus from '@/component/deviceStatus/index.vue'
import exeImgUrl from '@/assets/img/public/exe@2x.png'
import batImgUrl from '@/assets/img/public/bat@2x.png'
import vbsImgUrl from '@/assets/img/public/vbs@2x.png'
// eslint-disable-next-line
import {req_getConfig,req_sysConfig} from '@/api'
export default {
  name: 'usbScanSet',
  components: {
    deviceStatus
  },
  data () {
    return {
      exeObj: {
        exeImgUrl: exeImgUrl,
        exeStatus: false, // 进入页面请求后台返回开关状态
        name: 'exe'
      },
      batObj: {
        batImgUrl: batImgUrl,
        batStatus: false, // 进入页面请求后台返回开关状态
        name: 'bat'
      },
      vbsObj: {
        vbsImgUrl: vbsImgUrl,
        vbsStatus: false, // 进入页面请求后台返回开关状态
        name: 'vbs'
      }
    }
  },
  methods: {
    // 获取系统参数配置
    getConfig () {
      let that = this
      let key = ['app_def_exe', 'app_def_bat', 'app_def_vbs']
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
          if (res.results.config.key === 'app_def_exe') {
            that.exeObj.exeStatus = res.results.config.value !== '0'
          } else if (res.results.config.key === 'app_def_bat') {
            that.batObj.batStatus = res.results.config.value !== '0'
          } else {
            that.vbsObj.vbsStatus = res.results.config.value !== '0'
          }
        })
      }
    },
    setExeStatus (val) {
      let data = [{
        'key': 'app_def_exe',
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
    },
    setBatStatus (val) {
      let data = [{
        'key': 'app_def_bat',
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
    },
    setVbsStatus (val) {
      let data = [{
        'key': 'app_def_vbs',
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
