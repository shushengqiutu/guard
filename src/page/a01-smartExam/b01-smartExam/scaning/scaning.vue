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
      <div class="scanText" :title="scanPath">
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
    <div class="stopScan" @click="stopScan">
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
      // 普通的watch监听
      console.log('进watch了' + val)
    }
  },
  methods: {
    // 开始扫描
    startScan () {
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
          this.policyID = res.results.policyID
        }
      })
    },
    // 停止扫描
    async stopScan () {
      localStorage.removeItem('policyId')
      let data = {'cmdlist': [{
        'cmd': 132098,
        'ncmd': 'WhiteListStopScan',
        'data': {
          'policyID': this.policyID,
          'issave': false
        }
      }]}
      await req_stopScan(data).then(res => {

      })
    },
    // 判断扫描类型
    scanType () {
      // 判断扫描类型
      let data = JSON.parse(localStorage.getItem('websocketObj'))
      if (data.cmd === 133377) { // 文件扫描
        this.scanPath = data.results.path
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
