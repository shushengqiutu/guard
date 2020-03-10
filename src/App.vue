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
        if (receiveData.cmd === 133380) { // 威胁事件
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
          let titleName = '威胁事件'
          let eventType = eventTypeObj[resData.event_type] // 事件类型
          let msgArr = [] // 第一行按照15个字节切割，往后按照25个字节切割，组装数组
          while (that.getLength(operationName) > 15) {
            let cutStr = ''
            if (msgArr.length === 0) {
              cutStr = that.cutStr(operationName, 15)
            } else {
              cutStr = that.cutStr(operationName, 25)
            }
            msgArr.push(cutStr)
            operationName = operationName.substr(cutStr.length)
          }
          msgArr.push(operationName)
          let htmlDiv = ''
          htmlDiv += `<div>开始时间:${startTime}</div>`
          for (let i = 0; i < msgArr.length; i++) {
            if (i === 0) {
              htmlDiv += `<div style="word-wrap: break-word;width: 200px;">事件类型：${msgArr[i]}</div>`
            } else {
              htmlDiv += `<div style="word-wrap: break-word;width: 200px;">${msgArr[i]}</div>`
            }
          }
          htmlDiv += `<div>事件类型:${eventType}</div>`
          that.$notify({
            title: titleName,
            dangerouslyUseHTMLString: true,
            message: htmlDiv,
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
    },
    // 按照字节切割字符串
    cutStr (str, L) {
      var result = '',
        strlen = str.length, // 字符串长度
        chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度

      if (chrlen <= L) { return str }

      for (var i = 0, j = 0; i < strlen; i++) {
        var chr = str.charAt(i)
        if (/[\x00-\xff]/.test(chr)) {
          j++ // ascii码为0-255，一个字符就是一个字节的长度
        } else {
          j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
        }
        if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
          result += chr
        } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
          return result
        }
      }
    },
    // 获取字节长度
    getLength (val) {
      var str = new String(val)
      var bytesCount = 0
      for (var i = 0, n = str.length; i < n; i++) {
        var c = str.charCodeAt(i)
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          bytesCount += 1
        } else {
          bytesCount += 2
        }
      }
      return bytesCount
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
  margin: 1% auto;
}
body {
  width: 920px;
  height: 600px;
  position: relative;
  background: #232526;
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
