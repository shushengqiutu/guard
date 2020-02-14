<template>
  <div class="deviceStatus">
    <div v-if="imgUrl" :style="boxSty">
      <img :style="imgSty"
           :src="imgUrl"
           alt="">
    </div>
    <div>
      <div class="scanTypeSty">
        <div>
          {{name}}
        </div>
        <div style="margin-left: 5px">
          <el-switch
            v-model="openStatus"
            @change="changeStatus"
            active-color="#13ce66"
            inactive-color="black">
          </el-switch>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'deviceStatus',
  props: {
    boxSty: {
      type: String,
      required: false,
      default: 'width:175px;height:175px'
    },
    imgUrl: { // 接收图片地址
      type: String,
      required: false,
      default: ''
    },
    imgSty: { // 图片样式
      type: String,
      required: false,
      default: 'width:175px;height:175px'
    },
    name: {
      type: String,
      required: false,
      default: 'U盘扫描'
    },
    status: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openStatus: this.status
    }
  },
  methods: {
    changeStatus (status) {
      this.$emit('func', status)
    }
  },
  created () {

  }

}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
>>>.el-switch__core:after{
  width: 12px;
  height: 12px;
  top: -1px;
  left: -1px;
}
>>>.el-switch__core{
  width: 25px !important;
  height: 12px;
}
>>>.el-switch.is-checked .el-switch__core::after{
  margin-left: -6px;
}
  .scanTypeSty{
    display: flex;
    justify-content:center;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1) !important;
    width: 175px;
    text-align: center;
  }
</style>
