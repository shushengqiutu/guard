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
         @func="getExeStatus"
       >
       </device-status>
     </div>
      <div class="deviceItem">
        <device-status
          :imgUrl="batObj.batImgUrl"
          :status="batObj.batStatus"
          :name="batObj.name"
          @func="getBatStatus"
        >
        </device-status>
      </div>
      <div class="deviceItem">
        <device-status
          :imgUrl="vbsObj.vbsImgUrl"
          :status="vbsObj.vbsStatus"
          :name="vbsObj.name"
          @func="getVbsStatus"
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
    getExeStatus (val) {
      console.log(val + 'exe')
    },
    getBatStatus (val) {
      console.log(val + 'bat')
    },
    getVbsStatus (val) {
      console.log(val + 'vbs')
    }
  }
}
</script>
<style lang='scss'  scoped>
  @import "./css/index.scss";
</style>
