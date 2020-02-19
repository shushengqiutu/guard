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
      <my-table :tableData='tableData'
                :tHead='tHead'
                :checkBox='false'>
        <el-table-column slot="index"
                         type="index"
                         label="序号"
                         :width="60">
          <template slot-scope="scope">
            {{(initParams.page - 1) * initParams.size + scope.$index+ 1}}
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
      tableData: [],
      tHead: [{
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
        label: '行为',
        prop: 'action',
        state: true,
        isCustom: false,
        slotName: 'action',
        width: 200
      },
      {
        label: '描述',
        prop: 'desc',
        state: true,
        isCustom: false,
        slotName: 'desc',
        width: 200
      },
      {
        label: '模型',
        prop: 'module',
        state: true,
        isCustom: false,
        slotName: 'module',
        width: 100
      },
      {
        label: '时间',
        prop: 'operate_time',
        state: true,
        isCustom: false,
        slotName: 'operate_time',
        width: 150
      }
      ],
      pagination: {

        page: 1, // 当前页码默认为
        size: 10, // 当前页码默认显示数据为15

        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      initParams: {
        page: 1, // 当前页码默认为
        size: 10 // 当前页码默认显示数据为15
      }
    }
  },
  created () {
    this.initTable()
  },
  components: {
    cars, mySearch, myOption, myTable, myPagination
  },
  methods: {
    // 表格初始化
    initTable () {
      this.getTableData(this.initParams)
        .then(res => {
          this.setTableData(res.results.loglist, res.results.total)
        })
    },
    // 获取表格数据
    async getTableData (data) {
      const result = await req_operateloglist(data)
      return result
    },
    // 处理数据
    setTableData (data, total) {
      this.tableData = data
      this.pagination.total = total
    },
    paginationChange (type, val) {
      this.initParams[type] = val
      this.initTable()
      console.log(type, val)
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
