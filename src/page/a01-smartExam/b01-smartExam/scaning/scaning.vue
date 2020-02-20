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
    // 初始化websocket
    init () {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket('ws://127.0.0.1:8000')
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
        // 关闭websocket
        this.socket.onclose = this.close
      }
    },
    open () {
      console.log('socket连接成功')
    },
    error () {
      console.log('连接错误')
    },
    // 获取从websocket获取的数据
    getMessage (msg) {
      let data = JSON.parse(msg.data)
      // 判断扫描类型
      switch (data.cmd) {
        case 133377: // 文件扫描
          this.scanPath = data.results.path
          this.scanProgress = data.progress
          this.whiteListCount = data.executor
        case 133378: // USB扫描
          this.usbCount = data.results.total
        case 133379: // 网卡扫描
          this.netCount = data.results.total
      }
      console.log(data)
    },
    close () {
      console.log('关闭websocket')
    },
    send () {
      this.socket.send('发送信息给服务器端')
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
        this.socket.close()
      })
    }
  },
  created () {

  },
  mounted () {
    // 开始扫描
    req_scanFile({
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
        // 初始化
        this.init()
        localStorage.setItem('policyId', res.results.policyID)
        this.policyID = res.results.policyID
      }
    })
  },
  destroyed () {
    // this.socket.close()  关闭websocket
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
