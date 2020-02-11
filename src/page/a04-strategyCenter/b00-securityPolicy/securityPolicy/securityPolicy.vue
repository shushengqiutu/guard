<template>

  <div class="securityPolicy">
    <cars :carsConfig='securityPolicycarsConfig'></cars>
    <div class="conntent">

      <div class="operation">
        <div class="func">1</div>
        <div class="search">
          <my-search></my-search>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import cars from '@/component/cars/'
import mySearch from '@/component/search/'
export default {
  name: 'securityPolicy',
  components: {
    cars, mySearch
  },
  data () {
    return {
      securityPolicycarsConfig: {
        defaultOpenCarId: 'program',
        items: [
          {
            name: '应用程序',
            carId: 'program'
          },
          {
            name: 'USB',
            carId: 'usb'
          },
          {
            name: '网卡',
            carId: 'network'
          }

        ]
      }

    }
  },
  methods: {

  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
