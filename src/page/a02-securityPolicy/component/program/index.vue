<template>
  <div class="program">
    <div class='operation'>

      <div class='search'>

        <my-search @paramsChange='paramsChange'> </my-search>
      </div>

    </div>
    <div class='tableWarp'>
      <div class='func'>
        <my-option v-if='btn_delete'
                   icon='icon iconfont iconshanchu2'
                   text='删除'
                   :class="selectData.length ? '' : 'notClick'"
                   @click.native="deleteData"> </my-option>

        <my-option v-if='btn_addDir'
                   icon='icon iconfont iconxinzeng'
                   text='追加目录'
                   :class="initTableParams.policyID ===-1 ? 'notClick' : ''"
                   @click.native='addList'> </my-option>
        <my-option v-if='btn_addFile'
                   icon='icon iconfont iconxinzeng'
                   text='追加文件'
                   :class="initTableParams.policyID ===-1 ? 'notClick' : ''"
                   @click.native='addFlie'> </my-option>
      </div>
      <my-table :tableData='tableData'
                :tHead='tHead'
                :tableHeight="'430'"
                :checkBox='true'
                @chooseData="chooseData">
        <el-table-column slot="index"
                         type="index">
          <template slot-scope="scope">
            {{initTableParams.page * initTableParams.size + scope.$index+ 1}}
          </template>
        </el-table-column>

        <el-table-column label="全路径"
                         slot="file"
                         prop="file"
                         :width="200">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.file"
                        placement="top-start">
              <span>{{scope.row.file|filterFile(28)}} </span>
            </el-tooltip>

          </template>
        </el-table-column>

        <el-table-column label="文件签名"
                         show-overflow-tooltip
                         slot="file_cert"
                         prop="file_cert"
                         :width="65">
          <template slot-scope="scope">
            {{scope.row.file_cert||'暂无'  }}
          </template>
        </el-table-column>
        <el-table-column label="文件大小"
                         slot="size"
                         prop="size"
                         :width="65">
          <template slot-scope="scope">
            {{scope.row.size|filterSize }}
          </template>
        </el-table-column>
        <!-- 自定义展开列 -->
        <el-table-column slot="expand"
                         type="expand"
                         :width="30">
          <template slot-scope="props">
            <el-form label-position="left"
                     class="securityPolicy">
              <el-form-item label="文件名">
                <span>{{ props.row.name||'暂无' }}</span>
              </el-form-item>
              <el-form-item label="全路径">
                <span>{{ props.row.file ||'暂无'}}</span>
              </el-form-item>

              <el-form-item label="指纹特征">
                <span>{{ props.row.md5 ||'暂无'}}</span>
              </el-form-item>
              <el-form-item label="文件类型">
                <span>{{ props.row.file_type ||'暂无'}}</span>
              </el-form-item>
              <el-form-item label="文件描述">
                <span>{{ props.row.desc ||'暂无'}}</span>
              </el-form-item>
              <el-form-item label="文件大小">
                <span>{{ props.row.size|filterSize}}</span>
              </el-form-item>
              <el-form-item label="文件签名">
                <span>{{ props.row.file_cert||'暂无'}}</span>
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
    <choose-path :drawer="listDrawer"
                 @changeDrawer="changeDrawer"
                 :policyID="initTableParams.policyID">
    </choose-path>
    <add-flie :drawer="flieDrawer"
              :type='1'
              @isSuccess='isSuccess'
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
  props: {
    // 是否显示删除按钮
    btn_delete: {
      type: Boolean,
      default: false
    },
    // 是否显示追加目录按钮
    btn_addDir: {
      type: Boolean,
      default: false
    },
    // 是否显示追加文件按钮
    btn_addFile: {
      type: Boolean,
      default: false
    }
  },
  components: {
    cars, mySearch, myOption, myTable, myPagination, choosePath, addFlie
  },
  computed: {
    policyID: {
      get () {
        return this.initTableParams.policyID
      },
      set (v) {
        this.$emit('policyIdchange', v)
      }
    }
  },
  data: function () {
    return {
      selectData: [], // 保存复选对象
      listDrawer: false, // 追加目录弹窗
      flieDrawer: false, // 追加问价弹窗
      tableData: [], // 表格数据
      // 分页参数
      pagination: {
        isShow: true,
        page: 1,
        size: 13,
        pageSizesArr: [10, 20, 30, 40, 50], // 可选分页
        total: null // 总数据默认条数
      },
      // 渲染表格参数
      initTableParams: {
        page: 0,
        size: 13,
        policyID: -1,
        type: 1,
        params: {

        }

      },
      // 配置表格渲染字段
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
          width: 150
        },
        {
          label: '全路径',
          prop: 'file',
          state: true,
          isCustom: true,
          slotName: 'file'

        },
        {
          label: '描述',
          prop: 'desc',
          state: false,
          isCustom: false,
          slotName: 'desc',
          width: 150
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
          label: '指纹特征',
          prop: 'md5',
          state: true,
          isCustom: false,
          slotName: 'md5',
          width: 75
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
          label: '文件大小',
          prop: 'size',
          state: true,
          isCustom: true,
          slotName: 'size'

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
    this.firstInintTable()
  },

  methods: {
    /** *************************************** 删除************************************/

    deleteData () {
      this.$confirm({
        type: '提示',
        msg: '你确定要删除选中程序？',
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(res => {
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

    /** *************************************** 追加目录************************************/

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
    changeDrawer (v) {
      this.listDrawer = v
    },
    // 有policyId 就删除
    clearPolicyID () {
      let policyID = parseInt(localStorage.getItem('policyId'))
      if (policyID) {
        localStorage.removeItem('policyId')
      }
    },
    /** ***************************************追加文件************************************/
    // 追加文件
    addFlie () {
      this.flieDrawer = true
    },
    changeFlieDrawer (v) {
      this.flieDrawer = v
    },
    // 追加成功，表格刷新
    isSuccess (Bool) {
      if (Bool) {
        this.initTable()
      }
    },
    /** *********************************************根据路由加载数据*************************************** */
    // 判断路由是否携带 policyID 路由有根据policyID加载数据
    getRouterPolicyID () {
      let policyID = this.$route.query.policyID

      if (policyID === 0 || policyID) {
        this.initTableParams.policyID = parseInt(policyID)
        this.policyID = parseInt(policyID)
        return true
      } else {
        return false
      }
    },
    // 没有policyID则默认为当前策略 获取当前策略policyID加载数据

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
        this.policyID = parseInt(policyID)
        return policyID
      } else {
        return false
      }
    },
    /** *********************************************表格初始化*************************************** */
    // 根据有无policyID选择加载当前策略还是其他策略数据方案
    firstInintTable () {
      // policyID
      let result = this.getRouterPolicyID()
      if (result) {
        this.initTable()
      } else {
        // 没有策略id
        this.getpolicyID().then(policyID => {
          if (policyID) {
            this.initTableParams.policyID = parseInt(policyID)
            this.initTable()
          } else {
            return false
          }
        })
      }
    },
    // 表格初始化主函数
    initTable () {
      this.getTableData(this.initTableParams)
        .then(res => {
          this.setTableData(res.results.list, res.results.total)
        })
    },
    // 获取表格数据
    async getTableData (data) {
      const result = await req_ShowWhiteList(data)
      return result
    },
    // 处理表格数据
    setTableData (data, total) {
      this.tableData = data
      this.pagination.total = total
    },

    /** *********************************************搜索功能*************************************** */
    // 搜索主函数
    paramsChange (type, val) {
      if (type === 'key') {
        if (val) {
          this.initTableParams.params[type] = val
        } else {
          delete (this.initTableParams.params[type])
        }
      }

      this.paramsChangeTableInit()
    },
    // 重新渲染分页
    paramsChangeTableInit () {
      this.pagination.page = 1
      this.pagination.size = 13
      this.initTableParams.page = 0
      this.initTableParams.size = 13
      this.initTable()
      this.pagination.isShow = false// 让分页隐藏
      this.$nextTick(() => { // 重新渲染分页
        this.pagination.isShow = true
      })
    },
    /** *******************************************分页数据改变*************************************** */
    paginationChange (type, val) {
      if (type === 'page') {
        val = val - 1
      }
      this.initTableParams[type] = val
      this.initTable()
    }

  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
