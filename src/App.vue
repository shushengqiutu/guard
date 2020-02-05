<template>
  <div id="app"
       :class="[{ 'theme1':theme==='1','theme2':theme==='2' },{ 'zh':lang==='zh'||lang==='','en':lang=== 'en'}]">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data: function () {
    return {
      lang: '',
      theme: ''
    }
  },
  created () {
    // 主题参数赋值
    this.setTheme()
    // 语言参数 lang 赋值
    this.setLang()
  },
  // 从vuex 获取主题
  computed: {
    ...mapGetters({
      getTheme: 'getTheme',
      getLang: 'getLang'
    })
  },
  methods: {
    // theme 赋值
    setTheme (val) {
      if (val) {
        this.theme = val
      } else {
        this.theme = this.getTheme
      }
    },
    //  lang 赋值
    setLang (val) {
      if (val) {
        this.lang = val
      } else {
        this.theme = this.getTheme
      }
    }
  },
  watch: {
    // 对主题监听实时更新
    getTheme: function (val) {
      this.setTheme(val)
    },
    // 对语言监听实时更新
    getLang: function (val) {
      this.$i18n.locale = val
      this.setLang(val)
    }
  }
}

</script>
<style lang="scss">
html {
  width: 920px;
  height: 600px;
}
body {
  width: 920px;
  height: 600px;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
img {
  vertical-align: top;
  border: none;
}
</style>
