import axios from 'axios'
// 设置请求头
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// import { Message } from 'element-ui'
/** **** 创建axios实例 ******/
const service = axios.create({
  // baseURL: process.env.BASE_URL, // api的base_url
  timeout: 50000 // 请求超时时间
})
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    // console.log('添加请求拦截器', config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    let res = response.data
    // console.log('添加响应拦截器', response, 999988)

    if (response.status !== 200) {
      // Message({
      //   type: 'error',
      //   message: '111',
      //   duration: 5 * 1000
      // })
    } else {
      return res
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service
