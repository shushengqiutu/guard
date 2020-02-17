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
    getStatus (val) {
      alert(val)
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
