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
      <div>
        <date-picker @timeChange='timeChange'></date-picker>
      </div>
      <div class='search'>

        <my-search> </my-search>
      </div>
    </div>
    <div class='tableWarp'>
      <my-table :tableData='tableData'
                :tHead='tHead'
                :checkBox='false'>
        <el-table-column slot="index"
                         type="index"
                         label="序号"
                         :width="50">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>
      </my-table>
    </div>
    <div class='myPaginationWarp'>
      <myPagination :pagination='pagination'
                    :getTableData='getTableData'
                    @paginationChange='paginationChange'></myPagination>
    </div>
  </div>

</template>
<script>
import mySearch from '@/component/search/'
import myOption from '@/component/option/'
import myTable from '@/component/table/'
import myPagination from '@/component/pagination/'
import datePicker from '@/component/datePicker/'
import {
  // eslint-disable-next-line camelcase
  req_eventlist
} from '@/api'
export default {
  name: 'allPolicy',
  components: {
    mySearch, myOption, myTable, myPagination, datePicker
  },
  data: function () {
    return {
      tableData: [],
      tHead: [{
        label: '序号', // 表头
        state: true, // 是否显示列
        isCustom: true, // 是否自定义
        type: 'index', // type 类型

        slotName: 'index',
        prop: 'date',
        sortable: false // 是否排序
      },
      {
        label: 'ID',
        prop: 'id',
        state: true,
        isCustom: false,
        slotName: 'id',
        width: 40

      },
      {
        label: 'operation_feature',
        prop: 'operation_feature',
        state: true,
        isCustom: false,
        slotName: 'operation_feature',
        width: 70
      },
      {
        label: 'operation_name',
        prop: 'operation_name',
        state: true,
        isCustom: false,
        slotName: 'operation_name',
        width: 100
      },
      {
        label: 'policyID',
        prop: 'policyID',
        state: true,
        isCustom: false,
        slotName: 'policyID',
        width: 80
      },
      {
        label: 'repeat',
        prop: 'repeat',
        state: true,
        isCustom: false,
        slotName: 'repeat',
        width: 80
      },
      {
        label: 'start_time',
        prop: 'start_time',
        state: true,
        isCustom: false,
        slotName: 'start_time',
        width: 100
      },
      {
        label: 'status',
        prop: 'status',
        state: true,
        isCustom: false,
        slotName: 'status',
        width: 60
      },
      {
        label: 'tag_status',
        prop: 'tag_status',
        state: true,
        isCustom: false,
        slotName: 'user',
        width: 60
      },
      {
        label: 'user',
        prop: 'user',
        state: true,
        isCustom: false,
        slotName: 'user',
        width: 60
      }
      ],
      pagination: {

        page: 1, // 当前页码默认为
        size: 10, // 当前页码默认显示数据为15

        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      initTableParams: {
        page: 0, // 当前页码默认为
        size: 10, // 当前页码默认显示数据为15
        status: 0// 事件状态 0全部 1已上报事件等 可选
      },
      initSearchParams: {
        page: 0,
        size: '每页记录数', // 可选
        start_time: '开始时间',
        end_time: '结束时间',
        params: {
          operation_name: 'xxxx', // 执行对象
          status: 1
        }

      }
    }
  },
  created () {
    this.initTable()
  },

  methods: {
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
      const result = await req_eventlist(data)
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
      console.log(type, val)
    },
    /** *********************************************日期选择*************************************** */
    timeChange () {

    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
