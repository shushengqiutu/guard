<template>
  <div class="workmode">
    <div class="headText">
      工作模式
    </div>
    <div class="device">
      <div class="deviceItem1">
        <device-status
          :imgUrl="protectObj.protectImgUrl"
          :status="protectObj.protectStatus"
          :name="protectObj.name"
          @func="getProtectStatus"
        >
        </device-status>
      </div>
      <div class="deviceItem2">
        <device-status
          :imgUrl="auditObj.auditImgUrl"
          :status="auditObj.auditStatus"
          :name="auditObj.name"
          @func="getAuditObjStatus"
        >
        </device-status>
      </div>
    </div>
  </div>
</template>
<script>
import deviceStatus from '@/component/deviceStatus/index.vue'
import protectImgUrl from '@/assets/img/public/审计@2x(2).png'
import auditImgUrl from '@/assets/img/public/图层 13 拷贝@2x.png'
export default {
  name: 'workMode',
  components: {
    deviceStatus
  },
  data () {
    return {
      protectObj: {
        protectImgUrl: protectImgUrl,
        protectStatus: false,
        name: '保护模式'
      },
      auditObj: {
        auditImgUrl: auditImgUrl,
        auditStatus: false, // 进入页面请求后台返回开关状态
        name: '审计模式'
      }
    }
  },
  methods: {
    getProtectStatus (val) {
      console.log(val)
    },
    getAuditObjStatus (val) {
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
