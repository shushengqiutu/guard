<template>
  <div class="smartWarp">
   <div style="margin-top: 160px">
     <div class="leftCont">
       <div class="img1">
          图片
      </div>
       <div class="content">
          <div>214天</div>
          <div>实时保护您的电脑</div>
          <div>上次扫描：2019-10-23 12:00:00</div>
       </div>
     </div>
     <div class="rightCont">
       <div class="img1">
         图片
       </div>
       <div class="content">
         <div>214条</div>
         <div>已发现威胁事件</div>
         <div>安全等级：中</div>
       </div>
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
  .leftCont{
    width: 55%;
    display: inline-block
  }
  .rightCont{
    width: 44%;
    display: inline-block
  }
  .img1{
    width:127px;
    height:127px;
    display: inline-block;
    margin-left: 20px;
  }
  .content{
    display: inline-block;
  }
</style>
