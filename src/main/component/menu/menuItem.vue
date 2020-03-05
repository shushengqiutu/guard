<template>
  <div class="menu-wrapper">
    <el-submenu :index="datas.path">
      <template slot="title">
        <i :class="datas.icon"
           class="menuIcon icon iconfont"></i>
        <span slot="title">{{$t(`main.menu.${datas.redirect}`)}}</span>
      </template>

      <el-menu-item v-for="item of filtersDatas"
                    :index="datas.path+'/'+item.path"
                    :key="datas.path+'/'+item.path">
        <span slot="title"> {{$t(`main.menu.${item.name}`)}} </span>
      </el-menu-item>
      <!-- {{$t(`main.menu.${datas.path+'/'+item.path}`)}} -->
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['datas', 'parent'],
  data () {
    return {}
  },
  created () {
    this.filtersDatas = this.datas.children.filter((res) => !res.meta.hidden)
  }

}
</script>

<style scoped>
.title {
  color: #fff;
}
.marginSty {
  margin-right: 5px;
}
</style>
