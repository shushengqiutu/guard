<template>
  <div class="deviceStatus">
    <div>
      <img :style="imgSty"
           :src="imgUrl"
           alt="">
    </div>
    <div>
      <div class="scanTypeSty">
        <div>
          {{scanType}}
        </div>
        <div style="margin-left: 5px">
          <el-switch
            v-model="status"
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
import ajax from '@/api/ajax.js'
export default {
  name: 'deviceStatus',
  props: {
    imgUrl: { // 接收图片地址
      type: String,
      required: true
    },
    imgSty: { // 图片样式
      type: String,
      required: false,
      default: 'width:175px;height:175px'
    },
    scanType: {
      type: String,
      required: false,
      default: 'U盘扫描'
    },
    requestUrl: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      status: this.status
    }
  },
  methods: {
    changeStatus (status) {
      // 请求开关的接口
      // this.requestUrl 请求路径
      // 请求参数 val
      ajax(this.requestUrl, { status: status }, 'post')
    }
  },
  created () {

  }

}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
  .scanTypeSty{
    display: flex;
    justify-content:center;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    width: 175px;
    text-align: center;
  }
</style>
