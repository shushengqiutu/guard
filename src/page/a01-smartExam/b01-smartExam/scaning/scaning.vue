<template>
  <div class="scaning"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="headerSty">
      <div class="radar"></div>
    </div>
    <div class="headScanText">
      <div>
        {{scanName}}
      </div>
    </div>
    <div class="headScanText margin1">
      <div class="scanText"
           :title="scanPath">
        {{scanPath}}
      </div>
    </div>
    <div class="headScanText margin2">
      <div class="margin3">
        <el-progress :percentage="scanProgress"
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
          白名单文件数量:{{whiteListCount}}
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
          USB数量：{{usbCount}}
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
          网卡个数：{{netCount}}
        </div>
      </div>
    </div>
    <div class="stopScan"
         @click="stopScan">
      <div class="stopScanText">
        <span>停止扫描</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  // eslint-disable-next-line camelcase
  req_stopScan, req_scanStatus
} from '@/api'
export default {
  name: 'user',
  data () {
    return {
      loading: false,
      socket: '',
      color: 'white',
      policyID: '',
      scanName: '',
      scanPath: '', // 扫描的路径
      scanProgress: 0, // 扫描进度
      whiteListCount: 0, // 白名单文件数量
      usbCount: 0, // USB数量
      netCount: 0 // 网卡数据
    }
  },
  watch: {
    $route (to, from) {
      console.log(to, from, 88)
    },
    scanPath (val, oldVal) {

    },
    scanProgress (val, oldVal) {
      // 普通的watch监听
      if (val === 100) {
        this.$router.push({
          name: 'scanFinish'
        })
      }
    }
  },
  methods: {
    handdleMsg () {
      let that = this
      console.log(that.global.ws)
      if (that.global.ws && that.global.ws.readyState === 1) {
        console.log('发送信息')
      }
      that.global.ws.onmessage = function (res) {
        that.loading = false
        that.scanType(JSON.parse(res.data))
      }
    },
    getPolicyID () {
      this.policyID = parseInt(localStorage.getItem('policyId'))
    },
    // 停止扫描
    stopScan () {
      this.$confirm({
        type: '提示',
        msg: '停止扫描并保存数据？',
        btn: {
          ok: '保存',
          no: '不保存'
        }
      }).then((res) => {
        // req_stopScan(data).then(res => {
        //   if (res.results.status) {
        //     let scanResult = {
        //       whiteListCount: this.whiteListCount, // 白名单文件数量
        //       usbCount: this.usbCount, // USB数量
        //       netCount: this.netCount // 网卡数量
        //     }
        //     localStorage.removeItem('policyId')
        //     this.$router.push({ name: 'scanFinish', params: scanResult })
        //   }
        // })
        this.sendStopScan(this.policyID, true).then((res) => {
          if (res.status) {
            // 执行成功 进度100% watch监听 保存结果 去完成页面
            localStorage.setItem('stop', true)
          }
        })
      })
        .catch(() => {
          this.sendStopScan(this.policyID, false).then((res) => {
            console.log(res)
            if (res.status) {
              // 执行成功 不保存 去首页
              localStorage.removeItem('policyId')
              this.$router.push({ name: 'smartExam' })
            }
          })
        })
    },
    async  sendStopScan (policyID, issave) {
      let result = await req_stopScan({
        policyID,
        issave
      })
      return result.results
    },
    // 判断扫描类型
    scanType (data) {
      // 判断扫描类型
      if (data.cmd === 133377) { // 文件扫描
        this.scanPath = data.results.name

        this.scanProgress = data.results.progress
        this.whiteListCount = data.results.pos
      } else if (data.cmd === 133378) { // USB扫描
        this.usbCount = data.results.total
      } else if (data.cmd === 133379) { // 网卡扫描
        this.netCount = data.results.total
      }
    },
    initPage () {
      // 后端请求当前有无在扫描任务 如果有判断状态 未完成进入扫描 完成进入完成页面
      /** ******************************目前前端保存id实现方案开始 后期接口实现更换*****************************/
      // 获取当前扫描的ID ID存在停在当前页面不做处理
      let policyId = localStorage.getItem('policyId')
      // id存在进行状态查询
      if (policyId) {
        this.getScanStatus(policyId).then((res) => {
          if (res) {
            this.$router.push({ name: 'scanFinish' })
          }

          console.log(res, 22)
        })
      }
      /** *****************************目前前端保存id实现方案结束********************************************** */
    },
    // 获取扫描状态
    async getScanStatus (id) {
      let policyID = parseInt(id)
      let result = await req_scanStatus({ policyID })

      if (result.results.progress === 100) {
        return true // 扫描中
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.initPage()
      console.log(vm, 88)
    })
  },
  created () {
    // this.startScan()
    this.getPolicyID()
    this.handdleMsg()
  },
  mounted () {

  },
  destroyed () {

  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
