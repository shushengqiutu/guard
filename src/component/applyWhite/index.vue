// 选择本地目录
<template>

  <div>
    <el-drawer title="应用内置白名单"
               :visible.sync="newDrawer"
               custom-class='applyWhite'
               :append-to-body='true'
               size="40%"
               :wrapperClosable="false"
               ref="drawer">
      <div class="demo-drawer__content">
        <div>
          <span>当前选中系统版本：</span>
          <p>{{version}}</p>
        </div>
        <div>
          <span> 可应用策略列表</span>
        </div>
        <!-- 所有策略表格 -->
        <my-table :tableData='tableData'
                  :tHead='tHead'
                  :tableHeight="'320'"
                  :radioBox='true'
                  @changeRadioData='changeRadioData'>

          <!-- 序号 -->
          <el-table-column slot="index"
                           type="index">
            <template slot-scope="scope">
              {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
            </template>
          </el-table-column>
          <!-- 策略名称 -->
          <el-table-column slot="icon"
                           label="状态"
                           :width="39">
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

        </my-table>
        <div class='myPaginationWarp'
             v-if="pagination.isShow">
          <myPagination ref="pagination"
                        :page='pagination.page'
                        :size='pagination.size'
                        :total='pagination.total'
                        :totalWarp='false'
                        @paginationChange='paginationChange'>
          </myPagination>
        </div>
        <div>
          <span class="btn"
                type="botton"
                :class="radioData.policyID ? '' : 'notClick'"
                @click="apply"> 应用</span>
          <span class="btn"
                type="botton"> 取消</span>
        </div>
      </div>
    </el-drawer>

  </div>

</template>

<script>
// eslint-disable-next-line camelcase

import {
  // eslint-disable-next-line camelcase
  req_ShowPolicyList, req_applycreditwhitelist
} from '@/api'
import myTable from '@/component/table/'
import myPagination from '@/component/pagination/'
export default {
  name: 'applyWhite',
  components: {
    myTable, myPagination
  },
  props: {
    version: {
      type: String,
      default: ''
    },
    applyWhiteDrawer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    newDrawer: {
      get () {
        return this.applyWhiteDrawer
      },
      set (v) {
        this.$emit('changeApplyWhiteDrawer', v)
      }
    }
  },
  data () {
    return {
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
        }
      ]

    }
  },
  created () {
    this.initTable()
  },
  mounted () {

  },
  methods: {
    /** ***********应用白名单确定******************************* */
    apply () {
      if (this.radioData.policyID) {
        this.$confirm({
          type: '提示',
          msg: '你确定要应用当前选中版本到此策略吗？',
          btn: {
            ok: '确定',
            no: '取消'
          }
        }).then(res => {
          let params = {
            pid: this.radioData.policyID,
            os_version: this.version
          }
          req_applycreditwhitelist(params).then(res => {
            if (res.results.status) {
              this.newDrawer = false
              this.$msg({
                message: '应用成功',
                type: 'success'
              })
            } else {
              this.$msg({
                message: '应用失败',
                type: 'error'
              })
            }
          })
        })
      } else {
        console.log('么有选中policyID')
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
    // 储存单选数据
    changeRadioData (row) {
      this.radioData = row
    }

  },
  watch: {
    policyID (id) {
      this.form.policyID = id
    }
  }

}

</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
