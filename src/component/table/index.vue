// 表格组件
<template>
  <el-row class="myTable">
    <!-- <ai-scroll> -->

    <el-table :data="tableData"
              :height="tableHeight"
              @select="select"
              @select-all="selectAll"
              @current-change="clickChange"
              @row-dblclick='handelDblclick'>
      <template v-if="checkBox">
        <!-- 是否开启复选 -->
        <el-table-column type="selection"
                         width="24">
        </el-table-column>
      </template>
      <template v-if="radioBox">
        <el-table-column label="选择"
                         width="55">
          <template slot-scope="scope">
            <el-radio v-model="tableRadio"
                      :label="scope.row"><i></i></el-radio>
          </template>
        </el-table-column>
      </template>
      <template v-for="(item,index) in tHead">

        <template v-if="item.state">
          <!-- 无需自定义的列 -->
          <el-table-column v-if="!item.isCustom"
                           :type="item.type?item.type:''"
                           :label="item.label"
                           :prop="item.prop?item.prop:''"
                           :key="index"
                           :width="item.width"
                           :sortable="item.sortable?item.sortable:false">

          </el-table-column>
          <!-- 需要自定义的列 -->
          <slot v-else
                :name="item.slotName?item.slotName:''">
          </slot>
        </template>
      </template>

    </el-table>

  </el-row>

</template>

<script>

export default {
  name: 'myTable',
  props: {
    checkBox: {
      type: Boolean,
      default: false
    },
    radioBox: {
      type: Boolean,
      default: false
    },
    tHead: {
      type: Array,
      default: () => {
        return [
          {
            label: '序号', // 表头
            state: true, // 是否显示列
            isCustom: false, // 是否自定义
            type: 'index', // type 类型
            width: 200, // 列最小宽度
            slotName: 'index',
            prop: 'date',
            sortable: false // 是否排序
          },
          // { label: '事件名称', state: true, isCustom: true, slotName: 'name' },
          {
            label: '事件类型',
            prop: 'name',
            state: true,
            isCustom: false,
            slotName: 'model',
            width: 200
          },
          {
            label: '级别',
            prop: 'address',
            state: true,
            isCustom: false,
            slotName: 'score'
          }

        ]
      }
      // required: true
    },
    tableData: {
      type: Array,
      default: () => {
        return [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
      // required: true
    },
    isShowColumn: {
      type: Boolean,
      default: false
    },
    tableHeight: {
      type: String,
      default: '435'
    },
    faterRowDblclick: {
      type: Function,
      default: null
    }

  },

  data () {
    return {
      tableRadio: ''
    }
  },
  mounted () {

  },
  methods: {
    clickChange (row) {
      this.$emit('changeRadioData', row)
    },

    selectAll (selection) {
      this.$emit('chooseData', selection)
    },
    select (selection, row) {
      this.$emit('chooseData', selection)
    },
    handelDblclick (row, column, event) {
      if (this.faterRowDblclick) {
        this.faterRowDblclick(row, column, event)
      }
    }
  }

}

</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
