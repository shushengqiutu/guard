<template>
  <div class="workmode">
    <open-one
      :firstObj="firstObj"
      :secondObj="secondObj"
      :title="title"
      @changeFirstStatus="protectMode"
      @changeSecondStatus="auditMode"
    ></open-one>
  </div>
</template>
<script>
import openOne from '@/component/openOne/index.vue'
import protectImgUrl from '@/assets/img/public/审计@2x(2).png'
import auditImgUrl from '@/assets/img/public/图层 13 拷贝@2x.png'
export default {
  name: 'workMode',
  components: {
    openOne
  },
  data () {
    return {
      title: '工作模式',
      firstObj: {
        imgUrl: protectImgUrl,
        status: false,
        name: '保护模式'
      },
      secondObj: {
        imgUrl: auditImgUrl,
        status: false, // 进入页面请求后台返回开关状态
        name: '审计模式'
      }
    }
  },
  methods: {
    // 保护模式
    protectMode (val) {

    },
    // 审计模式
    auditMode (val) {

    }
  }
}
</script>
<style lang='scss'  scoped>
  @import "./css/index.scss";
</style>
