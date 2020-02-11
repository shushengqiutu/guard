const path = require('path')

const express = require('express')

const app = express()
const bodyParser = require('body-parser')
// 此中中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
app.use(bodyParser.urlencoded({ extended: true }))
// 判断请求体格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
app.use(bodyParser.json())
// 上面两个只会有一个生效
// token 值
const tokens = {
  admin: {
    pas: 'admin',
    token: 'admin-token'
  },
  editor: {
    pas: 'editor',
    token: 'editor-token'
  },
  reader: {
    pas: 'reader',
    token: 'reader-token'
  }
}
// 路由信息
let router = [
  {
    path: '/',
    redirect: '/smartExam',
    component: 'Main',
    title: '智能扫描',
    hidden: false,
    singleTag: true,
    icon: 'el-icon-setting',
    children: [
      {
        path: 'smartExam',
        name: 'smartExam',
        component: 'SmartExam',
        meta: {
          title: '智能扫描',
          hidden: false

        }
      }]
  },
  {
    path: '/securityAudit',
    redirect: '/securityAudit/securityAudit',
    component: 'Main',
    title: '安全审计',
    hidden: false,
    singleTag: true,
    icon: 'el-icon-setting',
    children: [
      {
        path: 'securityAudit',
        name: 'securityAudit',
        component: 'SecurityAudit',
        meta: {
          title: '安全审计',
          hidden: false
        }
      }]
  },
  {
    path: '/auditManagement',
    redirect: '/auditManagement/auditManagement',
    component: 'Main',
    title: '审计管理',
    icon: 'el-icon-setting',
    hidden: false,
    singleTag: true,
    children: [
      {
        path: 'auditManagement',
        name: 'auditManagement',
        component: 'AuditManagement',
        meta: {
          title: '审计管理',
          hidden: false
        }
      }]
  },
  {
    path: '/operationLog',
    redirect: '/operationLog/operationLog',
    component: 'Main',
    title: '操作日志',
    icon: 'el-icon-setting',
    hidden: false,
    singleTag: true,
    children: [
      {
        path: 'operationLog',
        name: 'operationLog',
        component: 'OperationLog',
        meta: {
          title: '操作日志',
          hidden: false
        }
      }]
  },
  {
    path: '/policyCentral',
    redirect: '/policyCentral/securityPolicy',
    component: 'Main',
    title: '策略中心',
    icon: 'el-icon-setting',
    hidden: false,
    singleTag: false,
    children: [

      {
        path: 'securityPolicy',
        name: 'securityPolicy',
        component: 'SecurityPolicy',
        meta: {
          title: '安全策略',
          hidden: false

        }
      },
      {
        path: 'dataProtect',
        name: 'dataProtect',
        component: 'DataProtect',
        meta: {
          title: '数据防护',
          hidden: false

        }
      },
      {
        path: 'outDetectionSet',
        name: 'outDetectionSet',
        component: 'OutDetectionSet',
        meta: {
          title: '外联探测设置',
          hidden: false
        }
      },
      {
        path: 'usbScanSet',
        name: 'usbScanSet',
        component: 'UsbScanSet',
        meta: {
          title: 'U盘扫描设置',
          hidden: false
        }
      },
      {
        path: 'workMode',
        name: 'workMode',
        component: 'WorkMode',
        meta: {
          title: '工作模式',
          hidden: false
        }
      },
      {
        path: 'appProtect',
        name: 'appProtect',
        component: 'AppProtect',
        meta: {
          title: '防护应用',
          hidden: false
        }
      },
      {
        path: 'peripheralProtect',
        name: 'peripheralProtect',
        component: 'PeripheralProtect',
        meta: {
          title: '外防设置',
          hidden: false
        }
      },
      {
        path: 'secretUsb',
        name: 'secretUsb',
        component: 'SecretUsb',
        meta: {
          title: '安全U盘',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/systemSetup',
    redirect: '/systemSetup/systemSetup',
    component: 'Main',
    title: '系统设置',
    hidden: false,
    singleTag: true,
    icon: 'el-icon-setting',
    children: [
      {
        path: 'systemSetup',
        name: 'systemSetup',
        component: 'SystemSetup',
        meta: {
          title: '系统设置',
          hidden: false
        }
      }]
  }
]
// 用户信息
const users = {
  'admin-token': {
    roles: '0',
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    router
  },
  'editor-token': {
    roles: '1',
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'reader-token': {
    roles: '2',
    introduction: 'I am an reader',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal reader'
  }
}

app.post('/user/login', function (req, res) {
  // const params = req.params
  // const query = req.query
  const body = req.body
  console.log(body)
  const { username, password } = body
  if (username === 'admin' && password === '123456') {
    res.send({ code: 200, mes: '登录成功', result: tokens[username].token })
  } else {
    res.send({ code: 10001, mes: '登录失败' })
  }
})

app.get('/user/getInfo', function (req, res) {
  const query = req.query
  console.log(query)
  const { token } = query
  if (token === 'admin-token') {
    res.send({ code: 200, mes: '登录成功', result: users[token] })
  } else {
    res.send({ code: 10001, mes: '无效token' })
  }
})

app.listen('8888', '127.0.0.1', function (err) {
  if (err) {
    console.log(err)

    return
  }

  console.log('Listening at http://localhost:8888')
})
