<template>
  <div class="multiTable">
    <div class="cars">
      <template v-for="(item,index) in carsConfig.items">
        <span class="item"
              :class="{'clickOpacity':item.carId===carsConfig.defaultOpenCarId}"
              @click="changeCar(item)"
              :key="item.carid">{{item.name}}</span>
        <span class="line"
              v-show="index===carsConfig.items.length-1?false:true"
              :key="index+Math.random()">|
        </span>

      </template>
    </div>
    <div class="policyID">
      策略名称:{{policyName?policyName:'正在获取中...'}}
    </div>
  </div>

</template>
<script>
import {
  // eslint-disable-next-line camelcase
  req_ShowPolicyList
} from '@/api'

export default {
  name: 'cars',
  props: {
    carsConfig: {
      type: Object,
      required: true
    },
    policyID: {
      type: Number,
      required: true
    }

  },
  data () {
    return {
      policyName: ''
    }
  },
  methods: {
    changeCar (item) {
      this.carsConfig.defaultOpenCarId = item.carId
      this.$emit('getCarId', item.carId)
    }
  },
  watch: {
    policyID: function (policyID) {
      req_ShowPolicyList({
        page: 0,
        size: 10, // 每页记录数，可选参数
        policyID: policyID
      }).then(res => {
        if (res.results.list) {
          this.policyName = res.results.list[0].policyName
        } else {
          this.policyName = '获取失败'
        }
        console.log(res, 99)
      })
    }
  }

}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
