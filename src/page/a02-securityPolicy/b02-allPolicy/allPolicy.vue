<template>
  <div class="allPolicy">
    <div class='operation'>

      <div class='search'>
        <!-- 搜索占时不启用 -->
        <!-- <my-search @paramsChange='paramsChange'> </my-search> -->
      </div>

    </div>
    <div class='tableWarp'>
      <div class='func'>
        <my-option icon='icon iconfont iconshanchu2'
                   @click.native="deletetPolicy"
                   text='删除'> </my-option>
        <my-option icon='icon iconfont iconxinzeng'
                   text='添加'
                   @click.native="add"> </my-option>
      </div>
      <my-table :tableData='tableData'
                :tHead='tHead'
                :tableHeight="'430'"
                :radioBox='true'
                @changeRadioData='changeRadioData'
                :faterRowDblclick='faterRowDblclick'>
        <el-table-column slot="index"
                         type="index"
                         label="序号"
                         :width="60">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>

        <el-table-column slot="link"
                         label="操作"
                         :width="80">
          <template slot-scope="scope">

            <span class="link"
                  @click="linkTo(scope.row.policyID,scope.row.status)"> 详情</span>
            <span class="link"
                  @click="edit(scope.row)">编辑</span>
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
    <el-drawer title="策略名称"
               :visible.sync="drawer"
               :wrapperClosable="false">
      <el-form ref="form"
               label-width="80px"
               size="mini">
        <el-form-item label="策略名称">
          <el-input v-model="policyName"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary"
                     @click="onSubmit">确定</el-button>
          <el-button @click="closeDrawer">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>

</template>

<script>

import mySearch from '@/component/search/'
import myOption from '@/component/option/'
import myTable from '@/component/table/'
import myPagination from '@/component/pagination/'
import {

  // eslint-disable-next-line camelcase
  req_ShowPolicyList, req_deleteWhiteListPolicy, req_addWhiteList, req_updataWhiteList
} from '@/api'
export default {
  name: 'allPolicy',

  components: {
    mySearch, myOption, myTable, myPagination
  },
  data: function () {
    return {
      drawer: false,
      actionFlag: '',
      policyName: '',
      editPolicyId: '',
      filtersWarpOpen: false,
      tableData: [],
      radioData: {},
      pagination: {
        isShow: true,
        page: 1,
        size: 10,
        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      initTableParams: {
        page: 0, // 第几页 0为第一页
        size: 10 // 每页记录数，可选参数
        // type: ''
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
          label: '策略名称',
          prop: 'policyName',
          state: true,
          isCustom: false,
          slotName: 'policyName',
          width: 100
        },
        {
          label: '状态',
          prop: 'status',
          state: true,
          isCustom: false,
          slotName: 'status',
          width: 50
        },
        {
          label: '描述',
          prop: 'desc',
          state: true,
          isCustom: false,
          slotName: 'desc'

        },
        {
          label: '修改时间',
          prop: 'modify_time',
          state: true,
          isCustom: false,
          slotName: 'modify_time',
          width: 80
        },

        {
          label: '类型',
          prop: 'type',
          state: true,
          isCustom: true,
          slotName: 'type',
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
    // 编辑
    edit (val) {
      this.actionFlag = 'edit'
      this.drawer = true
      this.editPolicyId = val.policyID
      this.policyName = val.policyName
    },
    // 提交按钮
    onSubmit () {
      if (this.actionFlag === 'add') {
        let params = {
          cmdlist: [{
            cmd: 132363,
            ncmd: 'CreatePolicy',
            data: {
              name: this.policyName
            }
          }]
        }
        req_addWhiteList(params).then(res => {
          if (res.results.status) {
            this.drawer = false
            this.initTable()
          } else {

          }
        })
      } else {
        let params = {
          cmdlist: [{
            cmd: 132357,
            ncmd: 'updatePolicy',
            data: {
              policyID: this.editPolicyId,
              name: this.policyName
            }
          }]
        }
        req_updataWhiteList(params).then(res => {
          if (res.results.status) {
            this.drawer = false
            this.initTable()
          } else {

          }
        })
      }
    },
    // 取消
    closeDrawer () {
      this.drawer = false
      this.policyName = ''
    },
    add () {
      this.actionFlag = 'add'
      this.drawer = true
    },
    /** *********************************************表格*************************************** */
    // 删除策略
    async deletetPolicy () {
      let params = { policyID: this.radioData.policyID }
      const result = await req_deleteWhiteListPolicy(params)

      if (result.results.status === 'true') {
        // 删除成功
        this.initTable()
      } else {
        // 删除失败
      }
    },
    // 储存单选数据
    changeRadioData (row) {
      this.radioData = row
    },
    // 表格初始化
    initTable () {
      this.getTableData(this.initTableParams)
        .then(res => {
          this.setTableData(res.results.list, res.results.total)
        })
    },
    // 获取表格数据
    async getTableData (data) {
      const result = await req_ShowPolicyList(data)
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
      this.linkTo(row.policyID, row.status)
      console.log(row, column, event, 99)
    },
    // 双击Row或者点击详情
    linkTo (policyID, status) {
      if (policyID === 0 && status !== 1) {
        // 去授信策略
        this.$router.push({
          name: 'creditPolicy',
          query: {
            policyID: 0
          }
        })
      } else if (policyID !== 0 && status === 1) {
        // 去当前策略
        this.$router.push({
          name: 'securityPolicy',
          query: {
            policyID: policyID
          }
        })
      } else {
        this.$router.push({
          name: 'policyInfo',
          query: {
            policyID: policyID
          }
        })
      }
    }

  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
