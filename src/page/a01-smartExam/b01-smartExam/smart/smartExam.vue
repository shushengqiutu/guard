<template>
  <div class="smartWarp">
    <div class="headerSty">
      <div class="leftCont">
        <div class="margin1">
          <img class="img1"
               src="@/assets/img/public/1@2x.png" />
        </div>
        <div class="content">
          <div class="margin2"><span class="largText">214</span>天</div>
          <div class="textSty">实时保护您的电脑</div>
          <div class="textSty">上次扫描：2019-10-23 12:00:00</div>
        </div>
      </div>
      <div class="rightCont">
        <div class="margin3">
          <img class="img1"
               src="@/assets/img/public/2@2x.png" />
        </div>
        <div class="content">
          <div class="margin4"><span class="largText">214</span>条</div>
          <div class="textSty">已发现威胁事件</div>
          <div class="textSty">安全等级：中</div>
        </div>
      </div>
    </div>
    <div class="scanCont">
      <div class="scanAll"
           @click="jumpRouter({name:'scaning',params:{scanType:'all'}})">
        全盘扫描
      </div>
      <div class="targetScan">
        <span style=" cursor: pointer;" @click="chooseFile">
          指定目录扫描
        </span>
      </div>
    </div>
    <div class="endSty">
      <div style="flex: 4"></div>
      <div class="avgFlex">
        <div class="ItemFlex">
          <img class="img3"
               src="@/assets/img/public/客户端@2x.png" />
        </div>
        <div class="ItemFlex">
          <img class="img3"
               src="@/assets/img/public/审计@2x.png" />
        </div>
        <div class="ItemFlex">
          <img class="img3"
               src="@/assets/img/public/策略@2x.png" />
        </div>
        <div class="ItemFlex">
          <img class="img3"
               src="@/assets/img/public/ITM@2x.png" />
        </div>
      </div>
    </div>
    <div class="endSty"
         style="margin-top: 5px">
      <div style="flex: 4"></div>
      <div class="avgFlex">
        <div class="ItemFlex">
          客户端正常
        </div>
        <div class="ItemFlex">
          模式保护
        </div>
        <div class="ItemFlex">
          XJ-205668885
        </div>
        <div class="ItemFlex">
          在线
        </div>
      </div>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
     <div style="height: 500px;overflow: auto">
       <el-tree
         :props="props"
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
  name: 'user',
  data () {
    return {
      props: {
        label: 'name', // 这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: 'leaf'
      },
      pathArr: [],
      drawer: false
    }
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
        resData = res.results.file_lists
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
        resData = res.results.file_lists
        resolve(resData)
      })
    },
    // 打开树形结构,选择指定目录
    chooseFile () {
      this.drawer = true
    },
    // 跳转到下一个扫描中页面
    jumpRouter (searchObj) {
      this.$router.push(searchObj)
    }
  },
  created () {
    if (localStorage.getItem('policyId')) {
      this.$router.push({name: 'scaning', params: {scanType: 'all'}})
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
