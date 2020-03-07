/* eslint-disable vue/valid-v-for */
/* eslint-disable vue/valid-v-for */
<template>
  <div class="menuWarp">
    <my-scroll>
      <div class="menu">

        <el-menu :default-active="defaultUrl"
                 :unique-opened="true"
                 :text-color="variables.menuText"
                 :active-text-color="variables.menuActiveText"
                 :default-openeds="openeds"
                 router
                 :collapse-transition="true">
          <!--  循环菜单-->
          <template v-for="item in menu">
            <!-- 是单个页面且不显示子菜单 -->
            <el-menu-item v-if="item.children&&item.singleTag&&!item.hidden"
                          :key="item.path"
                          :index="item.redirect">
              <i :class="item.icon"
                 class="menuIcon icon iconfont"></i>
              <span slot="title">{{$t(`main.menu.${item.children[0].name}`)}}</span>
            </el-menu-item>
            <!-- 需要显示子菜单 -->
            <my-menu-item v-else-if="item.children&&!item.singleTag&&!item.hidden"
                          :datas="item"
                          :key="item.path ">
            </my-menu-item>
          </template>

        </el-menu>

      </div>
    </my-scroll>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import myMenuItem from './menuItem'

export default {
  components: { myMenuItem },
  name: 'myMenu',

  data () {
    return {
      openeds: ['/policyCentral'],
      variables: {
        menuText: '',
        menuActiveText: ''
      },
      theme1Variables: {
        menuText: '#E6E6E6',
        menuActiveText: '#ffffff'
      },
      theme2Variables: {
        menuText: '#ffffff',
        menuActiveText: '#D8152A'
      }
    }
  },
  created () {
    // 主题参数赋值
    this.setVariables(this.getTheme)
    // console.log(this.variables, 333)
  },
  computed: {
    ...mapGetters({
      menu: 'getroutes',
      getTheme: 'getTheme'

    }),
    defaultUrl: function () {
      // if (this.$route.name === 'allPolicy' || this.$route.name === 'creditPolicy' || this.$route.name === 'inWhiteList') {
      //   return '/securityPolicy/securityPolicy'
      // } else if (this.$route.name === 'scaning' || this.$route.name === 'scanFinish') {
      //   return '/smartExam'
      // } else {
      //   return this.$route.path
      // }
      return this.$route.path
    }

  },
  methods: {
    setVariables (theme) {
      switch (theme) {
        case '1':
          this.variables.menuText = this.theme1Variables.menuText
          this.variables.menuActiveText = this.theme1Variables.menuActiveText
          break
        case '2':
          this.variables.menuText = this.theme2Variables.menuText
          this.variables.menuActiveText = this.theme2Variables.menuActiveText
          break

        default:
          break
      }
    }
  },

  watch: {
    // 对主题监听实时更新
    getTheme: function (val) {
      this.setVariables(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
