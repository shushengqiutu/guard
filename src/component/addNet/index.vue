// 选择本地目录
<template>

  <div>

    <el-drawer title="追加网卡"
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
          <el-form-item label="网卡名称">
            <el-input v-model="form.name">
            </el-input>
          </el-form-item>
          <el-form-item label="网卡状态">
            <el-switch v-model="form.status"
                       active-color="#13ce66"
                       inactive-color="black"
                       active-value="1"
                       inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="网卡描述">
            <el-input type="textarea"
                      v-model="form.desc">
            </el-input>
          </el-form-item>
          <el-form-item>
            <button @click="startSendNet()">确定</button>
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
      default: 3
    },
    netDrawer: {
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
        return this.netDrawer
      },
      set (v) {
        this.$emit('changeNetDrawer', v)
      }
    }
  },
  data () {
    return {

      form: {
        policyID: this.policyID,
        name: '',
        status: '0',
        desc: ''

      }
    }
  },
  mounted () {

  },
  methods: {
    /** ***********追加网卡确定******************************* */
    startSendNet () {
      // 对数据验证
      // "usb": [{
      //   "name": "usb名称",
      //   "hardware_id": "硬件id",
      //   "desc": "描述"      }]

      // 下发参数
      let params = {
        policyID: this.policyID,
        type: this.type,
        net: []
      }
      let net = {}
      net.name = this.form.name
      net.status = this.form.status
      net.desc = this.form.desc
      params.net.push(net)
      this.sendAddNet(params).then(res => {
        if (res.results.status) {
          this.newDrawer = false
          this.$emit('isSuccess', true)
          this.$msg({
            message: '追加网卡成功',
            type: 'success'
          })
        } else {
          this.$msg({
            message: '追加网卡失败',
            type: 'error'
          })
        }
        console.log(res, 999)
      })
    },
    // 添加usb函数
    async sendAddNet (data) {
      let result = req_addWhileList(data)
      return result
    }

  },
  watch: {
    policyID (id) {
      this.form.policyID = id
      console.log(id, 99)
    }
  }

}

</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
