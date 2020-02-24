<template>
  <div class="peripheralProtect">
   <open-one
     :firstObj="firstObj"
     :secondObj="secondObj"
     :title="title"
     @changeFirstStatus="usbStore"
     @changeSecondStatus="unusbStore"
   ></open-one>
    <show-tipmsg :tipmsg="tipmsg">
    </show-tipmsg>
  </div>
</template>
<script>
import openOne from '@/component/openOne/index.vue'
import usbImgUrl from '@/assets/img/public/USB3@2x.png'
import unusbImgUrl from '@/assets/img/public/关闭USB@2x.png'
import showTipmsg from '@/component/showTipmsg/'
import {defendCfg} from '@/component/showTipmsg/lang/zh-module.js'
export default {
  name: 'peripheraProtect',
  components: {
    openOne,
    showTipmsg
  },
  data () {
    return {
      tipmsg: defendCfg.replace(/\n/g, ' <br>'),
      title: '外设防护',
      firstObj: {
        imgUrl: usbImgUrl,
        status: false,
        name: 'USB存储'
      },
      secondObj: {
        imgUrl: unusbImgUrl,
        status: false, // 进入页面请求后台返回开关状态
        name: '非USB存储'
      }
    }
  },
  methods: {
    // usb存储
    usbStore (val) {

    },
    // 非usb存储
    unusbStore (val) {

    }
  }
}
</script>
<style lang='scss'  scoped>
  @import "./css/index.scss";

</style>
