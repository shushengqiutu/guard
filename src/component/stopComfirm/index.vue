<template>
  <div  v-if="isShow" class="maskdiv">
    <div class="comfirm">
      <div style="display: flex">
        <div class="tipSty">
          {{text.type}}
        </div>
        <div class="closeIcon">
         <i class="icon iconfont iconguanbi" @click="close()"></i>
        </div>
      </div>
      <div class="tipText" v-html="text.msg">
      </div>
      <div class="btn">
        <div class="okSty"
             @mouseover="okFlag=true"
             @mouseleave="okFlag=false"
             :class="{'active':okFlag}"
             @click="ok()">{{text.btn.ok}}</div>
        <div class="cancelBtn"
             @mouseover="noFlag=true"
             @mouseleave="noFlag=false"
             :class="{'active':noFlag}"
             @click="close('noSave')">{{text.btn.no}}</div>
        <div class="cancelBtn"
             @mouseover="cancelFlag=true"
             @mouseleave="cancelFlag=false"
             :class="{'active':cancelFlag}"
             @click="close()">{{text.btn.cancel}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      okFlag: false,
      noFlag: false,
      cancelFlag: false,
      isShow: true,
      text: {
        type: '提示',
        msg: '您将停止策略扫描，当前扫描结果是否需要保存？',
        btn: {
          ok: '是',
          no: '否',
          cancel: '取消'
        }
      }
    }
  },
  methods: {
    close () {
      this.isShow = false
    },
    ok () {
      this.isShow = false
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./css/index.scss";
</style>
