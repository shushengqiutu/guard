<template>
  <div class="comfirm" v-if="isShow">
    <div class="tipSty">
      {{text.type}}
    </div>
    <div class="tipText">
      {{text.msg}}
    </div>
    <div class="btn">
      <div class="okSty"
           @mouseover="mouseOverOk"
           @mouseleave="mouseLeaveOk"
           :style="okActive" @click="ok()">{{text.btn.ok}}</div>
      <div class="okSty"
           @mouseover="mouseOverNo"
           @mouseleave="mouseLeaveNo"
           :style="noActive"
           @click="close()">{{text.btn.no}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      okActive: 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)',
      noActive: 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)',
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
      console.log('关闭')
    },
    ok () {
      console.log('确定')
    },
    mouseOverOk () {
      this.okActive = 'background:red;color: rgba(255,255,255,1)'
      this.noActive = 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)'
    },
    mouseLeaveOk () {
      this.okActive = 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)'
    },
    mouseOverNo () {
      this.noActive = 'background:red;color: rgba(255,255,255,1)'
      this.okActive = 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)'
    },
    mouseLeaveNo () {
      this.noActive = 'background:rgba(255,255,255,1);color:rgba(228,70,68,1)'
    }
  }
}
</script>
<style lang='scss' scoped>
  @import "./css/index.scss";
  .comfirm{
    width: 415px;
    height: 158px;
    background:rgba(238,238,238,1);
    box-shadow:11px 19px 29px 3px rgba(19,19,19,0.25);
    border-radius:5px;
    position: fixed;
    top: 150px;
    left: 330px;
  }
 .tipSty{
   padding-top: 13px;
   font-size:16px;
   font-family:Microsoft YaHei;
   font-weight:400;
   color:rgba(51,51,51,1);
   text-align: center;
   width: 100%;
   line-height:16px ;
 }
  .tipText{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-top: 27px;
    margin-left: 25px;
  }
  .btn{
    margin-top: 29px;
    display: flex;
  }
  .okSty{
    width: 125px;
    height: 30px;
    margin-left: 55px;
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    border-radius:3px;
  }
</style>
