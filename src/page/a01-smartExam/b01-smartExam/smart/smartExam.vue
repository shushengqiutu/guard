<template>
  <div class="smartWarp">
    <div class="headerSty">
      <div class="leftCont">
        <div style="margin-left: 20px;margin-right: 10px;">
          <img class="img1"
               src="@/assets/img/public/1@2x.png" />
        </div>
        <div class="content">
          <div style="margin-top: 20px;margin-left: 10px"><span class="largText">214</span>天</div>
          <div class="textSty">实时保护您的电脑</div>
          <div class="textSty">上次扫描：2019-10-23 12:00:00</div>
        </div>
      </div>
      <div class="rightCont">
        <div style="margin-right: 10px;">
          <img class="img1"
               src="@/assets/img/public/2@2x.png" />
        </div>
        <div class="content">
          <div style="margin-top: 20px;margin-left: 10px"><span class="largText">214</span>条</div>
          <div class="textSty">已发现威胁事件</div>
          <div class="textSty">安全等级：中</div>
        </div>
      </div>
    </div>
    <div class="scanCont">
      <div class="scanAll"
           @click="jumpRouter('scaning')">
        全盘扫描
      </div>
      <div class="targetScan">
        <span style=" cursor: pointer;">
          指定目录扫描
        </span>
      </div>
    </div>
    <div class="endSty">
      <div style="flex: 4"></div>
      <div class="avgFlex">
        <div class="ItemFlex">
          <img class="img3"
               src="@/assets/img/public/客户端@2x.png" />
        </div>
        <div class="ItemFlex">
          <img class="img3"
               src="@/assets/img/public/审计@2x.png" />
        </div>
        <div class="ItemFlex">
          <img class="img3"
               src="@/assets/img/public/策略@2x.png" />
        </div>
        <div class="ItemFlex">
          <img class="img3"
               src="@/assets/img/public/ITM@2x.png" />
        </div>
      </div>
    </div>
    <div class="endSty"
         style="margin-top: 5px">
      <div style="flex: 4"></div>
      <div class="avgFlex">
        <div class="ItemFlex">
          客户端正常
        </div>
        <div class="ItemFlex">
          模式保护
        </div>
        <div class="ItemFlex">
          XJ-205668885
        </div>
        <div class="ItemFlex">
          在线
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
  },
  methods: {
    jumpRouter (name) {
      debugger
      this.$router.push({ name: name })
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
.headerSty {
  display: flex;
  padding-top: 83px;
}
.leftCont {
  flex: 5.5;
  display: flex;
}
.rightCont {
  flex: 4.5;
  display: flex;
}
.img1 {
  width: 127px;
  height: 127px;
}
.largText {
  font-size: 26px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.content {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.scanCont {
  margin-top: 95px;
  display: flex;
}
.scanAll {
  justify-content: center;
  display: flex;
  width: 230px;
  height: 55px;
  margin-left: 230px;
  line-height: 55px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(195, 58, 35, 1);
  cursor: pointer;
}
.targetScan {
  height: 55px;
  width: 96px;
  line-height: 55px;
  margin-left: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.textSty {
  margin: 10px;
}
.endSty {
  display: flex;
  justify-content: flex-end;
  justify-items: center;
  margin-top: 107px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.img3 {
  width: 48px;

  height: 48px;
  cursor: pointer;
}
.avgFlex {
  display: flex;
  flex: 6;
  justify-content: center;
  text-align: center;
}
.ItemFlex {
  flex: 1;
}
</style>
