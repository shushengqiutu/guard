<template>
  <div class="program">
    <div class='operation'>

      <div class='search'>
        <!-- 占时不支持搜索 -->
        <!-- <my-search @paramsChange='paramsChange'> </my-search> -->
      </div>

    </div>
    <div class='tableWarp'>
      <div class='func'>
        <my-option v-if='btn_delete'
                   icon='icon iconfont iconshanchu2'
                   text='删除'
                   :class="selectData.length ? '' : 'notClick'"
                   @click.native="deleteData"> </my-option>
        <my-option v-if='btn_addUsb'
                   icon='icon iconfont iconxinzeng'
                   :class="initTableParams.policyID ===-1 ? 'notClick' : ''"
                   text='追加USB'
                   @click.native="addUsb"> </my-option>
      </div>
      <my-table :tableData='tableData'
                :tHead='tHead'
                :tableHeight="'430'"
                :checkBox='true'
                @chooseData="chooseData">
        <el-table-column slot="index"
                         type="index"
                         label="序号"
                         :width="60">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
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
    <!-- 追加USB -->
    <add-usb :usbDrawer="usbDrawer"
             :policyID="initTableParams.policyID "
             @changeUsbDrawer="changeUsbDrawer"
             @isSuccess='isSuccess'></add-usb>
  </div>

</template>
<script>
import cars from '@/component/cars/'
import mySearch from '@/component/search/'
import myOption from '@/component/option/'
import myTable from '@/component/table/'
import myPagination from '@/component/pagination/'
import addUsb from '@/component/addUsb/'
import {

  // eslint-disable-next-line camelcase
  req_ShowPolicyList, req_ShowWhiteUsbNetList, req_delCurrentPolicy
} from '@/api'
export default {
  name: 'usb',
  props: {
    // 是否显示删除按钮
    btn_delete: {
      type: Boolean,
      default: false
    },
    // 是否显示追加usb
    btn_addUsb: {
      type: Boolean,
      default: false
    }
  },
  components: {
    cars, mySearch, myOption, myTable, myPagination, addUsb
  },
  data: function () {
    return {
      usbDrawer: false,
      selectData: [],
      filtersWarpOpen: false,
      tableData: [],
      pagination: {
        isShow: true,
        page: 1,
        size: 13,
        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      initTableParams: {
        page: 0,
        size: 13,
        policyID: -1,
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
          with: 200

        },
        {
          label: '描述',
          prop: 'desc',
          state: true,
          isCustom: false,
          slotName: 'desc'

        }
      ]

    }
  },
  created () {
    this.firstInintTable()
  },

  methods: {
    /** ***********************************追加usb***********************************************/
    addUsb () {
      this.usbDrawer = true
    },
    changeUsbDrawer (v) {
      this.usbDrawer = v
    },
    // 追加USb成功，表格刷新
    isSuccess (Bool) {
      if (Bool) {
        this.initTable()
      }
    },
    /** ***********************************删除***********************************************/
    deleteData () {
      this.$confirm({
        type: '提示',
        msg: '你确定要删除选中USB？',
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(res => {
        let usblist = []
        for (let i = 0; i < this.selectData.length; i++) {
          usblist.push(parseInt(this.selectData[i].id))
        }
        let params = {
          'cmdlist': [{
            'cmd': 132361,
            'ncmd': 'deleteWhitelist',
            'data': {
              'policyID': this.initTableParams.policyID,
              'usblist': usblist
            }
          }]
        }
        req_delCurrentPolicy(params).then(res => {
          if (res.results.status) {
            this.initTable()
            this.$msg({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$msg({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      })
    },
    // 获取复选框选中的数据
    chooseData (data) {
      this.selectData = data
    },
    /** ********************************************************************************** */
    // 第一次初始化数据
    firstInintTable () {
      let result = this.getRouterPolicyID()
      if (result) {
        this.initTable()
      } else {
        this.getpolicyID().then(policyID => {
          this.initTableParams.policyID = parseInt(policyID)
          if (policyID) {
            this.initTable()
          } else {
            return false
          }
        })
      }
    },
    // 获取当前策略id
    async getpolicyID () {
      const result = await req_ShowPolicyList({
        page: 0, // 第几页 0为第一页
        size: 10, // 每页记录数，可选参数
        status: 1
        // type: '' // 可选参数 1为当前策略
      })
      if (result.results.list) {
        let policyID = result.results.list[0].policyID
        return policyID
      } else {
        return false
      }
    },
    // 判断路由是否携带 policyID 路由有根据policyID加载数据
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
