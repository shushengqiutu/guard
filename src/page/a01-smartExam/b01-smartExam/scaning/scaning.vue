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
      <div class="scanText">
        {{scanResult.scanPath}}
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
    <div class="stopScan">
      <div class="stopScanText">
        <span>停止扫描</span>
      </div>
    </div>
  </div>
</template>
<script>
import { req_ScanFile } from '@/api'
export default {
  name: 'user',
  data () {
    return {
      color: 'white',
      scanResult: {
        scanName: '',
        scanPath: '',
        scanProgress: 0,
        whiteListCount: 0,
        usbCount: 0,
        netCount: 0
      }
    }
  },
  async created () {
    await req_ScanFile({
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
      console.log(res)
      debugger
    })
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
