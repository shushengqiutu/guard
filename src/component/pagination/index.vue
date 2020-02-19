
<template>
  <div class="mypagination">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagination.page"
                   :pager-count='5'
                   background
                   prev-text='上一页'
                   next-text='下一页'
                   :page-sizes="pagination.pageSizesArr"
                   :page-size="pagination.size"
                   layout="total, prev, pager, next,jumper"
                   :total="pagination.total">
      <!-- @size-change   每页显示条数修改触发 -->
      <!-- @current-change   切换显示哪页触发 -->
      <!-- current-change   当前显示哪一页 -->
      <!-- page-sizes    可选每页显示多少数据 -->
      <!-- page-size    默认每页显示多少数据 -->
      <!--layout   分页显示哪些功能  -->
      <!--total    数据总数  -->
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'mypagination',
  props: {
    // 分页参数配置
    getTableData: {
      type: Function
    },
    pagination: {
      type: Object,
      // required: true
      default: () => {
        return {

          page: 1, // 当前页码默认为
          size: 10, // 当前页码默认显示数据为15
          pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
          total: 200 // 总数据默认条数
        }
      }

    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('paginationChange', 'size', size)
      // 每页数据发生改变
    },
    handleCurrentChange (page) {
      this.$emit('paginationChange', 'page', page)

      // if(this.getTableData){
      //   this.getTableData()
      // }
      // this.$emit('paginationChange', 12)
      // 显示页数发生改变
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
