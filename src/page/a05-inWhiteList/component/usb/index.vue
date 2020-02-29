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
                   text='追加'> </my-option>
      </div>
      <my-table :tableData='tableData'
                :tHead='tHead'
                :tableHeight="'430'"
                :checkBox='true'>
        <el-table-column slot="index"
                         type="index"
                         label="序号"
                         :width="60">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>

        <!-- <el-table-column slot="status"
                         prop="status"
                         label="上报状态"
                         :width="80">
          <template slot-scope="scope">

            <span>{{scope.row.status|filterStatus}}</span>
          </template>

        </el-table-column> -->

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
  req_ShowPolicyList, req_ShowWhiteUsbNetList
} from '@/api'
export default {
  name: 'program',

  components: {
    cars, mySearch, myOption, myTable, myPagination
  },
  data: function () {
    return {
      ss: '',
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
        size: 10,
        policyID: 0,
        type: 2

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
          label: 'U盘名称',
          prop: 'name',
          state: true,
          isCustom: false,
          slotName: 'name',
          width: 100
        },
        {
          label: '全路径',
          prop: 'file',
          state: false,
          isCustom: false,
          slotName: 'file',
          width: 150
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
          label: '描述',
          prop: 'desc',
          state: true,
          isCustom: false,
          slotName: 'desc'

        },
        {
          label: '文件签名',
          prop: 'file_cert',
          state: false,
          isCustom: true,
          slotName: 'file_cert',
          width: 80
        },

        {
          label: '文件类型',
          prop: 'file_type',
          state: false,
          isCustom: true,
          slotName: 'file_type',
          width: 80
        },

        {
          label: 'MD5',
          prop: 'md5',
          state: false,
          isCustom: false,
          slotName: 'md5',
          width: 80
        },
        {
          label: '文件大小',
          prop: 'size',
          state: false,
          isCustom: false,
          slotName: 'size'

        }]

    }
  },
  created () {
    this.firstInintTable()
  },

  methods: {
    // 第一次初始化数据
    firstInintTable () {
      let result = this.getRouterPolicyID()
      if (result) {
        this.initTable()
      } else {
        this.getpolicyID().then(policyID => {
          if (policyID) {
            this.initTable()
          }
        })
      }
    },
    // 判断路由是否携带 policyID
    getRouterPolicyID () {
      let policyID = this.$route.query.policyID

      console.log(policyID, this.$route)
      if (policyID === 0 || policyID) {
        this.initTableParams.policyID = parseInt(policyID)
        return true
      } else {
        return false
      }
    },
    // 获取策略Id
    async getpolicyID () {
      const result = await req_ShowPolicyList({

        page: 0, // 第几页 0为第一页
        size: 10, // 每页记录数，可选参数
        status: 1, // 可选参数 1为当前策略
        type: ''
      })
      let policyID = result.results.list[0].policyID
      if (policyID) {
        this.initTableParams.policyID = policyID
        return policyID
      }
    },

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
      const result = await req_ShowWhiteUsbNetList(data)
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
