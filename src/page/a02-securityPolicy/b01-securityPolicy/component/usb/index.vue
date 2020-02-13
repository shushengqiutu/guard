<template>
  <div class="usb">
      <div class='operation'>
        <div class='func'>
            <my-option icon='el-icon-delete-solid' text='删除usb'> </my-option>
            <my-option icon='el-icon-delete-solid' text='追加usb'> </my-option>
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
  name: 'usb',
  components: {
    cars, mySearch, myOption, myTable, myPagination
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
