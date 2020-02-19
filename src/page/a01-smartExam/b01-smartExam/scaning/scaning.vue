<template>
  <div class="scaning">
    <div class="headerSty">
      <img class="imgSty"
           src="@/assets/img/public/鉴定@2x.png" />
    </div>
    <div class="headScanText">
      <div>
        {{scanResult.scanName}}
      </div>
    </div>
    <div class="headScanText margin1">
      <div class="scanText" :title="scanPath">
        {{scanPath}}
      </div>
    </div>
    <div class="headScanText margin2">
      <div class="margin3">
        <el-progress :percentage="scanResult.scanProgress"
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
          白名单文件数量:{{scanResult.whiteListCount}}
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
          USB数量：{{scanResult.usbCount}}
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
          网卡个数：{{scanResult.netCount}}
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
      path: 'ws://127.0.0.1:8000',
      socket: '',
      color: 'white',
      policyID: '',
      scanPath: '',
      websock: {},
      scanResult: {
        scanName: '',
        scanProgress: 0,
        whiteListCount: 0,
        usbCount: 0,
        netCount: 0
      }
    }
  },
  watch: {
    scanPath (val, oldVal) { // 普通的watch监听
      this.scanPath = val
    }
  },
  methods: {
    init: function () {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
      console.log('socket连接成功')
    },
    error: function () {
      console.log('连接错误')
    },
    getMessage: function (msg) {
      let data = JSON.parse(msg.data)
      this.scanPath = data.results.path
      console.log(this.scanPath)
    },
    send: function () {
      this.socket.send('发送信息给服务器端')
    },
    close: function () {
      console.log('socket已经关闭')
    },
    // 查询扫描任务状态
    async searchScanStatus () {
      let data = {'cmdlist': [{
        'cmd': 132102,
        'ncmd': 'whileListScanStatus',
        'data': {
          'policyID': this.policyID
        }
      }]}
      await req_scanStatus(data).then(res => {
        console.log(res)
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
        this.socket.onclose = this.close
      })
    }
  },
  async created () {
    // 开始扫描
    await req_scanFile({
      'cmdlist': [{
        'cmd': 132097,
        'data': {
          'path': ['//']
        },
        'usb': 1,
        'net': 1,
        'ncmd': 'WhileListStartScan'
      }]
    }).then(res => {
      if (res.results.status) {
        localStorage.setItem('policyId', res.results.policyID)
        this.policyID = res.results.policyID
        this.searchScanStatus()
      }
    })
  },
  mounted () {
    // 初始化
    this.init()
  },
  destroyed () {
    // 销毁监听
    // this.socket.onclose = this.close
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
