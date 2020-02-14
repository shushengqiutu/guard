<template>
  <div class="peripheralProtect">
    <div class="headText">
      外设防护
    </div>
    <div class="device">
     <div class="deviceItem1">
       <device-status
         :imgUrl="usbStore.usbImgUrl"
         :status="usbStore.usbStatus"
         :name="usbStore.name"
         @func="getUsbStoreStatus"
       >
       </device-status>
     </div>
      <div class="deviceItem2">
        <device-status
          :imgUrl="unusbObj.unusbImgUrl"
          :status="unusbObj.unusbStatus"
          :name="unusbObj.name"
          @func="getUnusbsbStoreStatus"
        >
        </device-status>
      </div>
    </div>
  </div>
</template>
<script>
import deviceStatus from '@/component/deviceStatus/index.vue'
import usbImgUrl from '@/assets/img/public/USB3@2x.png'
import unusbImgUrl from '@/assets/img/public/关闭USB@2x.png'
export default {
  name: 'peripheraProtect',
  components: {
    deviceStatus
  },
  data () {
    return {
      usbStore: {
        usbImgUrl: usbImgUrl,
        usbStatus: false,
        name: 'USB存储'
      },
      unusbObj: {
        unusbImgUrl: unusbImgUrl,
        unusbStatus: false, // 进入页面请求后台返回开关状态
        name: '非USB存储'
      }
    }
  },
  methods: {
    getUsbStoreStatus (val) {
      console.log(val)
    },
    getUnusbsbStoreStatus (val) {
      console.log(val)
    }
  }
}
</script>
<style lang='scss'  scoped>
  @import "./css/index.scss";
  .headText{
    padding-top: 94px;
    margin-left: 42px;
    font-size:20px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .device{
    margin-top: 21px;
    display: flex;
  }
  .deviceItem1{
   margin-left: 143px;
  }
  .deviceItem2{
    margin-left: 105px;
  }
</style>
