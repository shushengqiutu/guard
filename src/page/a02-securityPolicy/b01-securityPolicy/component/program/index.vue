<template>
  <div class="program">
    <div class='operation'>

      <div class='search'>

        <my-search @paramsChange='paramsChange'> </my-search>
      </div>

    </div>
    <div class='tableWarp'>
      <div class='func'>
        <my-option icon='el-icon-delete-solid'
                   text='删除'> </my-option>
        <my-option icon='el-icon-delete-solid'
                   text='导入'> </my-option>
        <my-option icon='el-icon-delete-solid'
                   text='导出'> </my-option>
        <my-option icon='el-icon-delete-solid'
                   text='部署'> </my-option>
        <my-option icon='el-icon-delete-solid'
                   text='预制'> </my-option>
      </div>
      <my-table :tableData='tableData'
                :tHead='tHead'
                :tableHeight="'435'"
                :checkBox='false'>
        <el-table-column slot="index"
                         type="index"
                         label="序号"
                         :width="60">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>

        <el-table-column slot="status"
                         prop="status"
                         label="上报状态"
                         :width="80">
          <template slot-scope="scope">

            <span>{{scope.row.status|filterStatus}}</span>
          </template>

        </el-table-column>
        <el-table-column slot="tag_status"
                         prop="tag_status"
                         label="模块类型"
                         :width="80">
          <template slot-scope="scope">

            <span>{{scope.row.tag_status|filterTagStatus}}</span>
          </template>

        </el-table-column>
      </my-table>
    </div>
    <div class='myPaginationWarp'
         v-if="pagination.isShow">
      <myPagination ref="pagination"
                    :page='pagination.page'
                    :size='pagination.size'
                    :total='pagination.total'
                    @paginationChange='paginationChange'>
      </myPagination>
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
  req_ShowWhiteList
} from '@/api'
export default {
  name: 'program',
  components: {
    cars, mySearch, myOption, myTable, myPagination
  },
  data: function () {
    return {

      filtersWarpOpen: false,
      tableData: [],
      pagination: {
        isShow: true,
        page: 1,
        size: 10,
        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      initTableParams: {
        page: 0,
        size: 10, // 可选
        policyID: 1,
        type: 2,
        params: {

        }

      },
      tHead: [
        {
          label: '序号', // 表头
          state: true, // 是否显示列
          isCustom: true, // 是否自定义
          type: 'index', // type 类型

          slotName: 'index',
          prop: 'date',
          sortable: false // 是否排序
        },

        {
          label: '执行对象',
          prop: 'operation_name',
          state: true,
          isCustom: false,
          slotName: 'operation_name',
          width: 100
        },
        {
          label: '对象特征',
          prop: 'operation_feature',
          state: true,
          isCustom: false,
          slotName: 'operation_feature',
          width: 70
        },
        // {
        //   label: 'policyID',
        //   prop: 'policyID',
        //   state: true,
        //   isCustom: false,
        //   slotName: 'policyID',
        //   width: 80
        // },
        {
          label: '重复次数',
          prop: 'repeat',
          state: true,
          isCustom: false,
          slotName: 'repeat',
          width: 80
        },
        {
          label: '上报状态',
          prop: 'status',
          state: true,
          isCustom: true,
          slotName: 'status',
          width: 80
        },

        {
          label: '是否确认',
          prop: 'tag_status',
          state: true,
          isCustom: true,
          slotName: 'tag_status',
          width: 80
        },

        {
          label: '用户',
          prop: 'user',
          state: true,
          isCustom: false,
          slotName: 'user',
          width: 80
        },
        {
          label: '开始时间',
          prop: 'start_time',
          state: true,
          isCustom: false,
          slotName: 'start_time'

        }]

    }
  },
  created () {
    this.initTable()
  },

  methods: {

    changeStatus (status) {
      this.filtersWarpOpen = status
    },
    /** *********************************************表格*************************************** */
    // 表格初始化
    initTable () {
      this.getTableData(this.initTableParams)
        .then(res => {
          this.setTableData(res.results.eventlist, res.results.total)
        })
    },
    // 获取表格数据
    async getTableData (data) {
      const result = await req_ShowWhiteList(data)
      console.log(result, 77)
      return result
    },
    // 处理数据
    setTableData (data, total) {
      this.tableData = data
      this.pagination.total = total
    },
    paginationChange (type, val) {
      if (type === 'page') {
        val = val - 1
      }
      this.initTableParams[type] = val
      this.initTable()
    },
    /** *********************************************日期选择*************************************** */
    paramsChange (type, val) {
      // 搜索
      if (type === 'key') {
        if (val) {
          this.initTableParams.params[type] = val
        } else {
          delete (this.initTableParams.params[type])
        }
      }

      this.paramsChangeTableInit()
    },
    paramsChangeTableInit () {
      this.pagination.page = 1
      this.pagination.size = 10
      this.initTableParams.page = 0
      this.initTableParams.size = 10
      this.initTable()
      this.pagination.isShow = false// 让分页隐藏
      this.$nextTick(() => { // 重新渲染分页
        this.pagination.isShow = true
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
