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
                   @click.native="deleteMain"
                   :class="radioData.policyID ? '' : 'notClick'"
                   text='删除'> </my-option>
        <my-option icon='icon iconfont iconxinzeng'
                   text='添加'
                   @click.native="add"> </my-option>
      </div>
      <my-table :tableData='tableData'
                :tHead='tHead'
                :tableHeight="'462'"
                :radioBox='true'
                @changeRadioData='changeRadioData'
                :faterRowDblclick='faterRowDblclick'>

        <!-- 序号 -->
        <el-table-column slot="index"
                         type="index">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>
        <!-- 策略名称 -->
        <el-table-column slot="icon"
                         label=""
                         :width="19">
          <template slot-scope="scope">
            <img v-if='scope.row.status===1'
                 title="已部署"
                 src="@/assets/img/theme1/a02-securityAudit/b02-allPolicy/img/deploy@2x.png"
                 width="14">

          </template>
        </el-table-column>
        <el-table-column slot="policyName"
                         label="策略名称">
          <template slot-scope="scope">
            {{scope.row.policyName||'暂无'}}
          </template>
        </el-table-column>
        <!--
                 策略类型
                 -->
        <el-table-column slot="type"
                         label="类型"
                         :width="100">
          <template slot-scope="scope">
            {{scope.row.type|filterType}}
          </template>
        </el-table-column>

        <el-table-column slot="modify_time"
                         label="修改时间"
                         :width="135">
          <template slot-scope="scope">
            {{scope.row.modify_time||'暂无'}}
          </template>
        </el-table-column>

        <el-table-column slot="link"
                         label="操作"
                         :width="125">
          <template slot-scope="scope">

            <span class="link"
                  @click="linkTo(scope.row.policyID,scope.row.status)"> 详情</span>
            <span class="link"
                  @click="edit(scope.row)">编辑</span>
            <span class="link"
                  @click="seclectDeploy(scope.row)">{{scope.row.status===1?'取消部署':'部署'}}</span>
          </template>
        </el-table-column>
        <!-- 自定义展开列 -->
        <el-table-column slot="expand"
                         type="expand"
                         :width="30">
          <template slot-scope="props">
            <el-form label-position="left"
                     class="securityPolicy">
              <el-form-item label="策略名称">
                <span>{{ props.row.policyName}}</span>
              </el-form-item>
              <el-form-item label="策略类型">
                <span>{{ props.row.type|filterType}}</span>
              </el-form-item>
              <el-form-item label="策略状态">
                <span>{{ props.row.status===1?'已部署':'未部署'}}</span>
              </el-form-item>
              <el-form-item label="用户">
                <span>{{ props.row.user||'暂无'}}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.desc||'暂无'}}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.create_time||'暂无'}}</span>
              </el-form-item>
              <el-form-item label="修改时间">
                <span>{{ props.row.modify_time||'暂无'}}</span>
              </el-form-item>
            </el-form>
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
               @close='resetForm'
               :wrapperClosable="false">
      <el-form ref="form"
               :model="form"
               label-width="80px"
               size="mini">
        <el-form-item label="策略名称"
                      prop="policyName">
          <el-input v-model="form.policyName"></el-input>
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
  req_ShowPolicyList, req_deleteWhiteListPolicy, req_addWhiteList, req_updataWhiteList, req_deploy, req_undeploy
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
      open: '',
      editPolicyId: '',
      form: {
        policyName: ''
      },
      filtersWarpOpen: false,
      tableData: [],
      radioData: {},
      pagination: {
        isShow: true,
        page: 1,
        size: 14,
        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      initTableParams: {
        page: 0, // 第几页 0为第一页
        size: 14 // 每页记录数，可选参数
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
          label: 'icon',
          prop: 'icon',
          state: true,
          isCustom: true,
          slotName: 'icon',
          width: 100
        },
        {
          label: '策略名称',

          prop: 'policyName',
          state: true,
          isCustom: true,
          slotName: 'policyName',
          width: 100
        },
        {
          label: '状态',
          prop: 'status',
          state: false,
          isCustom: false,
          slotName: 'status',
          width: 50
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
          label: '描述',
          prop: 'desc',
          state: false,
          isCustom: false,
          slotName: 'desc'

        },
        {
          label: '创建时间',
          prop: 'create_time',
          state: false,
          isCustom: false,
          slotName: 'create_time',
          width: 140
        },
        {
          label: '修改时间',
          prop: 'modify_time',
          state: true,
          isCustom: true,
          slotName: 'modify_time',
          width: 140
        },

        {
          label: '用户',
          prop: 'user',
          state: true,
          isCustom: false,
          slotName: 'user'

        },
        {
          label: '操作',
          state: true,
          isCustom: true,
          slotName: 'link',
          width: 100
        },
        // 展开项
        {
          label: '展开列',
          prop: 'expand',
          state: true,
          isCustom: true,
          slotName: 'expand'

        }
      ]

    }
  },
  created () {
    this.initTable()
  },

  methods: {
    /** ********************************策略部署**************************************/
    seclectDeploy (row) {
      if (row.status === 1) {
        this.closeDeploy(row)
      } else {
        this.deploy(row)
      }
    },
    // 部署策略
    deploy (val) {
      this.$confirm({
        type: '提示',
        msg: '你确定要部署当前策略吗？',
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(res => {
        let params = {
          cmdlist: [{
            'cmd': 132359,
            'ncmd': 'deployPolicy',
            'data': {
              'policyID': val.policyID
            }
          }]
        }
        req_deploy(params).then(res => {
          if (res.results.status) {
            this.initTable()
            this.$msg({
              message: '部署成功',
              type: 'success'
            })
          } else {
            this.$msg({
              message: '部署失败',
              type: 'error'
            })
          }
        })
      })
    },
    // 取消部署
    closeDeploy (val) {
      this.$confirm({
        type: '提示',
        msg: '你确定要取消当前部署吗？',
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(res => {
        let params = { policyID: val.policyID }
        req_undeploy(params).then(res => {
          if (res.results.status) {
            this.initTable()
            this.$msg({
              message: '取消部署成功',
              type: 'success'
            })
          } else {
            this.$msg({
              message: '取消部署失败',
              type: 'error'
            })
          }
        })
      })
    },
    // 编辑
    edit (val) {
      this.actionFlag = 'edit'
      this.drawer = true
      this.editPolicyId = val.policyID
      this.form.policyName = val.policyName
    },
    // 提交按钮
    onSubmit () {
      if (this.actionFlag === 'add') {
        let params = {
          cmdlist: [{
            cmd: 132363,
            ncmd: 'CreatePolicy',
            data: {
              name: this.form.policyName,
              type: 2 // 用户添加类型
            }
          }]
        }
        req_addWhiteList(params).then(res => {
          if (res.results.status) {
            this.drawer = false
            this.$msg({
              message: '添加成功',
              type: 'success'
            })
            this.initTable()
          } else {
            this.$msg({
              message: '添加失败',
              type: 'error'
            })
          }
        })
      } else {
        let params = {
          cmdlist: [{
            cmd: 132357,
            ncmd: 'updatePolicy',
            data: {
              policyID: this.editPolicyId,
              name: this.form.policyName
            }
          }]
        }
        req_updataWhiteList(params).then(res => {
          if (res.results.status) {
            this.drawer = false
            this.$msg({
              message: '修改成功',
              type: 'success'
            })
            this.initTable()
          } else {
            this.$msg({
              message: '修改失败',
              type: 'error'
            })
          }
        })
      }
    },
    // 取消
    closeDrawer () {
      this.drawer = false
      this.form.policyName = ''
    },
    add () {
      this.actionFlag = 'add'
      this.drawer = true
    },
    /** *********************************************删除*************************************** */
    // 删除策略
    // 储存单选数据
    changeRadioData (row) {
      this.radioData = row
    },
    deleteMain () {
      this.$confirm({
        type: '提示',
        msg: '你确定要删除选中策略吗？',
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(res => {
        this.deletetPolicy()
      })
    },
    async deletetPolicy () {
      let params = { policyID: this.radioData.policyID }
      const result = await req_deleteWhiteListPolicy(params)

      if (result.results.status === 'true') {
        // 删除成功
        this.$msg({
          message: '删除成功',
          type: 'success'
        })
        this.initTable()
      } else {
        // 删除失败
        this.$msg({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    // 重置表单
    resetForm () {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    /** *********************************************表格*************************************** */
    // 表格初始化
    initTable () {
      this.getTableData(this.initTableParams)
        .then(res => {
          if (res.results.list) {
            res.results.list.sort(function (item1, item2) {
              return item2.status - item1.status
            })
            this.setTableData(res.results.list, res.results.total)
          }
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
