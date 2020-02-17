<template>
  <div class="scaning">
    <div class="headerSty">
      <img class="imgSty"
           src="@/assets/img/public/鉴定@2x.png" />
    </div>
    <div class="headScanText">
      <div>
        正在进行扫描网卡
      </div>
    </div>
    <div class="headScanText margin1">
      <div class="scanText">
        C:\User\dcjk\dd\c\s\c\s\e\c\\s
      </div>
    </div>
    <div class="headScanText margin2">
      <div class="margin3">
        <el-progress :percentage="50"
                     :color="color"></el-progress>
      </div>
    </div>
    <div class="bodyScanText margin4">
      <div class="bodyText">
        <div>
          <img class="iconImg"
               src="@/assets/img/public/白名单@2x.png" />
        </div>
        <div>
          白名单文件数量:4826
        </div>
      </div>
    </div>
    <div class="bodyScanText">
      <div class="bodyText">
        <div>
          <img class="iconImg"
               src="@/assets/img/public/小usb@2x.png" />
        </div>
        <div>
          USB数量：5
        </div>
      </div>
    </div>
    <div class="bodyScanText">
      <div class="bodyText">
        <div>
          <img class="iconImg"
               src="@/assets/img/public/网卡管理@2x.png" />
        </div>
        <div>
          网卡个数：1
        </div>
      </div>
    </div>
    <div class="stopScan">
      <div class="stopScanText">
        <span>停止扫描</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'user',
  data () {
    return {
      color: 'white',
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
