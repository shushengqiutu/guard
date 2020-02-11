<template>
  <div class="head">
    <div class="left">
      <!-- <div  v-if="routeArr.indexOf($route.path)">
        {{$t(`main.menu.${$route.path}`)}}
      </div> -->

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

export default {
  name: 'myHead',

  data () {
    return {
      subMean: false,
      routeArr: [
        '/smartExam',
        '/securityAudit/securityAudit',
        '/auditManagement/auditManagement',
        '/operationLog/operationLog',
        '/policyCentral',
        '/policyCentral/securityPolicy',
        '/policyCentral/dataProtect',
        '/policyCentral/outDetectionSet',
        '/policyCentral/usbScanSet',
        '/policyCentral/workMode',
        '/policyCentral/appProtect',
        '/policyCentral/peripheralProtect',
        '/policyCentral/secretUsb',
        '/systemSetup/systemSetup'
      ]
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
