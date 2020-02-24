// 选择本地目录
<template>
 <div>
   <el-drawer
     title="我是标题"
     :visible.sync="drawer"
     :with-header="false">
     <div style="height: 500px;overflow: auto">
       <el-tree
         :props="propsData"
         :load="loadNode"
         node-key="id"
         ref="tree"
         highlight-current
         lazy
         show-checkbox
         @node-click="handleNodeClick"
         @check="checkChoose"
       ></el-tree>
       <el-button @click="startScan">扫描</el-button>
     </div>
   </el-drawer>
 </div>

</template>

<script>
import {req_diskDirectory} from '@/api'
export default {
  name: 'choosePath',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
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
    // 选择目录扫描
    startScan () {
      let searchObj = {
        name: 'scaning',
        params: {
          scanType: 'target',
          path: this.pathArr
        }
      }
      this.$router.push(searchObj)
    },
    // 获取复选框数据
    checkChoose (data1, data2) {
      this.pathArr = []
      let checkedArr = data2.checkedNodes
      for (let i = 0; i < checkedArr.length; i++) {
        this.pathArr.push(checkedArr[i].name)
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
        let path = node.data.name
        this.getIndex(path, resolve)
      }
    },
    // 异步加载叶子节点数据函数
    getIndex (path, resolve) {
      let reqParams = {cmdlist: [{
        'cmd': 132144,
        'ncmd': '文件目录',
        'data': {
          'path': path // 目录，目录为"/"时返回磁盘
        }
      }]}
      let resData = []
      req_diskDirectory(reqParams).then(res => {
        if (res.results.file_lists) {
          resData = res.results.file_lists
        }
        resolve(resData)
      })
    },
    // 首次加载一级节点数据函数
    requestTree (resolve) {
      let reqParams = {cmdlist: [{
        'cmd': 132144,
        'ncmd': '文件目录',
        'data': {
          'path': '/' // 目录，目录为"/"时返回磁盘
        }
      }]}
      let resData = []
      req_diskDirectory(reqParams).then(res => {
        if (res.results.file_lists) {
          resData = res.results.file_lists
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
