import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/main/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/smartExam',
      redirect: '/smartExam',
      component: Main,
      children: [
        {
          path: '/smartExam',
          name: 'smartExam',
          component: () => {
            return import('@/page/a01-smartExam/b01-smartExam/smartExam.vue')
          }
        }]

    },
    {
      path: '/',
      component: Main,
      redirect: '/signIn',
      children: [
        {
          path: '/signIn',
          name: 'signIn',
          component: () => {
            return import('@/page/signIn/signIn.vue')
          }
        }]

    },
    { path: '*', redirect: '/smartExam' }
  ]
})
