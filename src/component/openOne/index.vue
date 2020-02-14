<template>
  <div class="deviceStatus">
    <div class="headText">
      {{title}}
    </div>
    <div class="device">
      <div class="deviceItem1">
        <div :style="boxSty">
          <img :style="imgSty"
               :src="firstObj.imgUrl"
               alt="">
        </div>
        <div>
          <div class="scanTypeSty">
            <div>
              {{firstObj.name}}
            </div>
            <div style="margin-left: 5px">
              <el-switch
                :disabled="secondData.status"
                v-model="firstData.status"
                @change="changeFirstStatus"
                active-color="#13ce66"
                inactive-color="black">
              </el-switch>
            </div>
          </div>
        </div>
      </div>
      <div class="deviceItem2">
        <div :style="boxSty">
          <img :style="imgSty"
               :src="secondObj.imgUrl"
               alt="">
        </div>
        <div>
          <div class="scanTypeSty">
            <div>
              {{secondData.name}}
            </div>
            <div style="margin-left: 5px">
              <el-switch
                v-model="secondData.status"
                :disabled="firstData.status"
                @change="changeSecondStatus"
                active-color="#13ce66"
                inactive-color="black">
              </el-switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'deviceStatus',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    firstObj: {
      type: Object,
      required: true
    },
    secondObj: {
      type: Object,
      required: true
    },
    imgSty: { // 图片样式
      type: String,
      required: false,
      default: 'width:175px;height:175px'
    },
    boxSty: {
      type: String,
      required: false,
      default: 'width:175px;height:175px'
    }
  },
  data () {
    return {
      firstData: this.firstObj,
      secondData: this.secondObj
    }
  },
  methods: {
    changeFirstStatus (status) {
      this.$emit('changeFirstStatus', status)
    },
    changeSecondStatus (status) {
      this.$emit('changeSecondStatus', status)
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
.headText{
  padding-top: 94px;
  margin-left: 42px;
  font-size:20px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.device{
  margin-top: 21px;
  display: flex;
}
.deviceItem1{
  margin-left: 143px;
}
.deviceItem2{
  margin-left: 105px;
}
</style>
