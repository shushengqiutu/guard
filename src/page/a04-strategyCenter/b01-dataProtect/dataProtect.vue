<template>
  <div>
    <div class="titleSty">
      数据防护
    </div>
    <div class="text1 text1Margin">
      完整性目录（当前目录写保护不能写入，不推荐系统盘和网络共享目录）
    </div>
    <div class="text1 inputSty">
      <div class="pathSty">
           <span v-for="(value,index) in  path" :key="index" class="spanSty">
             <span style="margin-right: 5px">{{value}}</span>
             <i class="el-icon-circle-close" @click="delPath(index)"></i>
             <br>
           </span>
      </div>
      <div class="buttonMargin" @click="drawer=true">
        自定义
      </div>
    </div>
    <div class="text1 text2Margin">
      例外应用程序文件类型（保护目录下可以写入的文件类型，格式TXT/LOG/XML）
     </div>
    <div class="text1 inputSty">
      <div>
        <el-input v-model="path2"></el-input>
      </div>
      <div class="buttonMargin">
       自定义
      </div>
    </div>
    <div class="btn">
      <div class="okSty"
           @mouseover="mouseOverOk"
           @mouseleave="mouseLeaveOk"
           :style="okActive" @click="submitForm()">确定</div>
      <div class="okSty"
           @mouseover="mouseOverNo"
           @mouseleave="mouseLeaveNo"
           :style="noActive"
           @click="resetForm()">取消</div>
    </div>
    <choose-path :drawer="drawer" :choosePath="choosePath" @selectPath="selectPath" @changeDrawer="changeDrawer">
    </choose-path>
  </div>

</template>
<script>
import choosePath from '@/component/choosePath/'
export default {
  name: 'dataProtect',
  components: {
    choosePath
  },
  data () {
    return {
      drawer: false,
      choosePath: true,
      path: [],
      okActive: ' background:rgba(255,255,255,0.2)',
      noActive: ' background:rgba(255,255,255,0.2)',
      path1: '',
      path2: ''
    }
  },
  methods: {
    delPath (index) {
      this.path.splice(index, 1)
    },
    changeDrawer (v) {
      this.drawer = v
    },
    selectPath (pathArr) {
      this.path = pathArr
    },
    submitForm () {

    },
    resetForm () {

    },
    mouseOverOk () {
      this.okActive = 'background:red;color: rgba(255,255,255,1)'
      this.noActive = ' background:rgba(255,255,255,0.2)'
    },
    mouseLeaveOk () {
      this.okActive = ' background:rgba(255,255,255,0.2)'
    },
    mouseOverNo () {
      this.noActive = 'background:red'
      this.okActive = ' background:rgba(255,255,255,0.2)'
    },
    mouseLeaveNo () {
      this.noActive = ' background:rgba(255,255,255,0.2)'
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
