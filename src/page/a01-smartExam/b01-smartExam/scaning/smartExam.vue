<template>
  <div class="smartWarp">
   <div class="headerSty">
     <div>
       放大镜图片
     </div>
   </div>
    <div class="headScanText">
      <div>
        正在进行扫描网卡
      </div>
    </div>
    <div class="headScanText" style="margin-top: 28px">
      <div class="scanText">
        C:\User\dcjk\dd\c\s\c\s\e\c\\s
      </div>
    </div>
    <div class="headScanText" style="margin-top: 18px">
      <div style="width: 98%">
        <el-progress :percentage="50" :color="color"></el-progress>
      </div>
    </div>
    <div class="bodyScanText" style="margin-top: 25px">
      <div class="bodyText">
        <div class="iconImg">
          图
        </div>
        <div>
          白名单文件数量:4826
        </div>
      </div>
    </div>
    <div class="bodyScanText">
      <div class="bodyText">
        <div class="iconImg">
         图
        </div>
        <div>
          USB数量：5
        </div>
      </div>
    </div>
    <div class="bodyScanText">
      <div class="bodyText">
        <div class="iconImg">
          图
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
>>> .el-progress-bar__outer{
  height: 4px !important;
}
>>>.el-progress-bar__outer{
  background: grey;
}
 .headerSty{
   margin-top: 30px;
   display: flex;
   justify-content: space-around;
   height: 60px;
 }
  .headerImg{
    width: 60px;
  }
  .headScanText{
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .scanText{
    width: 470px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .bodyText{
    width: 470px;
    display: flex;
  }
  .iconImg{
    width: 20px;
    height: 20px;
    margin-right:10px ;
  }
  .bodyScanText{
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .stopScan{
    margin-top: 62px;
    display: flex;
    justify-content: space-around;
  }
  .stopScanText{
    width:175px;
    height:40px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    font-size:20px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(195,58,35,1);
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
</style>
