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
                disabled
                @change="changeSecondStatus"
                active-color="#13ce66"
                inactive-color="black">
              </el-switch>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="timeSty">
      您在 {{firstObj.startTime}} 启用了{{firstObj.status ? '保护模式':'审计模式'}}
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
      default: 'width:179px;height:180px'
    },
    boxSty: {
      type: String,
      required: false,
      default: 'width:179px;height:180px'
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
</style>
