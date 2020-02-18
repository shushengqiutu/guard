<template>
  <div class="allPolicy">
    <div class='operation'>
      <div class='func'>
        <!-- <my-option icon='el-icon-delete-solid' text='删除'> </my-option>
            <my-option icon='el-icon-delete-solid' text='导入'> </my-option>
             <my-option icon='el-icon-delete-solid' text='导出'> </my-option>
               <my-option icon='el-icon-delete-solid' text='部署'> </my-option>
                 <my-option icon='el-icon-delete-solid' text='预制'> </my-option> -->
      </div>
      <div class='search'>
        <my-search> </my-search>
      </div>
    </div>
    <div class='tableWarp'>
      <my-table></my-table>
    </div>
    <div class='myPaginationWarp'>
      <myPagination></myPagination>
    </div>
  </div>

</template>
<script>
import cars from '@/component/cars/'
import mySearch from '@/component/search/'
import myOption from '@/component/option/'
import myTable from '@/component/table/'
import myPagination from '@/component/pagination/'
import {
  // eslint-disable-next-line camelcase
  req_operateloglist
} from '@/api'

export default {
  name: 'allPolicy',
  data: function () {
    return {
      data: {
        page: 1,
        size: 10
      }
    }
  },
  created () {
    this.operateloglist(this.data)
  },
  components: {
    cars, mySearch, myOption, myTable, myPagination
  },
  methods: {
    async operateloglist (data) {
      const result = await req_operateloglist(data)
      console.log(result)
      debugger
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
