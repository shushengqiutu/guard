// 选择本地目录
<template>

  <div>
    <el-drawer title="追加usb"
               :visible.sync="newDrawer"
               size="30%"
               :wrapperClosable="false"
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
          <el-form-item label="文件路径">
            <el-input type="textarea"
                      v-model="form.name">
            </el-input>
            <button @click='addFlieSrc'>选择文件</button>
          </el-form-item>
          <el-form-item label="MD5">
            <el-input type="textarea"
                      v-model="form.md5">
            </el-input>
          </el-form-item>
          <el-form-item label="文件描述">
            <el-input type="textarea"
                      v-model="form.desc">
            </el-input>
          </el-form-item>
          <el-form-item>
            <button @click="startSend()">确定</button> <button>取消</button>
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
      type: Number
    },
    drawer: {
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
        this.$emit('changeFlieDrawer', v)
      }
    }
  },
  data () {
    return {
      listDrawer: false,
      form: {
        policyID: this.policyID,
        name: '',
        md5: '',
        desc: ''

      }
    }
  },
  mounted () {

  },
  methods: {

    changeDrawer (v) {
      this.listDrawer = v
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
