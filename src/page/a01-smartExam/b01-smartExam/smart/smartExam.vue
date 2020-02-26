<template>
  <div class="smartWarp">
    <div class="headerSty">
      <div class="flexCont">
        <div>
          <img class="img1"
               src="@/assets/img/public/1@2x.png" />
        </div>
        <div class="content">
          <div><span class="largText">安全防护</span></div>
          <div class="textSty marginSty">
            保护系统安全运行<span class="largText">{{programObj.day}}</span>天
          </div>
          <div class="textSty">应用防护:{{programObj.appStatus}}</div>
          <div class="textSty">外设防护：{{programObj.peripherals}}</div>
          <div class="textSty">网络防护：{{programObj.net}}</div>
          <div class="textSty">目录防护：{{programObj.dircetory}}</div>
        </div>
      </div>
      <div class="flexCont">
        <div class="margin1">
          <img class="img1"
               src="@/assets/img/public/策略@2x.png" />
        </div>
        <div class="content">
          <div><span class="largText">审计模式</span></div>
          <div class="textSty marginSty">
            消除潜在威胁
          </div>
          <div class="textSty">当前策略:{{programObj.policy}}</div>
          <div class="textSty">系统服务：{{programObj.sysStatus}}</div>
          <div class="textSty">集群服务：{{programObj.ip}}</div>
        </div>
      </div>
      <div class="flexCont">
        <div>
          <img class="img1"
               src="@/assets/img/public/2@2x.png" />
        </div>
        <div class="content">
          <div><span class="largText">安全事件</span></div>
          <div class="textSty marginSty">
            威胁回溯分析
          </div>
          <div class="textSty">今日安全:{{homeObj.weekCount}}条</div>
          <div class="textSty">本周安全：{{homeObj.dayEventCount}}</div>
          <div class="textSty">今日威胁：{{homeObj.dayThreatCount}}次</div>
        </div>
      </div>
    </div>
    <div class="scanCont">
      <div class="scanAll"
           @click="jumpRouter({name:'scaning',params:{scanType:'all'}})">
        全盘扫描
      </div>
      <div class="targetScan">
        <span style=" cursor: pointer;" @click="chooseFile">
          指定目录扫描
        </span>
      </div>
    </div>
    <choose-path :drawer="drawer" @changeDrawer="changeDrawer">
    </choose-path>
  </div>
</template>
<script>
import choosePath from '@/component/choosePath/'
import {req_homeStatus, req_programStatus} from '@/api'
export default {
  name: 'user',
  components: {
    choosePath
  },
  data () {
    return {
      drawer: false,
      programObj: {
        day: '',
        appStatus: '',
        peripherals: '',
        net: '',
        dircetory: '',
        policy: '',
        sysStatus: '',
        ip: '',
        clusterStatus: null
      },
      homeObj: {
        weekCount: 0,
        dayEventCount: 0,
        dayThreatCount: 0
      }
    }
  },
  methods: {
    // 获取首页状态信息
    getHomeStatus () {
      let data = {'cmdlist': [{
        'cmd': 132373,
        'ncmd': '首页状态'
      }]}
      req_homeStatus(data).then(res => {
        if (res.results.status) {
          this.homeObj.weekCount = res.results.week_event_count // 本周安全事件数
          this.homeObj.dayEventCount = res.results.day_event_count // 今日安全事件数
          this.homeObj.dayThreatCount = res.results.day_threat_count // 今日威胁事件数
        }
      })
    },
    // 获取客户端状态信息
    getProgramStatus () {
      let data = {'cmdlist': [{
        'cmd': 132400,
        'ncmd': '客户端状态'
      }]}
      req_programStatus(data).then(res => {
        if (res.results.status) {
          let resultData = res.results
          this.programObj.day = (resultData.start_time / 3600).toFixed(2) // 返回服务启动经过时间
          this.programObj.appStatus = resultData.app_def ? '运行' : '停止' // 应用防护（0-停止，1-运行）
          this.programObj.peripherals = resultData.peripheral_def ? '运行' : '停止' // 外设防护（0-停止，1-运行）
          this.programObj.net = resultData.net_def ? '运行' : '停止' // 网络防护（0-停止，1-运行）
          this.programObj.dircetory = resultData.dir_def ? '运行' : '停止' // 目录防护（0-停止，1-运行）
          this.programObj.sysStatus = resultData.drive ? '正常' : '异常' // 驱动运行状态，检测是否正常
          this.programObj.policy = resultData.policy_name // 当前策略
          this.programObj.clusterStatus = resultData.cluster_service ? '正常' : '异常' // 集群服务
        }
      })
    },
    changeDrawer (v) {
      this.drawer = v
    },
    // 打开树形结构,选择指定目录
    chooseFile () {
      this.drawer = true
    },
    // 跳转到下一个扫描中页面
    jumpRouter (searchObj) {
      this.$router.push(searchObj)
    }
  },
  created () {
    this.getHomeStatus()
    this.getProgramStatus()
    if (localStorage.getItem('policyId')) {
      this.$router.push({name: 'scaning', params: {scanType: 'all'}})
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
