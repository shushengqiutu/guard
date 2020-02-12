<template>
  <div class="smartWarp">
    <div class="headerSty">
     <div class="leftCont">
       <div class="img1">
          图片
      </div>
       <div class="content">
          <div style="margin-top: 20px;margin-left: 10px">214天</div>
          <div class="textSty">实时保护您的电脑</div>
          <div class="textSty">上次扫描：2019-10-23 12:00:00</div>
       </div>
     </div>
     <div class="rightCont">
       <div class="img1">
         图片
       </div>
       <div class="content">
         <div style="margin-top: 20px;margin-left: 10px">214条</div>
         <div class="textSty">已发现威胁事件</div>
         <div class="textSty">安全等级：中</div>
       </div>
     </div>
   </div>
    <div style="margin-top: 95px">
      <div class="scanAll">
          全盘扫描
      </div>
    </div>
    <div class="endSty">
      <div class="endItem">
        客户端正常
      </div>
      <div class="endItem">
        模式保护
      </div>
      <div class="endItem">
        XJ2019
      </div>
      <div class="endItem" style="margin-right:30px">
          在线
        </div>
    </div>
    <div class="endSty" style="margin-top: 10px;text-align: center">
      <div class="endItemText4">
        客户端正常
      </div>
      <div class="endItemText3">
        模式保护
      </div>
      <div class="endItemText2">
        XJ2019005522
      </div>
      <div class="endItemText1">
        在线
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'user',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
.headerSty{
  display: flex;
  margin-top: 83px;
}
  .leftCont{
    flex: 6;
    display: flex;
  }
  .rightCont{
    flex: 4;
    display: flex;
  }
  .img1{
    width:127px;
    height:127px;
    margin-left: 20px;
  }
  .content{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .scanAll{
    justify-content:center;
    display: flex;
    margin: 0 auto;
    width:230px;
    height:55px;
    line-height: 55px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    font-size:30px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(195,58,35,1);
    cursor: pointer;
  }
  .textSty{
    margin: 10px;
  }
  .endSty{
    display: flex;
    justify-content:  flex-end;
    margin-top: 107px;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .endItem{
    width: 48px;
    height: 48px;
    margin-right: 60px;
    background: blue;
    cursor: pointer;
  }
  .endItemText1{
    width:60px;
    margin-right: 30px;
  }
.endItemText2{
  width:102px;
  margin-right: 21px;
}
.endItemText3{
  width:48px;
  margin-right: 32px;
}
.endItemText4{
  width:60px;
  margin-right: 55px;
}
</style>
