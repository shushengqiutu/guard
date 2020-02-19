import router from './router'
import store from './store'
import routerMapComponents from '@/router/routerMapComponents'

const whiteList = ['/signIn'] // 不重定向白名单
const formatRoutes = function (routes) {
  routes.forEach(route => {
    route.component = routerMapComponents[route.component]
    if (route.children) {
      formatRoutes(route.children)
    }
  })
}

router.beforeEach((to, from, next) => {
  if (store.getters.gettoken) {
    // 判断是否有token
    // 有token访问登录页面跳到首页智能扫描
    if (to.path === '/signIn') {
      next({ path: '/' })
    } else {
      // 有token访问非登录页面

      if (store.getters.getroles.length === 0) {
        // token 存在 用户信息不存在

        // 开始拉取用户信息
        store.dispatch('GetInfo')
          .then(res => {
            // debugger
            // 根据后端路由生成动态路由表
            const routes = res.result.router

            // store.commit('SET_ROUTES', routes)

            // 后台返回路由数据处理
            formatRoutes(routes)
            // 动态添加路由
            router.addRoutes(routes)
            next({ ...to, replace: true })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        // token 存在 用户信息存在 直接进入页面
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    // 不存在token

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 需要登录的页面 跳转到登录页面
      next('/signIn')
    }
  }
})
