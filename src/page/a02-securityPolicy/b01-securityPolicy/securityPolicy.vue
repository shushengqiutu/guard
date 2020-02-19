<template>

  <div class="securityPolicy">
    <cars :carsConfig='securityPolicycarsConfig'
          @getCarId='getCarId'></cars>

    <div class="conntent">

      <el-collapse-transition>
        <div v-show="defaultOpenTable==='program'">
          <program></program>
        </div>
      </el-collapse-transition>

      <el-collapse-transition>
        <div v-show="defaultOpenTable==='usb'">
          <usb></usb>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="defaultOpenTable==='network'">
          <network></network>
        </div>
      </el-collapse-transition>
    </div>

  </div>

</template>
<script>
import cars from '@/component/cars/'
import program from '@/page/a02-securityPolicy/b01-securityPolicy/component/program/'
import usb from '@/page/a02-securityPolicy/b01-securityPolicy/component/usb/'
import network from '@/page/a02-securityPolicy/b01-securityPolicy/component/network/'
export default {
  name: 'securityPolicy',
  components: {
    cars, program, usb, network
  },
  data () {
    return {
      defaultOpenTable: 'program',
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
    getCarId (carId) {
      this.defaultOpenTable = carId
      // console.log(carId, 111)
    },
    www () {
      alert(1)
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
