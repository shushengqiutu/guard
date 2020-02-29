// 选择本地目录
<template>

  <div>
    <el-drawer title="本地目录"
               :visible.sync="newDrawer"
               :append-to-body="true"
               :wrapperClosable="false">
      <div style="height: 500px;overflow: auto">
        <el-tree :props="propsData"
                 :load="loadNode"
                 node-key="path"
                 ref="tree"
                 highlight-current
                 lazy
                 :show-checkbox='true'
                 @node-click="handleNodeClick"
                 @check="checkChoose"></el-tree>
        <el-button @click="startScan"
                   v-if="type==='dir'&&!choosePath">扫描</el-button>
        <el-button @click="addPath"
                   v-if="choosePath">添加</el-button>
        <el-button @click="getFiles"
                   v-if="type==='flie'&&!choosePath">确定</el-button>
      </div>
    </el-drawer>
  </div>

</template>

<script>
// eslint-disable-next-line camelcase
import { req_diskDirectory, req_scanFile } from '@/api'
export default {
  name: 'choosePath',

  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'dir'
    },
    choosePath: {
      type: Boolean,
      default: false
    },
    policyID: {
      type: Number

    }
  },
  computed: {
    newDrawer: {
      get () {
        return this.drawer
      },
      set (v) {
        this.$emit('changeDrawer', v)
      }
    }
  },
  data () {
    return {
      scanPath: '',
      propsData: {
        label: 'name', // 这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: 'leaf'
      },
      pathArr: []
    }
  },
  mounted () {

  },
  methods: {
    // 将选择的数据传递给父级
    addPath () {
      this.$emit('selectPath', this.pathArr)
    },
    getFiles () {
      this.newDrawer = false
      this.$emit('getFiles', this.pathArr)
    },
    // 选择目录扫描
    // 开始扫描
    startScan () {
      // 发送扫描指令

      if (this.policyID >= 0) {
        // 追加
        console.log(this.policyID)
        if (this.pathArr.length) {
          debugger
          this.sendScan({
            policyID: this.policyID,
            path: this.pathArr
          }).then(res => {
            if (res.policyID >= 0) {
              localStorage.setItem('policyId', res.policyID)
              this.$router.push({ name: 'scaning' })
            }
          })
        }
      } else {
        // 直接扫描
        if (this.pathArr.length) {
          this.sendScan({ path: this.pathArr }).then(res => {
            if (res.policyID) {
              localStorage.setItem('policyId', res.policyID)
              this.$router.push({ name: 'scaning' })
            }
          })
        }
      }
    },

    // 执行扫描函数
    async sendScan (data) {
      let result = await req_scanFile(data)
      return result.results
    },
    // 获取复选框数据
    checkChoose (data1, data2) {
      if (this.type === 'dir') {
        this.pathArr = this.$refs.tree.getCheckedNodes()
        let arr = JSON.parse(JSON.stringify(this.pathArr))
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[j].path.indexOf(arr[i].path) > -1) {
              this.pathArr = this.pathArr.filter(item => {
                return item.path !== arr[j].path
              })
            }
          }
        }
        this.pathArr = this.pathArr.map(item => {
          return item.path
        })
      } else {
        if (data2.checkedKeys.length > 0) {
          this.$refs.tree.setCheckedNodes([data1])

          this.pathArr = data1.path
        }
      }
    },
    // 点击子节点
    handleNodeClick (data) {
      console.log('node', data)
    },
    // 异步树叶子节点懒加载逻辑
    loadNode (node, resolve) {
      // 一级节点处理
      if (node.level === 0) {
        this.requestTree(resolve)
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去

        let path = node.data.path
        this.getIndex(path, resolve)
      }
    },
    // 异步加载叶子节点数据函数
    getIndex (path, resolve) {
      let reqParams = {
        cmdlist: [{
          'cmd': 132144,
          'ncmd': '文件目录',
          'data': {
            'path': path // 目录，目录为"/"时返回磁盘
          }
        }]
      }
      let resData = []
      req_diskDirectory(reqParams).then(res => {
        if (res.results.file_lists && res.results.path) {
          let scanPath = res.results.path
          let list = res.results.file_lists
          let fiterList = null
          if (this.type === 'dir') {
            fiterList = list.filter(item => {
              return item.type === 'dir'
            })
          } else {
            fiterList = list.map(item => {
              if (item.type === 'dir') {
                item.disabled = true
              }
              return item
            })
          }

          resData = fiterList.map(item => {
            item.path = scanPath + item.name

            return item
          })
        }
        resolve(resData)
      })
    },
    // 首次加载一级节点数据函数
    requestTree (resolve) {
      let reqParams = {
        cmdlist: [{
          'cmd': 132144,
          'ncmd': '文件目录',
          'data': {
            'path': '/'// 目录，目录为"/"时返回磁盘
          }
        }]
      }
      let resData = []
      req_diskDirectory(reqParams).then(res => {
        if (res.results.file_lists && res.results.path) {
          resData = res.results.file_lists
          let list = res.results.file_lists
          let fiterList = null
          if (this.type === 'dir') {
            fiterList = list
          } else {
            fiterList = list.map(item => {
              if (item.type === 'dir') {
                item.disabled = true
              }
              return item
            })
          }

          resData = fiterList.map(item => {
            item.path = item.name
            return item
          })
        }
        resolve(resData)
      })
    }
  }

}

</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
