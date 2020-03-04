<template>
  <div class="appProtect">
    <div class="secDefSty">安全防护</div>
    <div class="titleTopDef">
      <div class="leftCont">应用程序防护</div>
      <div>
        <el-switch
        v-model="app_def"
        @change="changeStatus"
        active-color="#13ce66"
        inactive-color="black">
      </el-switch>
        <span class="promptFont">注：根据文件类型进行应用程序防护</span>
      </div>
    </div>
    <div style="display: flex;margin-top: 14px">
      <div class="leftCont"></div>
      <div>
        <el-checkbox v-model="app_def_exe">exe</el-checkbox>
        <el-checkbox v-model="app_def_bat">bat</el-checkbox>
        <el-checkbox v-model="app_def_vbs">vbs</el-checkbox>
      </div>
    </div>
    <!--<div style="display: flex">
      <div class="leftCont">带合法签名的程序自动放行</div>
      <div>
        <el-switch
          v-model="appStatus"
          @change="changeStatus"
          active-color="#13ce66"
          inactive-color="black">
        </el-switch>
      </div>
    </div>
    <div style="display: flex">
      <div class="leftCont">信任签名列表</div>
      <div style="display: flex">
        <div class="baseDiv"></div>
        <div class="diySty"><span class="diyTxt">自定义</span></div>
      </div>
    </div>-->
    <!--<div style="display: flex">
      <div class="leftCont">外设防护</div>
      <div>
        <el-switch
          v-model="appStatus"
          @change="changeStatus"
          active-color="#13ce66"
          inactive-color="black">
        </el-switch>
      </div>
    </div>
    <div style="display: flex">
      <div class="leftCont"></div>
      <div>
        <el-checkbox v-model="exeObj.exeStatus">USB存储</el-checkbox>
        <el-checkbox v-model="batObj.batStatus">USB摄像头</el-checkbox>
        <el-checkbox v-model="vbsObj.vbsStatus">移动硬盘</el-checkbox>
      </div>
    </div>-->
   <!-- <div style="display: flex">
      <div class="leftCont">网络防护</div>
      <div>
        <el-switch
          v-model="appStatus"
          @change="changeStatus"
          active-color="#13ce66"
          inactive-color="black">
        </el-switch>
      </div>
    </div>-->
    <div style="display: flex;margin-top: 19px">
      <div class="leftCont">数据防护</div>
      <div>
        <el-switch
          v-model="data_def"
          @change="changeStatus"
          active-color="#13ce66"
          inactive-color="black">
        </el-switch>
      </div>
    </div>
    <div style="display: flex;margin-top: 19px">
      <div class="leftCont"></div>
      <div style="display: flex">
        <div class="baseDiv" style="height:96px;">
          <span v-for="(value,index) in  path" :key="index" class="spanSty">
             <span style="margin-right: 5px">{{value}}</span>
             <i class="el-icon-circle-close" @click="delPath(index)"></i>
             <br>
           </span>
        </div>
        <div class="diySty" @click="drawer=true"><span class="diyTxt">自定义</span></div>
      </div>
    </div>
    <div style="display: flex;margin-top: 11px">
      <div class="leftCont"></div>
      <div class="promptFont">
       例外应用程序文件类型（保护目录下可以写入的文件类型，格式TXT/LOG/XML）
      </div>
    </div>
    <div style="display: flex;margin-top: 13px">
      <div class="leftCont"></div>
      <div style="display: flex">
        <el-input  v-model="except_app_type"></el-input>
        <div class="diySty"><span class="diyTxt">自定义</span></div>
      </div>
    </div>
    <div style="display: flex">
      <div class="leftCont"></div>
      <div style="display: flex;margin-top: 29px">
        <div class="baseButton buttonMargin"
             @mouseover="okFlag=true"
             @mouseleave="okFlag=false"
             :class="{'active':okFlag}" @click="submitForm()"
        ><span>确定</span></div>
        <div class="baseButton"
             @mouseover="cancelFlag=true"
             @mouseleave="cancelFlag=false"
             :class="{'active':cancelFlag}"
        ><span>取消</span></div>
      </div>
    </div>
    <choose-path :drawer="drawer" :choosePath="choosePath" @selectPath="selectPath" @changeDrawer="changeDrawer">
    </choose-path>
  </div>
</template>
<script>
import choosePath from '@/component/choosePath/'
// eslint-disable-next-line
import {req_getConfig,req_sysConfig} from '@/api'
export default {
  name: 'usbScanSet',
  components: {
    choosePath
  },
  data () {
    return {
      app_def: false, // 应用程序防护状态
      app_def_exe: false,
      app_def_bat: false,
      app_def_vbs: false,
      data_def: false, // 数据防护开关状态
      path: [],
      except_app_type: '',
      drawer: false,
      choosePath: true,
      okFlag: false,
      cancelFlag: false
    }
  },
  methods: {
    // 确定
    submitForm () {
      let key = ['app_def', 'app_def_exe', 'app_def_bat', 'app_def_vbs', 'data_def', 'dir_def', 'except_app_type']
      let data = []
      for (let i = 0; i < key.length; i++) {
        let itemObj = {
          'key': key[i],
          'value': key[i] === 'dir_def' ? this.path.join(';') : (this[key[i]] ? 1 : 0)
        }
        data.push(itemObj)
      }
      let params = {
        cmdlist: [{
          'cmd': 132374,
          'ncmd': 'setSystemConfig',
          data: {
            params: data
          }
        }]
      }
      req_sysConfig(params).then(res => {
        if (res.results.status) {

        }
      })
    },
    // 取消
    resetForm () {

    },
    // 获取系统参数配置
    getConfig () {
      let key = ['app_def', 'app_def_exe', 'app_def_bat', 'app_def_vbs', 'data_def', 'dir_def', 'except_app_type']
      let params = {
        cmdlist: [{
          'cmd': 132372,
          'ncmd': 'getSystemConfig',
          'data': {
            'key': key // 根据key获取配置值
          }
        }]
      }
      req_getConfig(params).then(res => {

      })
    },
    // 完整性目录中的删除功能
    delPath (index) {
      this.path.splice(index, 1)
    },
    changeDrawer (v) {
      this.drawer = v
    },
    selectPath (pathArr) {
      this.path = pathArr
    },
    changeStatus (status) {

    }
  },
  created () {
    this.getConfig()
  }
}
</script>
<style lang='scss'  scoped>
  @import "./css/index.scss";
</style>
