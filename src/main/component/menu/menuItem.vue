<template>
  <div class="menu-wrapper">
    <el-submenu :index="datas.path">
      <template slot="title">

        <i :class="datas.icon"
           class="menuIcon"></i>
        <span slot="title"> {{$t(`main.menu.${datas.path}`)}}</span>
      </template>
      <el-menu-item v-for="item of datas.children"
                    :index="datas.path+'/'+item.path"
                    :key="datas.path+'/'+item.path">
        <span slot="title"> {{$t(`main.menu.${datas.path+'/'+item.path}`)}}</span>
      </el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['datas', 'parent'],
  data () {
    return {}
  }
}
</script>

<style scoped>
.title {
  color: #fff;
}
</style>
