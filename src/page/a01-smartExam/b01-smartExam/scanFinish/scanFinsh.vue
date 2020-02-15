<template>
  <div class="scanFinish">
    <div class="headerSty" style="padding-top: 23px;">
      <div class="img1">
        <img class="img1" src="@/assets/img/public/完成@2x.png"/>
      </div>
    </div>
    <div class="headerSty" style="margin-top: 15px">
      <div class="scanText">
        扫描完成
      </div>
    </div>
    <div class="contentSty" style="margin-top: 40px">
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
    <div class="contentSty contText baseText" style="margin-top: 14px">
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
.headerSty{
  display: flex;
  justify-content:center;
  flex: 1;
}
  .img1{
    width: 78px;
    height: 78px;
  }
  .scanText{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:200;
    color:rgba(255,255,255,1);
  }
  .contentSty{
    display: flex;
  }
  .flexImg{
    display: flex;
    justify-content: center;
    flex: 1;
    line-height: 16px;
  }
  .img2{
    width: 81px;
    height: 97px;
  }
  .baseText{
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .contText{
    font-size:12px;
  }
  .resultText{
    font-size:14px;
    margin-top: 11px;
  }
  .iconSty{
    width:16px;
    height:16px;
    margin-right: 5px
  }
  .endSty{
    display: flex;
    justify-content: center;
    margin-top: 70px;
  }
  .searchDetail{
    width:175px;
    height:40px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    font-size:20px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(195,58,35,1);
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
</style>
