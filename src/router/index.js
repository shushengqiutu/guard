import Vue from 'vue'
import Router from 'vue-router'
import routerMapComponents from '@/router/routerMapComponents'
Vue.use(Router)

// 如首页和登录页和一些不用权限的公用页面 静态路由
export const commontRouterMap = [
  {
    path: '/signIn',
    component: routerMapComponents.Main,
    redirect: '/signIn',
    title: '登录页面',
    hidden: true,
    singleTag: true,
    children: [
      {
        path: '/signIn',
        name: 'signIn',
        component: routerMapComponents.SignIn,
        meta: {
          title: '登录页面',
          nav: false // 是否显示在导航
        }
      }]

  }
  // { path: '*', redirect: '/404' }
]
// 实例化vue的时候只挂载commontRouterMap
const createRouter = () => new Router({
  routes: commontRouterMap
})
const router = createRouter()
// 重置路由
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
