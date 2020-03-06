// 选择本地目录
<template>

  <div>
    <el-drawer title="追加文件"
               :visible.sync="newDrawer"
               size="30%"
               :append-to-body='true'
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
            <button @click='addFlieSrc()'>选择文件</button>
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
    <choose-path :drawer="listDrawer"
                 :type="'flie'"
                 @getFiles='getFiles'
                 @changeDrawer="changeDrawer">
    </choose-path>
  </div>

</template>

<script>
// eslint-disable-next-line camelcase
import choosePath from '@/component/choosePath/'
import {
  // eslint-disable-next-line camelcase
  req_addWhileList
} from '@/api'
export default {
  name: 'addFlie',
  components: {
    choosePath
  },
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
    startSend () {
      // 对数据验证 name不能为空

      // 数据处理
      // 文件地址转数组去空
      console.log(this.form.name, 99)
      let filesArr = this.form.name.split(/[\r\n]+/).filter(item => item !== '')

      // 去重
      let setFilesArr = new Set(filesArr)
      let itemArr = []
      setFilesArr.forEach(src => {
        let item = {}
        item.name = src
        item.md5 = this.form.md5
        item.desc = this.form.desc
        itemArr.push(item)
      })
      // 下发参数
      let params = {
        policyID: this.policyID,
        type: this.type
      }
      let type = this.type
      if (type === 1) {
        params.files = itemArr
      }
      this.sendAddFlie(params).then(res => {
        if (res.results.status) {
          this.newDrawer = false
          this.$emit('isSuccess', true)
          this.$msg({
            message: '追加文件成功',
            type: 'success'
          })
        } else {
          this.$msg({
            message: '追加文件失败',
            type: 'error'
          })
        }
      })
    },
    addFlieSrc () {
      // addFlieSrc
      // debugger
      this.listDrawer = true
    },
    // 添加文件函数
    async sendAddFlie (data) {
      let result = req_addWhileList(data)
      return result
    },
    // 获取文件名
    getFiles (src) {
      if (this.form.name) {
        this.form.name = this.form.name + '\r\n' + src
      } else {
        this.form.name = src
      }
    },
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
