<template>
  <div id="app"
       :class="[{ 'theme1':theme==='1','theme2':theme==='2' },{ 'zh':lang==='zh'||lang==='','en':lang=== 'en'}]">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
let config = require('./../config') // 引入配置文件信息
export default {
  name: 'App',
  data: function () {
    return {
      lang: '',
      theme: '',
      socket: ''
    }
  },
  created () {
    this.localSocket()
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
    localSocket () {
      let that = this
      if ('WebSocket' in window) {
        console.log('您的浏览器支持 WebSocket!')
        let serverIp = config.dev.proxyTable['/api']['target'].split('//')[1] // 从配置文件中获取的服务器地址
        that.ws = new WebSocket(`ws://` + serverIp)
        that.global.setWs(that.ws)
        that.ws.onopen = function () {
          console.log('连接建立')
        }

        that.ws.onclose = function () {
          // 关闭 websocket
          console.log('连接已关闭...')
          setTimeout(() => {
            that.localSocket()
          }, 2000)
        }
      } else {
        // 浏览器不支持 WebSocket
        console.log('您的浏览器不支持 WebSocket!')
      }
      that.global.ws.onmessage = function (res) {
        let receiveData = JSON.parse(res.data)
        if (receiveData.cmd === 133380) {
          let resData = receiveData.results
          let startTime = resData.start_time // 开始时间
          let operationName = resData.operation_name // 执行对象
          let eventTypeObj = {
            10: '进程执行',
            11: '进程拦截',
            20: 'USB发现',
            21: 'USB拦截',
            30: '网卡发现',
            31: '网卡禁用',
            32: '网卡卸载',
            40: '非法外联检测',
            41: '非法外联拦截',
            50: 'BAT执行',
            51: 'BAT阻止',
            60: 'VBS执行',
            61: 'VBS阻止'
          }
          let eventType = eventTypeObj[resData.event_type] // 事件类型
          that.$notify({
            title: '安全事件',
            dangerouslyUseHTMLString: true,
            message: `<div>开始时间:${startTime}</div>
                      <div>执行对象:${operationName}</div>
                      <div>事件类型:${eventType}</div>`,
            type: 'warning'
          })
        }
      }
    },
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
  background: linear-gradient(152deg, #232526 0%, #414345 100%);
  position: relative;
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
