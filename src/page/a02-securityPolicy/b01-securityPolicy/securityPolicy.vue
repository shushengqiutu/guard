<template>

  <div class="securityPolicy">
    <cars :carsConfig='securityPolicycarsConfig'
          @getCarId='getCarId'
          :policyID='policyID'></cars>

    <div class="conntent">

      <el-collapse-transition>
        <div v-show="defaultOpenTable==='program'">
          <program :btn_delete='true'
                   @policyIdchange='policyIdchange'
                   :btn_addDir='true'
                   :btn_addFile='true'>
          </program>
        </div>
      </el-collapse-transition>

      <el-collapse-transition>
        <div v-show="defaultOpenTable==='usb'">
          <usb :btn_delete='true'
               :btn_addUsb='true'>

          </usb>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="defaultOpenTable==='network'">
          <network :btn_delete='true'
                   :btn_addNet='true'></network>
        </div>
      </el-collapse-transition>
    </div>

  </div>

</template>
<script>
import cars from '@/component/cars/'
import program from '@/page/a02-securityPolicy/component/program/'
import usb from '@/page/a02-securityPolicy/component/usb/'
import network from '@/page/a02-securityPolicy/component/network/'
export default {
  name: 'securityPolicy',
  components: {
    cars, program, usb, network
  },
  data () {
    return {
      policyID: -1,
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
    policyIdchange (policyId) {
      this.policyID = policyId
    }

  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
