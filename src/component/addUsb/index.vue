// 选择本地目录
<template>

  <div>
    <el-drawer title="追加usb"
               :visible.sync="newDrawer"
               size="30%"
               :wrapperClosable="false"
               custom-class='usbDrawer'
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="当前策略">
            <el-input disabled
                      v-model="form.policyID">
            </el-input>

          </el-form-item>
          <el-form-item label="USB名称">
            <el-input v-model="form.name">
            </el-input>
          </el-form-item>
          <el-form-item label="硬件id">
            <el-input v-model="form.hardware_id">
            </el-input>
          </el-form-item>
          <el-form-item label="文件描述">
            <el-input type="textarea"
                      v-model="form.desc">
            </el-input>
          </el-form-item>
          <el-form-item>
            <button @click="startSendUsb()">确定</button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

  </div>

</template>

<script>
// eslint-disable-next-line camelcase
import {
  // eslint-disable-next-line camelcase
  req_addWhileList
} from '@/api'
export default {
  name: 'addUsb',
  props: {
    type: {
      type: Number,
      default: 2
    },
    usbDrawer: {
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
        return this.usbDrawer
      },
      set (v) {
        this.$emit('changeUsbDrawer', v)
      }
    }
  },
  data () {
    return {
      form: {
        policyID: this.policyID,
        name: '',
        hardware_id: '',
        desc: ''

      }
    }
  },
  mounted () {

  },
  methods: {
    /** ***********追加usb确定******************************* */
    startSendUsb () {
      // 对数据验证
      // "usb": [{
      //   "name": "usb名称",
      //   "hardware_id": "硬件id",
      //   "desc": "描述"      }]

      // 下发参数
      let params = {
        policyID: this.policyID,
        type: this.type,
        usb: []
      }
      let usb = {}
      usb.name = this.form.name
      usb.hardware_id = this.form.hardware_id
      usb.desc = this.form.desc
      params.usb.push(usb)
      this.sendAddUsb(params).then(res => {
        if (res.results.status) {
          this.newDrawer = false
          this.$emit('isSuccess', true)
          this.$msg({
            message: '追加USB成功',
            type: 'success'
          })
        } else {
          this.$msg({
            message: '追加USB失败',
            type: 'error'
          })
        }
      })
    },
    // 添加usb函数
    async sendAddUsb (data) {
      let result = req_addWhileList(data)
      return result
    },
    // drawer状态
    changeDrawer (v) {
      this.listDrawer = v
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
