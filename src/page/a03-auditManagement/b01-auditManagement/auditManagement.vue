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
        <filters @paramsChange='paramsChange'
                 :enventTypeSelect='true'></filters>
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
                :tableHeight="'465'"
                :checkBox='false'>
        <el-table-column slot="index"
                         type="index"
                         align="right"
                         :width="42">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>

        <el-table-column slot="operation_name"
                         prop="operation_name"
                         label="执行对象"
                         :width="200">
          <template slot-scope="scope">

            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.operation_name"
                        placement="top-start">
              <span>{{scope.row.operation_name|filterFile(28)}} </span>
            </el-tooltip>
          </template>

        </el-table-column>
        <el-table-column slot="operation_feature"
                         prop="operation_feature"
                         label="指纹特征"
                         :width="80">
          <template slot-scope="scope">

            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.operation_feature"
                        placement="top-start">
              <span>{{scope.row.operation_feature?
                scope.row.operation_feature.substring(0,8)+'...':
                '暂无'}} </span>
            </el-tooltip>
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

        <el-table-column slot="event_type"
                         prop="event_type"
                         label="事件类型"
                         :width="80">
          <template slot-scope="scope">

            <span>{{scope.row.event_type|filterEventType}}</span>
          </template>

        </el-table-column>
        <el-table-column slot="tag_status"
                         prop="tag_status"
                         label="用户是否确认"
                         :width="80">
          <template slot-scope="scope">

            <span>{{scope.row.tag_status|filterTagStatus}}</span>
          </template>

        </el-table-column>

        <el-table-column slot="link"
                         label="操作"
                         :width="70">
          <template slot-scope="scope">
            <!-- 在授信就不出现按钮 -->
            <!-- 在当前不在授信出现授信 -->
            <!-- 都不在都出现 -->
            <span class="link"
                  v-if="!scope.row.credit_policy"
                  @click="addCredit(scope.row)">授信</span>
            <span class="link"
                  v-if="!scope.row.current_policy"
                  @click="addcurrent(scope.row)">授权</span>
          </template>
        </el-table-column>
        <!-- 自定义展开列 -->
        <el-table-column slot="expand"
                         type="expand"
                         :width="30">
          <template slot-scope="props">
            <el-form label-position="left"
                     class="securityPolicy">
              <el-form-item label="执行对象">
                <span>{{ props.row.operation_name}}</span>
              </el-form-item>
              <el-form-item label="指纹特征">
                <span>{{ props.row.operation_feature||'暂无'}}</span>
              </el-form-item>
              <el-form-item label=" 事件类型">
                <span>{{ props.row.event_type|filterEventType}}</span>
              </el-form-item>
              <el-form-item label=" 重复次数">
                <span>{{ props.row.repeat||'暂无'}}</span>
              </el-form-item>
              <el-form-item label="用户名称">
                <span>{{ props.row.user||'暂无'}}</span>
              </el-form-item>
              <el-form-item label=" 开始时间">
                <span>{{ props.row.start_time||'暂无'}}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{ props.row. end_time ||'暂无'}}</span>
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
  req_eventquery, req_ShowPolicyList, req_addWhileList
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
        size: 14,
        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      initTableParams: {
        page: 0,
        size: 14, // 可选
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

          slotName: 'index',
          prop: 'date',
          sortable: false // 是否排序
        },

        {
          label: '执行对象',
          prop: 'operation_name',
          state: true,
          isCustom: true,
          slotName: 'operation_name'

        },
        {
          label: '事件类型',
          prop: 'event_type',
          state: true,
          isCustom: true,
          slotName: 'event_type',
          width: 80
        },
        {
          label: '指纹特征',
          prop: 'operation_feature',
          state: true,
          isCustom: true,
          slotName: 'operation_feature',
          width: 75

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
          label: '上报状态',
          prop: 'status',
          state: false,
          isCustom: true,
          slotName: 'status',
          width: 80
        },

        {
          label: '用户是否确认',
          prop: 'tag_status',
          state: false,
          isCustom: true,
          slotName: 'tag_status',
          width: 80
        },

        {
          label: '用户',
          prop: 'user',
          state: false,
          isCustom: false,
          slotName: 'user',
          width: 80
        },
        {
          label: '重复次数',
          prop: 'repeat',
          state: true,
          isCustom: false,
          slotName: 'repeat'

        },
        {
          label: '开始时间',
          prop: 'start_time',
          state: true,
          isCustom: false,
          slotName: 'start_time',
          width: 140

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

        }]

    }
  },
  created () {
    this.initTable()
  },

  methods: {

    /** *********************************************操作授信 授权*************************************** */
    // 授信
    addCredit (row) {
      this.$confirm({
        type: '提示',
        msg: '确定把当前文件追加到授信吗？',
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(res => {
        let params = this.getParams(0, row)
        req_addWhileList(params).then(res => {
          if (res.results.status) {
            this.initTable()
            this.$msg({
              message: '授信成功',
              type: 'success'
            })
          } else {
            this.$msg({
              message: '授信失败',
              type: 'error'
            })
          }
        })
      })
    },
    // 授权

    addcurrent (row) {
      this.$confirm({
        type: '提示',
        msg: '确定把当前文件追加到当前策略吗？',
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(res => {
        this.getpolicyID().then(res => {
          if (res) {
            let params = this.getParams(res, row)
            req_addWhileList(params).then(res => {
              if (res.results.status) {
                this.initTable()
                this.$msg({
                  message: '授权成功',
                  type: 'success'
                })
              } else {
                this.$msg({
                  message: '授权失败',
                  type: 'error'
                })
              }
            })
          } else {
            this.$msg({
              message: '授信失败,获取当前策略ID失败',
              type: 'error'
            })
          }
        })
      })
    },
    // 如果是授权 添加到当前策略
    // 获取当前策略ID
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
    // 获取下发参数
    getParams (policyID, row) {
      let data = {
        type: 1,
        policyID: policyID,
        files: []
      }
      let params = {}
      params.name = row.operation_name
      params.md5 = row.operation_feature

      params.desc = ''
      data.files.push(params)
      return data
    },
    // 如果是授信 添加到授信策略
    /** *********************************************表格*************************************** */
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
      const result = await req_eventquery(data)

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
        // 搜索
      } else if (type === 'key') {
        if (val) {
          this.initTableParams.params[type] = val
        } else {
          delete (this.initTableParams.params[type])
        }
      } else {
        this.initTableParams.params[type] = val
      }

      this.paramsChangeTableInit()
    },
    paramsChangeTableInit () {
      this.pagination.page = 1
      this.pagination.size = 14
      this.initTableParams.page = 0
      this.initTableParams.size = 14
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
