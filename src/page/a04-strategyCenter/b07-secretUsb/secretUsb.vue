<template>
  <div class="usbScanSet">
    <div class="headText">
      安全U盘设置
    </div>
    <div class="device">
      <device-status
        :imgUrl="secUbs.secUbsImgUrl"
        :status="secUbs.secUbsStatus"
        :name="secUbs.name"
        @func="getStatus"
      >
      </device-status>
    </div>
    <div class="scanTypeSty">
      <div  style="margin-top: 20px">
        <el-radio v-model="readStatus" label="1">设为只读</el-radio>
      </div>
    </div>
    <div class="scanTypeSty">
      <div  style="margin-top: 10px">
        <el-radio v-model="readStatus" label="2">设为读写</el-radio>
      </div>
    </div>
  </div>
</template>
<script>
import deviceStatus from '@/component/deviceStatus/index.vue'
import secUbsImgUrl from '@/assets/img/public/锁定@2x.png'
export default {
  name: 'secreUsb',
  components: {
    deviceStatus
  },
  data () {
    return {
      secUbs: {
        secUbsImgUrl: secUbsImgUrl,
        secUbsStatus: false,
        name: '安全U盘'
      },
      readStatus: '1'
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
    justify-content: center;
  }
  .scanTypeSty{
    display: flex;
    justify-content:center;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1) !important;
    text-align: center;
  }
  >>>.el-radio__label{
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1) !important;
    width: 175px;
    text-align: center;
  }
</style>
