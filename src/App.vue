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
      theme: '',
      socket: ''
    }
  },
  created () {
    this.localSocket()
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
    /* // 初始化websocket
    init () {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket('ws://127.0.0.1:8000')
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
        // 关闭websocket
        this.socket.onclose = this.close
      }
    },
    open () {
      console.log('socket连接成功')
    },
    error () {
      console.log('连接错误')
    },
    // 获取从websocket获取的数据
    getMessage (msg) {
      let data = JSON.parse(msg.data)
      localStorage.setItem('websocketObj', JSON.stringify(data))
      console.log(data)
    },
    close () {
      console.log('关闭websocket')
    },
    send () {
      this.socket.send('发送信息给服务器端')
    }, */
    localSocket () {
      let that = this
      if ('WebSocket' in window) {
        console.log('您的浏览器支持 WebSocket!')

        that.ws = new WebSocket(`ws://127.0.0.1:8000`)
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
