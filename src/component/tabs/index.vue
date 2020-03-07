<template>
  <div class="tabs">
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <template v-for="(val, key, index) in tabsConfig.tabs">
        <el-tab-pane :label="val"
                     :key="index"
                     :name='key'> </el-tab-pane>
      </template>
    </el-tabs>
  </div>

</template>
<script>

export default {
  name: 'tabs',
  data () {
    return {

    }
  },
  computed: {
    activeName: {
      get: function () {
        return this.$route.name
      },
      set: function () {
        return this.$route.name
      }
    }
  },
  props: {
    tabsConfig: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick (tab, event) {
      if (this.tabsConfig.openPage) {
        this.tabsConfig.openPage(tab)
      }
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
</style>
