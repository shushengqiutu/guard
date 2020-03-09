<template>
  <div class="filters">
    <div class="datePicker"
         v-if="dateSelect">
      <span class="demonstration">时间：</span>
      <el-date-picker v-model="pickerOptions.timeArry"
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
    <div class="enventType"
         v-if="enventTypeSelect">
      <span class="type">事件类型：</span>
      <el-select v-model="enventType.value"
                 @change='enventTypechange'
                 popper-class='myEnventType'
                 placeholder="请选择">
        <el-option v-for="item in enventType.options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>

</template>
<script>

export default {
  props: {
    // 日期过滤
    dateSelect: {
      type: Boolean,
      default: true
    },
    // 事件类型
    enventTypeSelect: {
      type: Boolean,
      default: false
    }

  },
  name: 'aaa',
  data () {
    return {
      // 日期选择
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
          }],
        timeArry: ''
      },

      enventType: {
        value: '',
        options: [{
          value: 10,
          label: '进程执行'
        }, {
          value: 11,
          label: '进程拦截'
        }, {
          value: 20,
          label: 'USB发现'
        }, {
          value: 21,
          label: 'USB拦截'
        }, {
          value: 30,
          label: '网卡发现'
        },
        {
          value: 31,
          label: '网卡禁用'
        },
        {
          value: 32,
          label: '网卡卸载'
        },
        {
          value: 40,
          label: '非法外联检测'
        },
        {
          value: 41,
          label: '非法外联拦截'
        }
        ]

      }
      // 事件类型选择

    }
  },
  methods: {
    timeChange () {
      this.$emit('paramsChange', 'time', this.pickerOptions.timeArry)
      console.log(11, this.pickerOptions.timeArry, 111)
    },
    enventTypechange () {
      this.$emit('paramsChange', 'event_type', this.enventType.value)
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
