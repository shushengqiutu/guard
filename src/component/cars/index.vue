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
  </div>

</template>
<script>

export default {
  name: 'cars',
  props: {
    carsConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    changeCar (item) {
      this.carsConfig.defaultOpenCarId = item.carId
    }
  }

}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
