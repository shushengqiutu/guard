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
      <div class="tipText">
        {{text.msg}}
      </div>
      <div class="btn">
        <div class="okSty"
             @mouseover="okFlag=true"
             @mouseleave="okFlag=false"
             :class="{'active':okFlag}"
             @click="ok()">{{text.btn.ok}}</div>
        <div class="cancelBtn"
             @mouseover="cancelFlag=true"
             @mouseleave="cancelFlag=false"
             :class="{'active':cancelFlag}"
             @click="close()">{{text.btn.no}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      okFlag: false,
      cancelFlag: false,
      isShow: true,
      text: {
        type: '提示',
        msg: '确定删除此条信息？',
        btn: {
          ok: '确定',
          no: '取消'
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
