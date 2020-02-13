<template>

  <div class="securityPolicy">
    <cars :carsConfig='securityPolicycarsConfig'
          @getCarId='getCarId'></cars>
    <div class="conntent">

      <div class="operation">
        <div class="func">
          <my-option icon='el-icon-delete-solid'
                     text='删除'
                     margin='0 10px 0 0'
                     @click.native="www">
          </my-option>
          <my-option icon='el-icon-delete-solid'
                     text='删除'
                     margin='0 10px 0 0'
                     @click.native="www">
          </my-option>
          <my-option icon='el-icon-delete-solid'
                     text='删除'
                     margin='0 10px 0 0'
                     @click.native="www">
          </my-option>
          <my-option icon='el-icon-delete-solid'
                     text='删除'
                     margin='0 10px 0 0'
                     @click.native="www">
          </my-option>
        </div>
        <div class="search">
          <my-search>

          </my-search>
        </div>

      </div>
      <div class="tableWarp">
        <div v-show="defaultOpenTable==='program'">
          1
          <my-table></my-table>
          <my-Pagination></my-Pagination>
        </div>
        <div v-show="defaultOpenTable==='usb'">
          2
          <my-table></my-table>
          <my-Pagination></my-Pagination>
        </div>
        <div v-show="defaultOpenTable==='network'">
          3
          <my-table></my-table>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import cars from '@/component/cars/'
import mySearch from '@/component/search/'
import myOption from '@/component/option/'
import myTable from '@/component/table/'
import myPagination from '@/component/pagination/'
export default {
  name: 'securityPolicy',
  components: {
    cars, mySearch, myOption, myTable, myPagination
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
      console.log(carId, 111)
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
