<template>
  <div class="allPolicy">
    <div class='operation'>

      <div class="screenBtn">
        <screen @changeStatus='changeStatus'>
        </screen>
      </div>

      <div class='search'>

        <my-search @paramsChange='paramsChange'> </my-search>
      </div>

    </div>
    <el-collapse-transition>
      <div class="filtersWarp"
           v-show="filtersWarpOpen">
        <filters @paramsChange='paramsChange'></filters>
      </div>
    </el-collapse-transition>
    <div class='tableWarp'>
      <!-- <div class='func'>
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
      </div> -->
      <my-table :tableData='tableData'
                :tHead='tHead'
                :tableHeight="'435'"
                :checkBox='false'>
        <el-table-column slot="index"
                         type="index"
                         align="right"
                         :width="44">
          <template slot-scope="scope">

            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>
        <el-table-column slot="module"
                         prop="module"
                         label="模块类型"
                         :width="80">
          <template slot-scope="scope">

            <span>{{scope.row.module|filterModule}}</span>
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
import mySearch from '@/component/search/'
import myOption from '@/component/option/'
import myTable from '@/component/table/'
import myPagination from '@/component/pagination/'
import filters from '@/component/filters/'
import screen from '@/component/screen/'
import {

  // eslint-disable-next-line camelcase
  req_operatelogquery
} from '@/api'
export default {
  name: 'allPolicy',
  components: {
    mySearch, myOption, myTable, myPagination, filters, screen
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
        start_time: '1970-1-1 00:00:00',
        end_time: '',
        params: {

        }

      },
      tHead: [
        {
          label: '序号', // 表头
          state: true, // 是否显示列
          isCustom: true, // 是否自定义
          type: 'index', // type 类型
          width: 500, // 列最小宽度
          slotName: 'index',
          prop: 'date',
          sortable: false // 是否排序
        },
        {
          label: '模块类型',
          prop: 'module',
          state: true,
          isCustom: true,
          slotName: 'module',
          width: 100
        },
        {
          label: '执行动作',
          prop: 'action',
          state: true,
          isCustom: false,
          slotName: 'action',
          width: 150
        },
        {
          label: '描述',
          prop: 'desc',
          state: true,
          isCustom: false,
          slotName: 'desc'
          // width: 200
        },

        {
          label: '操作时间',
          prop: 'operate_time',
          state: true,
          isCustom: false,
          slotName: 'operate_time'
          // width: 450
        }
      ]

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
          this.setTableData(res.results.loglist, res.results.total)
        })
    },
    // 获取表格数据
    async getTableData (data) {
      const result = await req_operatelogquery(data)
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
      // 日期时间
      if (type === 'time') {
        if (val) {
          this.initTableParams.start_time = val[0]
          this.initTableParams.end_time = val[1]
        } else {
          this.initTableParams.start_time = '1970-1-1 00:00:00'
          this.initTableParams.end_time = ''
        }
      } else if (type === 'key') {
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
