<template>
  <div class="filters">
    <div class="datePicker">
      <span class="demonstration">时间：</span>
      <el-date-picker v-model="timeArry"
                      type="datetimerange"
                      size='mini'
                      popper-class='mydata'
                      @change="timeChange"
                      validate-event
                      unlink-panels
                      value-format="yyyy-MM-dd hh:mm:ss"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
    </div>
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

      timeArry: ''
    }
  },
  methods: {
    timeChange () {
      this.$emit('paramsChange', 'time', this.timeArry)
      console.log(11, this.timeArry, 111)
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
