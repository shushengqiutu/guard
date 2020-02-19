<template>
  <div class="smartWarp">
    <div class="headerSty">
      <div class="leftCont">
        <div class="margin1">
          <img class="img1"
               src="@/assets/img/public/1@2x.png" />
        </div>
        <div class="content">
          <div class="margin2"><span class="largText">214</span>天</div>
          <div class="textSty">实时保护您的电脑</div>
          <div class="textSty">上次扫描：2019-10-23 12:00:00</div>
        </div>
      </div>
      <div class="rightCont">
        <div class="margin3">
          <img class="img1"
               src="@/assets/img/public/2@2x.png" />
        </div>
        <div class="content">
          <div class="margin4"><span class="largText">214</span>条</div>
          <div class="textSty">已发现威胁事件</div>
          <div class="textSty">安全等级：中</div>
        </div>
      </div>
    </div>
    <div class="scanCont">
      <div class="scanAll"
           @click="jumpRouter({name:'scaning',params:{scanType:'all'}})">
        全盘扫描
      </div>
      <div class="targetScan">
        <span style=" cursor: pointer;" @click="jumpRouter({name:'scaning',params:{scanType:'target'}})">
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
      targetPath: 'd://dkdk/'
    }
  },
  methods: {
    jumpRouter (searchObj) {
      if (searchObj.scanType === 'target') {
        searchObj.params.targetPath = this.targetPath
      }
      this.$router.push(searchObj)
    }
  },
  created () {
    if (localStorage.getItem('policyId')) {
      this.$router.push({name: 'scaning', params: {scanType: 'all'}})
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
