/* eslint-disable camelcase */
<template>
  <div class="smartWarp">
    <div class="titleDes">
      <span class="titleCenter">为工业生产保驾护航</span><span class="protectDay">安全防护{{programObj.day}}天</span>
    </div>
    <div class="desSty">
      保护您的系统安全、稳定运行、及时运行扫描更新您的白名单策略
    </div>
    <div class="headerSty">
      <div class="flexCont">
        <div>
          <img class="img1"
               src="@/assets/img/public/安全防护-低@2x.png" />
        </div>
        <div class="content">
          <div><span class="largText">安全防护</span></div>
          <div class="textSty marginSty">
            保护系统安全运行
          </div>
          <div class="modeSty baseModeSty">
            <div>
              <div>应用防护 </div>
              <div class="defendMargin">外设防护 </div>
              <div class="defendMargin">网络防护 </div>
              <div>目录防护 </div>
            </div>
            <div>
              <div class="falseStatus" :class="{trueStatus:programObj.appStatus ==='运行'}">{{programObj.appStatus}}</div>
              <div class="falseStatus defendStatus" :class="{trueStatus:programObj.peripherals ==='运行'}">{{programObj.peripherals}}</div>
              <div class="falseStatus defendStatus" :class="{trueStatus:programObj.net ==='运行'}">{{programObj.net}}</div>
              <div class="falseStatus defendStatus" :class="{trueStatus:programObj.dircetory ==='运行'}">{{programObj.dircetory}}</div>
            </div>
          </div>
          </div>
      </div>
      <div class="flexCont">
        <div class="margin1">
          <img class="img1"
               src="@/assets/img/public/策略@2x.png" />
        </div>
        <div class="content">
          <div><span class="largText">{{programObj.workMode}}</span></div>
          <div class="textSty marginSty">
            消除潜在威胁
          </div>
          <div class="modeSty baseModeSty">
            <div>
              <div>当前策略</div>
              <div class="modeMargin">系统服务</div>
              <div>集群服务</div>
            </div>
            <div>
              <div class="textAlineSty">{{programObj.policy}}</div>
              <div class="modeMargin textAlineSty">{{programObj.sysStatus}}</div>
              <div class="textAlineSty clusterSty">{{programObj.itm}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flexCont">
        <div>
          <img class="img1"
               src="@/assets/img/public/安全事件-高@2x.png" />
        </div>
        <div class="content">
          <div><span class="largText">安全事件</span></div>
          <div class="textSty marginSty">
            威胁回溯分析
          </div>
          <div class="modeSty baseModeSty">
            <div>
              <div>今日事件</div>
              <div class="modeMargin">本周事件</div>
              <div>今日威胁</div>
            </div>
            <div>
              <div class="textAlineSty">
                <span class="countSty">{{homeObj.dayEventCount}}</span> 条
              </div>
              <div class="modeMargin textAlineSty">
                <span class="countSty">{{homeObj.weekCount}}</span> 条
              </div>
              <div class="textAlineSty"><span class="countSty">
                {{homeObj.dayThreatCount}}</span> <span style="line-height: 10px">次</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="scanCont">
      <div class="scanAll"
           @click="startAllScan">
        全盘扫描
      </div>
      <div class="targetScan">
        <span style=" cursor: pointer;"
              @click="chooseFile">
          指定目录扫描
        </span>
      </div>
    </div>
    <choose-path :drawer="drawer"
                 @changeDrawer="changeDrawer">
    </choose-path>
  </div>
</template>
<script>
import choosePath from '@/component/choosePath/'
import {
  // eslint-disable-next-line camelcase
  req_homeStatus, req_programStatus, req_scanFile, req_scanStatus
} from '@/api'

export default {
  name: 'user',
  components: {
    choosePath
  },
  data () {
    return {
      show: false,
      loading: false,
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
        clusterStatus: null,
        itm: '',
        workMode: ''
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
      let data = {
        'cmdlist': [{
          'cmd': 132373,
          'ncmd': '首页状态'
        }]
      }
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
      let data = {
        'cmdlist': [{
          'cmd': 132400,
          'ncmd': '客户端状态'
        }]
      }
      req_programStatus(data).then(res => {
        if (res.results.status) {
          let resultData = res.results
          this.programObj.day = (resultData.start_time / 86400).toFixed(2) // 返回服务启动经过时间
          this.programObj.appStatus = resultData.app_def ? '运行' : '停止' // 应用防护（0-停止，1-运行）
          this.programObj.peripherals = resultData.peripheral_def ? '运行' : '停止' // 外设防护（0-停止，1-运行）
          this.programObj.net = resultData.net_def ? '运行' : '停止' // 网络防护（0-停止，1-运行）
          this.programObj.dircetory = resultData.dir_def ? '运行' : '停止' // 目录防护（0-停止，1-运行）
          this.programObj.sysStatus = resultData.drive ? '正常' : '异常' // 驱动运行状态，检测是否正常
          this.programObj.policy = resultData.policy_name // 当前策略
          this.programObj.clusterStatus = resultData.cluster_service ? '正常' : '异常' // 集群服务
          this.programObj.itm = resultData.itm
          this.programObj.workMode = resultData.work_mode === 0 ? '审计模式' : '保护模式'
        }
      })
    },
    // 进入首页进行页面路由选择
    initPage () {
      // 后端请求当前有无在扫描任务 如果有判断状态 未完成进入扫描 完成进入完成页面
      /** ******************************目前前端保存id实现方案开始 后期接口实现更换*****************************/
      // 获取当前扫描的ID ID存在停在当前页面不做处理
      let policyId = localStorage.getItem('policyId')
      // id存在进行状态查询
      if (policyId) {
        this.$router.push({ name: 'scaning' })
      } else {
        this.show = true
      }
      /** *****************************目前前端保存id实现方案结束********************************************** */
    },
    // 获取扫描状态
    async getScanStatus (id) {
      let policyID = parseInt(id)
      let result = await req_scanStatus({ policyID })
      if (result.results.progress >= 0) {
        return true // 扫描中
      }
    },
    // 全盘扫描
    async  startAllScan () {
      // 检查是否有正在扫描任务 后期添加
      let scanPath = ['//']
      this.sendScan(scanPath).then(res => {
        if (res.policyID) {
          localStorage.setItem('policyId', res.policyID)
          this.$router.push({ name: 'scaning' })
        }
      })
    },
    // 执行扫描函数
    async sendScan (pathArr) {
      let result = await req_scanFile({
        path: pathArr

      })
      return result.results
    },
    changeDrawer (v) {
      this.drawer = v
    },
    // 打开树形结构,选择指定目录
    chooseFile () {
      // 检查是否有正在扫描任务 后期添加
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
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.initPage()
      console.log(vm, 88)
    })
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
