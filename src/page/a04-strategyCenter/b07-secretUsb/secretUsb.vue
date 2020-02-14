<template>
  <div class="usbScanSet">
    <div class="device">
      <device-status
        :imgUrl="imgUrl"
        :requestUrl = 'requestUrl'
        :status="status"
        :readStatus="readStatus"
      >
      </device-status>
    </div>
  </div>
</template>
<script>
import deviceStatus from '@/component/deviceStatus/index.vue'
import imgUrl from '@/assets/img/public/USB3@2x.png'
export default {
  name: 'secreUsb',
  components: {
    deviceStatus
  },
  data () {
    return {
      imgUrl: imgUrl,
      requestUrl: '待请求的接口', // 请求开关接口地址
      status: false, // 进入页面请求后台返回开关状态
      readStatus: 1
    }
  }
}
</script>
<style lang='scss'  scoped>
  @import "./css/index.scss";
  .device{
    padding-top: 134px;
    display: flex;
    justify-content: center;
  }
</style>
