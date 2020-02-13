
<template>
  <div class="mySearch">
    <el-input :placeholder="placeHolder"
              class="input"
              @input="focus(searchVal)"
              v-model="searchVal">
    </el-input>
    <i class="el-icon-error delete-value"
       @click="deleted"
       v-if="showX"></i>
    <button class="el-icon-search btn"
            @click="search"> </button>
  </div>
</template>
<script>
export default {
  name: 'search',
  props: {
    placeHolder: ''
  },
  data () {
    return {
      searchVal: '',
      showX: true
    }
  },
  watch: {
    searchVal (val) {
    }
  },
  methods: {
    search () {
      this.$emit('searchVal', this.searchVal)
    },
    focus (val, type) {
      if (val) {
        this.showX = true
      } else {
        this.showX = false
        this.deleted()
      }
    },
    deleted () {
      this.searchVal = ''
      this.$emit('searchVal', this.searchVal)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
.mySearch {
  // position: absolute;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);

  >>> .el-input--small .el-input__inner {
    height: 20px;
    background: transparent;
    width: 200px;
  }
  .btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 14px;
    text-align: center;
    padding: 0;
    border: 0;
    outline: none;
    padding-right: 10px;

    // // background: #ff0000;
    // border: 1px solid transparent;
    // border-left: none;
    color: #fff;
    background: transparent;
  }
  .delete-value {
    position: absolute;
    top: 0;
    right: 22px;
    line-height: 20px;
    width: 15px;
    height: 22px;
    color: #da4e4e;
  }
}
</style>
