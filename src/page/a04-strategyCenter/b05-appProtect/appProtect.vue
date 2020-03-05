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
        <el-checkbox v-model="app_def_exe" :disabled="checkBoxFlag">exe</el-checkbox>
        <el-checkbox v-model="app_def_bat" :disabled="checkBoxFlag">bat</el-checkbox>
        <el-checkbox v-model="app_def_vbs" :disabled="checkBoxFlag">vbs</el-checkbox>
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
    <div style="display: flex;margin-top: 19px">
      <div class="leftCont">外设防护</div>
      <div>
        <el-switch
          v-model="peripheral_def"
          @change="changePeripheral"
          active-color="#13ce66"
          inactive-color="black">
        </el-switch>
      </div>
    </div>
    <div style="display: flex;margin-top: 14px">
      <div class="leftCont"></div>
      <div>
        <el-checkbox v-model="usb_storage" :disabled="perFlag">USB存储</el-checkbox>
        <el-checkbox v-model="non_usb_storage" :disabled="perFlag">非USB存储</el-checkbox>
      </div>
    </div>
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
        <div class="okButton buttonMargin"
             @mouseover="okFlag=true"
             @mouseleave="okFlag=false"
             :class="{'active':okFlag}"
             @click="submitForm()"
        ><span>确定</span></div>
        <div class="cancelButton"
             @click="resetForm"
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
      checkBoxFlag: true,
      perFlag: true,
      app_def: false, // 应用程序防护状态
      app_def_exe: false,
      app_def_bat: false,
      app_def_vbs: false,
      peripheral_def: false, // 外设防护开关状态
      usb_storage: false, // USB存储
      non_usb_storage: false, // 非USB存储
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
      let key = ['app_def', 'app_def_exe', 'app_def_bat', 'app_def_vbs', 'peripheral_def', 'usb_storage', 'non_usb_storage', 'data_def', 'dir_def', 'except_app_type']
      let data = []
      for (let i = 0; i < key.length; i++) {
        let itemObj = {
          'key': '',
          'value': ''
        }
        if (key[i] !== 'dir_def' && key[i] !== 'except_app_type') {
          itemObj = {
            'key': key[i],
            'value': this[key[i]] ? '1' : '0'
          }
          data.push(itemObj)
        } else {
          if (key[i] === 'dir_def') {
            itemObj = {
              'key': key[i],
              'value': this.path.length ? this.path.join(';') : ''
            }
            data.push(itemObj)
          } else {
            itemObj = {
              'key': key[i],
              'value': this.except_app_type
            }
            data.push(itemObj)
          }
        }
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
          this.$msg({
            message: '配置成功',
            type: 'success'
          })
        }
      })
    },
    // 取消
    resetForm () {
      this.getConfig()
    },
    // 获取系统参数配置
    getConfig () {
      let key = ['app_def', 'app_def_exe', 'app_def_bat', 'app_def_vbs', 'peripheral_def', 'usb_storage', 'non_usb_storage', 'data_def', 'dir_def', 'except_app_type']
      let keyArr = []
      for (let i = 0; i < key.length; i++) {
        let keyItem = {
          key: key[i]
        }
        keyArr.push(keyItem)
      }
      let params = {
        cmdlist: [{
          'cmd': 132372,
          'ncmd': 'getSystemConfig',
          'data': keyArr
        }]
      }
      req_getConfig(params).then(res => {
        if (res.results.status) {
          let resData = res.results.list
          for (let j = 0; j < resData.length; j++) {
            switch (resData[j].key) {
              case 'app_def':
                this.app_def = resData[j].value === '1'
                if (this.app_def) {
                  this.checkBoxFlag = false
                } else {
                  this.checkBoxFlag = true
                }
                break
              case 'app_def_exe':
                this.app_def_exe = resData[j].value === '1'
                break
              case 'app_def_bat':
                this.app_def_bat = resData[j].value === '1'
                break
              case 'app_def_vbs':
                this.app_def_vbs = resData[j].value === '1'
                break
              case 'peripheral_def':
                this.peripheral_def = resData[j].value === '1'
                if (this.peripheral_def) {
                  this.perFlag = false
                } else {
                  this.perFlag = true
                }
                break
              case 'usb_storage':
                this.usb_storage = resData[j].value === '1'
                break
              case 'non_usb_storage':
                this.non_usb_storage = resData[j].value === '1'
                break
              case 'data_def':
                this.data_def = resData[j].value === '1'
                break
              case 'dir_def':
                if (resData[j].value) {
                  this.path = resData[j].value.split(';')
                } else {
                  this.path = []
                }
                break
              case 'except_app_type':
                this.except_app_type = resData[j].value
                break
              default:
                break
            }
          }
        }
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
      if (status) {
        this.checkBoxFlag = false
      } else {
        this.checkBoxFlag = true
        this.app_def_bat = false
        this.app_def_exe = false
        this.app_def_vbs = false
      }
    },
    // 外设防护开关
    changePeripheral (status) {
      if (status) {
        this.perFlag = false
      } else {
        this.perFlag = true
        this.usb_storage = false
        this.non_usb_storage = false
      }
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
