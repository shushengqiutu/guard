<template>
  <div class="head">
    <div class="left">
      <!-- 需要头部显示标签页面 -->
      <template v-if="routeArr.indexOf($route.name)>-1">
        <div class="commonly">

          {{$t(`main.menu.${$route.name}`)}}
        </div>
      </template>
      <!-- 策略详情 -->
      <template v-if="$route.name==='policyInfo'">
        <div class="policyInfo">
          <i class="el-icon-arrow-left icon"
             @click="linkTo('allPolicy')"></i>
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
           @click="subMean=!subMean"> <i class="el-icon-s-operation icon"></i> </div>
      <div class="minimize iconWarp"><i class="el-icon-minus icon"> </i></div>
      <div class="close iconWarp"><i class="el-icon-close icon"> </i></div>
      <transition name="el-fade-in-linear">
        <div class="subMean"
             v-show="subMean">
          <p @click="switchTheme"> 切换主题 {{getTheme}}</p>
          <p @click="switchLang"> 切换语言 {{getLang}}</p>

          <p>更新版本</p>
          <p>关于</p>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import tabs from '@/component/tabs/'

export default {
  name: 'myHead',
  components: {
    tabs
  },
  data () {
    return {
      subMean: false,
      securityPolicyConfig: {
        routeNameArr: ['securityPolicy', 'creditPolicy', 'allPolicy'],
        tabs: {
          'securityPolicy': '当前策略',
          'creditPolicy': '授信策略',
          'allPolicy': '所有策略'
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
          if (tab.name === 'allPolicy') {
            this.$router.push({ name: 'allPolicy' })
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
  methods: {
    ...mapMutations(['change_theme', 'change_lang']),
    linkTo (name) {
      this.$router.push({ name })
    },

    switchTheme () {
      // debugger
      this.getTheme === '1' ? this.change_theme({ theme: '2' }) : this.change_theme({ theme: '1' })
    },
    switchLang () {
      // debugger
      this.getLang === 'zh' ? this.change_lang({ lang: 'en' }) : this.change_lang({ lang: 'zh' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
