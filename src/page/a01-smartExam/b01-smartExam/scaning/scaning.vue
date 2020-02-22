<template>
  <div class="scaning">
    <div class="headerSty">
      <img class="imgSty"
           src="@/assets/img/public/鉴定@2x.png" />
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
  req_scanFile,
  req_stopScan,
  req_scanStatus
} from '@/api'
export default {
  name: 'user',
  data () {
    return {
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
    scanPath (val, oldVal) {

    },
    scanProgress (val, oldVal) {
      // 普通的watch监听
      console.log('进watch了' + val)
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
        that.scanType(JSON.parse(res.data))
        console.log('收到服务器内容', res.data)
      }
    },
    // 开始扫描
    startScan () {
      let that = this
      if (!localStorage.getItem('policyId')) {
        let queryObj = this.$route.params
        let scanPath = []
        if (queryObj.scanType === 'target') {
          scanPath = queryObj.path
        } else {
          scanPath = ['//']
        }
        // 开始扫描
        req_scanFile({
          'cmdlist': [{
            'cmd': 132097,
            'data': {
              'path': scanPath
            },
            'usb': 1,
            'net': 1,
            'ncmd': 'WhileListStartScan'
          }]
        }).then(res => {
          if (res.results.status) {
            localStorage.setItem('policyId', res.results.policyID)
            that.policyID = res.results.policyID
          }
        })
      }
    },
    // 停止扫描
    stopScan () {
      this.$confirm({
        type: '提示',
        msg: '是否停止扫描？',
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(() => {
        this.policyID = parseInt(localStorage.getItem('policyId'))
        let data = {'cmdlist': [{
          'cmd': 132098,
          'ncmd': 'WhiteListStopScan',
          'data': {
            'policyID': this.policyID,
            'issave': false
          }
        }]}
        req_stopScan(data).then(res => {
          if (res.results.status) {
            let scanResult = {
              whiteListCount: this.whiteListCount, // 白名单文件数量
              usbCount: this.usbCount, // USB数量
              netCount: this.netCount // 网卡数量
            }
            localStorage.removeItem('policyId')
            this.$router.push({name: 'scanFinish', params: scanResult})
          }
        })
      })
        .catch(() => {
          console.log('no')
        })
    },
    // 判断扫描类型
    scanType (data) {
      // 判断扫描类型
      if (data.cmd === 133377) { // 文件扫描
        this.scanPath = data.results.name
        this.scanProgress = data.results.progress
        this.whiteListCount = data.results.executor
      } else if (data.cmd === 133378) { // USB扫描
        this.usbCount = data.results.total
      } else if (data.cmd === 133379) { // 网卡扫描
        this.netCount = data.results.total
      }
    }
  },
  created () {
    this.startScan()
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
