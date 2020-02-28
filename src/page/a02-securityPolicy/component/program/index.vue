<template>
  <div class="program">
    <div class='operation'>

      <div class='search'>

        <my-search @paramsChange='paramsChange'> </my-search>
      </div>

    </div>
    <div class='tableWarp'>
      <div class='func'>
        <my-option icon='icon iconfont iconshanchu2'
                   text='删除'
                   @click.native="deleteData"> </my-option>

        <my-option icon='icon iconfont iconxinzeng'
                   text='追加目录'
                   @click.native='addList'> </my-option>
        <my-option icon='icon iconfont iconxinzeng'
                   text='追加文件'
                   @click.native='addFlie'> </my-option>
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
    <choose-path :drawer="listDrawer"
                 @changeDrawer="changeDrawer"
                 :policyID="initTableParams.policyID">
    </choose-path>
    <add-flie :drawer="flieDrawer"
              :type='1'
              :policyID="initTableParams.policyID "
              @changeFlieDrawer="changeFlieDrawer">
    </add-flie>
  </div>

</template>
<script>
import cars from '@/component/cars/'
import mySearch from '@/component/search/'
import myOption from '@/component/option/'
import myTable from '@/component/table/'
import myPagination from '@/component/pagination/'
import choosePath from '@/component/choosePath/'
import addFlie from '@/component/addFlie/'
import {

  // eslint-disable-next-line camelcase
  req_ShowPolicyList, req_ShowWhiteList, req_delCurrentPolicy, req_scanStatus
} from '@/api'
export default {
  name: 'program',

  components: {
    cars, mySearch, myOption, myTable, myPagination, choosePath, addFlie
  },
  data: function () {
    return {
      selectData: [],
      listDrawer: false,
      flieDrawer: false,
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
        type: 3,
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
          label: '文件名',
          prop: 'name',
          state: true,
          isCustom: false,
          slotName: 'name',
          width: 100
        },
        {
          label: '全路径',
          prop: 'file',
          state: true,
          isCustom: false,
          slotName: 'file',
          width: 150
        },
        {
          label: '描述',
          prop: 'desc',
          state: true,
          isCustom: false,
          slotName: 'desc',
          width: 150
        },
        {
          label: '文件签名',
          prop: 'file_cert',
          state: true,
          isCustom: true,
          slotName: 'file_cert',
          width: 80
        },

        {
          label: '文件类型',
          prop: 'file_type',
          state: true,
          isCustom: true,
          slotName: 'file_type',
          width: 80
        },

        {
          label: 'MD5',
          prop: 'md5',
          state: true,
          isCustom: false,
          slotName: 'md5',
          width: 80
        },
        {
          label: '文件大小',
          prop: 'size',
          state: true,
          isCustom: false,
          slotName: 'size'

        }]

    }
  },
  created () {
    this.firstInintTable()
  },

  methods: {
    // 追加目录
    addList () {
      this.getScanStatus().then(res => {
        if (res) {
          this.clearPolicyID()
          this.listDrawer = true
        } else {
          this.$confirm({
            type: '提示',
            msg: '当前有扫描任务正在进行中，请等待本次扫描结束，或前往智能扫描关闭后再追加',
            btn: {
              ok: '确定',
              no: '取消'
            }
          })
        }
      })
    },
    // 有policyId 就删除
    clearPolicyID () {
      let policyID = parseInt(localStorage.getItem('policyId'))
      if (policyID) {
        localStorage.removeItem('policyId')
      }
    },
    // 获取扫描状态
    async getScanStatus (id) {
      let policyID = parseInt(localStorage.getItem('policyId'))
      if (policyID) {
        let result = await req_scanStatus({ policyID })
        if (result.results.progres === 100) {
          return true // 扫描完成
        } else {
          return false // 有任务正在扫描
        }
      } else {
        // 没有任务扫描
        return new Promise(resolve => {
          resolve(true)
        })
      }
    },
    // 追加文件
    addFlie () {
      this.flieDrawer = true
    },
    // 删除
    deleteData () {
      if (this.selectData.length) {
        let filelist = []
        for (let i = 0; i < this.selectData.length; i++) {
          filelist.push(this.selectData[i].id)
        }
        let params = {
          'cmdlist': [{
            'cmd': 132361,
            'ncmd': 'deleteWhitelist',
            'data': {
              'policyID': this.initTableParams.policyID,
              'filelist': filelist
            }
          }]
        }
        req_delCurrentPolicy(params).then(res => {
          if (res.results.status) {
            this.initTable()
          }
        })
      } else {

      }
    },
    // 获取复选框选中的数据
    chooseData (data) {
      this.selectData = data
    },
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
        status: 1,
        type: '' // 可选参数 1为当前策略
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
    changeDrawer (v) {
      this.drawer = v
    },
    changeFlieDrawer (v) {
      this.flieDrawer = v
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
