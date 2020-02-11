
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
      showX: false
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
  z-index: 20;
  right: 10px;
  display: flex;
  justify-content: flex-start;
  float: right;
  position: relative;
  margin-top: 0px !important;
  .btn {
    display: inline-block;
    width: 22px;
    font-size: 16px;
    text-align: center;
    padding: 0;
    border: 0;
    outline: none;
    background: #ff0000;
    border: 1px solid transparent;
    border-left: none;
    color: #fff;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
  .delete-value {
    position: absolute;
    right: 27px;
    top: 5px;
    color: #da4e4e;
  }
}
</style>
