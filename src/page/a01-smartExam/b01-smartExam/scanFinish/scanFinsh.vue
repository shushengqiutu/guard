<template>
  <div class="scanFinish"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="headerSty margin1">
      <div class="img1">
        <img class="img1"
             src="@/assets/img/public/完成@2x.png" />
      </div>
    </div>
    <div class="headerSty margin2">
      <div class="scanText">
        扫描<span v-if="!text">完成</span><span v-if="text">中止</span>
      </div>
    </div>
    <div class="contentSty margin3">
      <div class="flexImg">
        <img class="img2"
             src="@/assets/img/public/应用程序@2x.png" />
      </div>
      <div class="flexImg">
        <img class="img2"
             src="@/assets/img/public/网口@2x.png" />
      </div>
      <div class="flexImg">
        <img class="img2"
             src="@/assets/img/public/USB@2x.png" />
      </div>
    </div>
    <div class="contentSty contText baseText margin4">
      <div class="flexImg">
        <img class="iconSty"
             src="@/assets/img/public/组 18@2x.png" />扫描系统应用程序
      </div>
      <div class="flexImg">
        <img class="iconSty"
             src="@/assets/img/public/组 18@2x.png" />扫描网卡
      </div>
      <div class="flexImg">
        <img class="iconSty"
             src="@/assets/img/public/组 18@2x.png" />扫描USB
      </div>
    </div>
    <div class="contentSty resultText baseText">
      <div class="flexImg">
        白名单数量：{{scanResult.whiteListCount ? scanResult.whiteListCount : 0}}
      </div>
      <div class="flexImg">
        网卡个数：{{scanResult.netCount ? scanResult.netCount : 0}}
      </div>
      <div class="flexImg">
        USB数量：{{scanResult.usbCount ? scanResult.usbCount : 0}}
      </div>
    </div>
    <div class="endSty">
      <div class="searchDetail"
           @click="linkTo">
        查看详情
      </div>
    </div>
  </div>
</template>
<script>
import {
  // eslint-disable-next-line camelcase
  req_scanStatus, req_ShowPolicyList
} from '@/api'
export default {
  name: 'scanFinish',
  data () {
    return {
      loading: true,
      text: false,
      scanResult: {
        whiteListCount: 0, // 白名单文件数量
        usbCount: 0, // USB数量
        netCount: 0 // 网卡数量
      }
    }
  },
  created () {
    this.getScanStatus()
    this.$nextTick(() => {
      let stop = localStorage.getItem('stop')
      if (stop) {
        this.text = stop
      }
    })
  },
  methods: {

    linkTo () {
      let policyID = parseInt(localStorage.getItem('policyId'))
      this.getpolicyID().then(res => {
        if (res) {
          if (policyID === res) {
            this.$router.push({
              name: 'securityPolicy',
              query: {
                policyID: policyID
              }
            })
          } else {
            this.$router.push({
              name: 'policyInfo',
              query: {
                policyID: policyID
              }
            })
          }
        } else {
          this.$router.push({
            name: 'policyInfo',
            query: {
              policyID: policyID
            }
          })
        }
      })

      localStorage.removeItem('policyId')
    },
    // 获取当前策略id
    async getpolicyID () {
      const result = await req_ShowPolicyList({
        page: 0, // 第几页 0为第一页
        size: 10, // 每页记录数，可选参数
        status: 1
        // type: '' // 可选参数 1为当前策略
      })
      if (result.results.list) {
        let policyID = result.results.list[0].policyID
        return policyID
      } else {
        return false
      }
    },
    // 获取扫描状态
    async getScanStatus () {
      let policyID = parseInt(localStorage.getItem('policyId'))
      let result = await req_scanStatus({ policyID })
      this.loading = false
      this.scanResult.whiteListCount = result.results.pos
    }
  }

}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
