<template>
  <div class="head">
    <div class="left">
      <!-- 需要头部显示标签页面 -->
      <template v-if="routeArr.indexOf($route.name)>-1">
        <div class="commonly">

          {{$t(`main.menu.${$route.name}`)}}
        </div>
      </template>
      <!-- 扫描中 -->
      <template v-if="$route.name==='scaning'">
        <div class=" info">
          <i class="el-icon-arrow-left icon"
             @click="back('scaning','smartExam')"></i>
          <span class="text"> </span>

        </div>
      </template>
      <!-- 扫描完成 -->
      <template v-if="$route.name==='scanFinish'">
        <div class=" info">
          <i class="el-icon-arrow-left icon"
             @click="back('scanFinish','smartExam')"></i>
          <span class="text"> </span>

        </div>
      </template>
      <!-- 策略详情 -->
      <template v-if="$route.name==='policyInfo'">
        <div class="policyInfo info">
          <i class="el-icon-arrow-left icon"
             @click="linkTo('allPolicy')"></i>
          <span class="text"> {{$t(`main.menu.${$route.name}`)}}</span>

        </div>
      </template>
      <!-- 内置白名单详情 -->
      <template v-if="$route.name==='inWhiteListInfo'">
        <div class="inWhiteListInfo info">
          <i class="el-icon-arrow-left icon"
             @click="linkTo('inWhiteList')"></i>
          <span class="text"> {{$t(`main.menu.${$route.name}`)}}</span>

        </div>
      </template>
      <!-- 安全策略 -->
      <template v-if="securityPolicyConfig.routeNameArr.indexOf($route.name)>-1">
        <tabs :tabsConfig='securityPolicyConfig'></tabs>
      </template>
    </div>
    <div class="right">
      <div class="mean iconWarp"
           @click="subMean=!subMean"><i class="icon iconfont iconliebiao"> </i></div>
      <div class="minimize iconWarp"> <i class="icon iconfont iconweibiaoti-_huaban"> </i></div>
      <div class="close iconWarp"><i class="icon iconfont iconguanbi"> </i></div>
      <transition name="el-fade-in-linear">
        <div class="subMean"
             v-show="subMean">
          <!-- <p @click="switchTheme"> 切换主题 {{getTheme}}</p> -->
          <!-- <p @click="switchLang"> 切换语言 {{getLang}}</p> -->

          <p @click="isUpdate=!isUpdate">更新版本 </p>
          <p>关于</p>
        </div>
      </transition>

    </div>
    <!-- 更新版本 -->

    <div v-if="isUpdate"
         class="updateWarp">
      <update @closeupdate='closeupdate'></update>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import {

  // eslint-disable-next-line camelcase
  req_stopScan
} from '@/api'
import tabs from '@/component/tabs/'
import update from '@/component/update/'
export default {
  name: 'myHead',
  components: {
    tabs, update
  },
  data () {
    return {
      policyID: '',
      isUpdate: false, // 是否打开版本更新
      subMean: false,
      securityPolicyConfig: {
        routeNameArr: ['securityPolicy', 'creditPolicy', 'allPolicy', 'inWhiteList'],
        tabs: {
          'securityPolicy': '当前策略',
          'creditPolicy': '授信策略',
          'allPolicy': '所有策略',
          'inWhiteList': '内置白名单'
        },
        // default: this.$route.name,
        openPage: (tab) => {
          // 当前策略
          if (tab.name === 'securityPolicy') {
            this.$router.push({ name: 'securityPolicy' })
          }
          // 授信策略
          if (tab.name === 'creditPolicy') {
            this.$router.push({
              name: 'creditPolicy',
              query: {
                policyID: 0
              }
            })
          }
          // 所有策略
          if (tab.name === 'allPolicy') {
            this.$router.push({ name: 'allPolicy' })
          }
          // 内置白名单
          if (tab.name === 'inWhiteList') {
            this.$router.push({ name: 'inWhiteList' })
          }
        }
      },
      // 展示在顶部
      routeArr: [
        'smartExam',
        'auditManagement',
        'operationLog',
        'systemSetup'
      ]
      // 安全策略

    }
  },
  computed: {
    ...mapGetters({
      getTheme: 'getTheme',
      getLang: 'getLang'
    })
  },
  created () {
    this.getPolicyID()
  },
  methods: {
    ...mapMutations(['change_theme', 'change_lang']),
    linkTo (name) {
      this.$router.push({ name })
    },
    back (now, to) {
      if (now === 'scaning') {
        this.stopScan()
      }
      if (now === 'scanFinish') {
        localStorage.removeItem('policyId')
        localStorage.removeItem('stop')

        this.$router.push({ name: 'smartExam' })
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
        this.sendStopScan(this.policyID, true).then((res) => {
          if (res.status) {
            // 执行成功 保存结果 去完成页面

            this.$router.push({ name: 'scanFinish' })
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
    // 切换主题
    switchTheme () {
      this.getTheme === '1' ? this.change_theme({ theme: '2' }) : this.change_theme({ theme: '1' })
    },
    // 切换语言
    switchLang () {
      this.getLang === 'zh' ? this.change_lang({ lang: 'en' }) : this.change_lang({ lang: 'zh' })
    },
    // 关闭更新
    closeupdate (bool) {
      this.isUpdate = bool
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
