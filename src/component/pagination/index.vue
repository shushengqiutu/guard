
<template>
  <div class="mypagination">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page"
                   :pager-count='5'
                   background
                   prev-text='上一页'
                   next-text='下一页'
                   :page-sizes="pageSizesArr"
                   :page-size="size"
                   layout="sizes,total, prev, pager, next,jumper"
                   :total="total">
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
    isInit: {
      type: Boolean
    },
    // 当前页码默认
    page: {
      type: Number
    },
    // 当前页码默认显示数据
    size: {
      // 当前页码默认显示数据
      type: Number
    },
    // 当前页码默认显示数据
    total: {
      type: Number
    },
    // 可选分页
    pageSizesArr: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50]
      }

    }
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('paginationChange', 'size', size)
      // 每页数据发生改变
    },
    handleCurrentChange (page) {
      this.$emit('paginationChange', 'page', page)
      // 显示页数发生改变
    }
  }

}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
