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
export default {
  name: 'allPolicy',
  components: {
    cars, mySearch, myOption, myTable, myPagination
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
