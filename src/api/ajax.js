// 封装ajax
import service from './axios_config'
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'GET') { // 处理get请求地址
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      console.log(dataStr, 111)

      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url += '?' + dataStr + '&time=' + Math.random()
      }

      promise = service.get(url)
    } else {
      console.log(data, 1111)

      promise = service.post(url, data)
    }
    promise.then(req => {
      // 成功回调
      // debugger
      debugger
      resolve(req)
    }

    ).catch(error => {
      // debugger

      reject(error)
      // 失败回调
    })
  })
}
