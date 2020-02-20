<template>
  <div class="datePicker">
    <div class="block"
         style="">
      <span class="demonstration"></span>
      <el-date-picker v-model="value2"
                      type="datetimerange"
                      size='mini'
                      @change="func"
                      validate-event
                      unlink-panels
                      value-format="yyyy-MM-dd hh:mm:ss"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <!-- <el-date-picker v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> -->
  </div>

</template>
<script>

export default {
  name: 'aaa',
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
      },
      value1: '',
      value2: ''
    }
  },
  methods: {
    func () {
      console.log(this.value1, this.value2, 111)
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
