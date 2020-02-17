<template>
  <div class="scanFinish">
    <div class="headerSty margin1">
      <div class="img1">
        <img class="img1" src="@/assets/img/public/完成@2x.png"/>
      </div>
    </div>
    <div class="headerSty margin2">
      <div class="scanText">
        扫描完成
      </div>
    </div>
    <div class="contentSty margin3">
      <div class="flexImg">
        <img class="img2" src="@/assets/img/public/应用程序@2x.png"/>
      </div>
      <div class="flexImg">
        <img class="img2" src="@/assets/img/public/网口@2x.png"/>
      </div>
      <div class="flexImg">
        <img class="img2" src="@/assets/img/public/USB@2x.png"/>
      </div>
    </div>
    <div class="contentSty contText baseText margin4">
      <div class="flexImg">
        <img class="iconSty" src="@/assets/img/public/组 18@2x.png"/>扫描系统应用程序
      </div>
      <div class="flexImg">
        <img class="iconSty" src="@/assets/img/public/组 18@2x.png"/>扫描网卡
      </div>
      <div class="flexImg">
        <img class="iconSty" src="@/assets/img/public/组 18@2x.png"/>扫描USB
      </div>
    </div>
    <div class="contentSty resultText baseText">
      <div class="flexImg">
        白名单数量：10032
      </div>
      <div class="flexImg">
        网卡个数：1
      </div>
      <div class="flexImg">
        USB数量：5
      </div>
    </div>
    <div class="endSty">
      <div class="searchDetail">
        查看详情
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scanFinish',
  data () {
    return {

    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
