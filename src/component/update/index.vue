// 系统更新
<template>
  <div class="updatebox">
    <div class="update"
         v-if="update">
      <h2 class="title"> 系统更新 <i @click="closeupdate"
           class="close icon iconfont iconguanbi"></i></h2>
      <div class="versionWarp">
        <p class="version"> 当前版本:{{version.old}}</p>
        <p class="version"> 最新版本:{{version.new}}</p>
      </div>
      <div class="content">
      </div>
      <div class="btnwarp">
        <button class="ok btn"
                @click="startupdate">确定</button>
        <button class="close btn"
                @click="closeupdate">取消</button>
      </div>
    </div>
    <div class="updating"
         v-if="updating">
      <h2 class="title"> 系统更新 <i @click="closeupdate"
           class="close icon iconfont iconguanbi"></i></h2>
      <div class="versionWarp">
        <p class="version"> 当前版本:{{version.old}}</p>
        <p class="version"> 最新版本:{{version.new}}</p>
      </div>

      <div class="content">
      </div>
      <div class="progress">
        <el-progress :percentage="percentage"
                     :stroke-width="8"
                     :format="format">
        </el-progress>
      </div>

      <div class="btnwarp">
        <button class="ok btn"
                @click="11">确定</button>
        <button class="close btn"
                @click="closeupdate">取消</button>
      </div>
    </div>
  </div>
</template>

<script>

import {
  // eslint-disable-next-line camelcase
  req_updatecheck, req_updatestatus, req_startupdate
} from '@/api'
export default {
  name: 'addFlie',
  components: {

  },
  props: {
    type: {
      type: Number
    }

  },
  computed: {

  },
  data () {
    return {
      update: true,
      updating: false,
      percentage: 0,
      time: null,
      version: {
        old: '占时无接口获取',
        new: ''
      }

    }
  },
  created () {
    this.updatecheck()
  },
  mounted () {

  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '完成' : `${percentage}%`
    },
    // 检查版本
    updatecheck () {
      req_updatecheck().then(res => {
        if (res.results.status) {
          this.version.new = res.results.msg
        } else {
          this.version.new = '获取新版本失败'
        }
      })
    },
    // 关闭窗口
    closeupdate () {
      this.$emit('closeupdate', false)
    },
    // 开始升级
    startupdate () {
      req_startupdate().then(res => {
        if (res.results.status) {
          this.update = false
          this.updating = true
          if (this.time) {
            clearInterval(this.time)
          } else {
            this.updatestatus()
            setInterval(this.updatestatus, 1000)
          }
        } else {

        }
      })
    },
    // 获取状态
    updatestatus () {
      req_updatestatus().then(
        res => {
          this.percentage = res.results.curstat
        }
      )
    }
  },
  watch: {

  }

}

</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
