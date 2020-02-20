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
    // this.$http.get('/user/login').then(res => {
    //   console.log(res, 113333331)
    // })

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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
body {
   width: 920px;
  height: 600px;
  background:linear-gradient(152deg,rgba(201,75,75,1) 0%,rgba(75,19,79,1) 100%);
}
#app {
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
