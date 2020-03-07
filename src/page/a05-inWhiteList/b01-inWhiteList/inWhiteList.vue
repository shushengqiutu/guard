<template>
  <div class="allPolicy">
    <div class='operation'
         style="display:none">

      <div class='search'>
        <!-- 搜索占时不启用 -->
        <!-- <my-search @paramsChange='paramsChange'> </my-search> -->

      </div>

    </div>
    <div class='tableWarp'>
      <div class='func'
           style="display:none">
        <!-- <my-option icon='icon iconfont iconshanchu2'
                   text='删除'> </my-option> -->
        <!-- <my-option icon='icon iconfont iconxinzeng'
                   text='添加'> </my-option> -->
      </div>
      <my-table :tableData='tableData'
                :tHead='tHead'
                :tableHeight="'504'"
                :faterRowDblclick='faterRowDblclick'>
        <el-table-column slot="index"
                         type="index"
                         align="center"
                         :width="60">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>

        <el-table-column slot="wl_type"
                         label="类型"
                         :width="100">
          <template slot-scope="scope">

            <span class="wl_type"> {{scope.row.wl_type|filterWlType}}</span>
          </template>
        </el-table-column>

        <el-table-column slot="os_type"
                         label="是否国产"
                         :width="100">
          <template slot-scope="scope">

            <span class="os_type"> {{scope.row.os_type|filterOsType}} </span>
          </template>
        </el-table-column>

        <el-table-column slot="link"
                         label="操作"
                         :width="80">
          <template slot-scope="scope">
            <span class="link"
                  @click="linkTo(scope.row.wl_type,scope.row.os_version)"> 详情</span>
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
import {

  // eslint-disable-next-line camelcase
  req_Inwhitelist
} from '@/api'
export default {
  name: 'allPolicy',

  components: {
    mySearch, myOption, myTable, myPagination
  },
  data: function () {
    return {
      ss: '',
      filtersWarpOpen: false,
      tableData: [],
      pagination: {
        isShow: true,
        page: 1,
        size: 15,
        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      initTableParams: {
        page: 0, // 第几页 0为第一页
        size: 15 // 每页记录数，可选参数

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
          label: '类型',
          prop: 'wl_type',
          state: true,
          isCustom: true,
          slotName: 'wl_type',
          width: 100
        },
        {
          label: '系统厂商',
          prop: 'os_vendor',
          state: true,
          isCustom: false,
          slotName: 'os_vendor',
          width: 100
        },
        {
          label: '是否国产',
          prop: 'os_type',
          state: true,
          isCustom: true,
          slotName: 'os_type'

        },
        {
          label: '系统版本',
          prop: 'os_version',
          state: true,
          isCustom: false,
          slotName: 'os_version'

        },
        {
          label: '操作',
          state: true,
          isCustom: true,
          slotName: 'link',
          width: 80
        }
      ]

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
          this.setTableData(res.results.list, res.results.total)
        })
    },
    // 获取表格数据
    async getTableData (data) {
      const result = await req_Inwhitelist(data)

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
    },
    // rowDblclick
    faterRowDblclick (row, column, event) {
      this.linkTo(row.wl_type, row.os_version)
    },
    // 双击Row或者点击详情
    linkTo (type, version) {
      this.$router.push({
        name: 'inWhiteListInfo',
        query: {
          wl_type: type,
          os_version: version
        }
      })
    }

  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
