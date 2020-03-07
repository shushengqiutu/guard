
import Main from '@/main/main.vue'
import SignIn from '@/page/signIn/signIn.vue'
export default {
  // 页面布局
  'Main': Main,
  // 登录页面
  'SignIn': SignIn,
  // 智能扫描
  'SmartExam': () => import('@/page/a01-smartExam/b01-smartExam/smart/smartExam.vue'),
  // 智能扫描中
  'Scaning': () => import('@/page/a01-smartExam/b01-smartExam/scaning/scaning.vue'),
  // 智能扫描完成
  'ScanFinish': () => import('@/page/a01-smartExam/b01-smartExam/scanFinish/scanFinsh.vue'),
  // 安全策略-当前策略
  'SecurityPolicy': () => import('@/page/a02-securityPolicy/b01-securityPolicy/securityPolicy.vue'),
  // 安全策略-所有策略
  'AllPolicy': () => import('@/page/a02-securityPolicy/b02-allPolicy/allPolicy.vue'),
  // 安全策略-授信策略
  'CreditPolicy': () => import('@/page/a02-securityPolicy/b03-creditPolicy/creditPolicy.vue'),
  // 安全策略-策略详情
  'PolicyInfo': () => import('@/page/a02-securityPolicy/b04-policyInfo/policyInfo.vue'),
  // 安全策略-内置白名单
  'InWhiteList': () => import('@/page/a05-inWhiteList/b01-inWhiteList/inWhiteList.vue'),
  // 安全策略-内置白名单详情
  'InWhiteListInfo': () => import('@/page/a05-inWhiteList/b02-inWhiteListInfo/inWhiteListInfo.vue'),
  // 审计事件
  'AuditManagement': () => import('@/page/a03-auditManagement/b01-auditManagement/auditManagement.vue'),
  // 策略中心-安全防护
  'AppProtect': () => import('@/page/a04-strategyCenter/b05-appProtect/appProtect.vue'),
  // 策略中心-工作模式
  'WorkMode': () => import('@/page/a04-strategyCenter/b04-workMode/workMode.vue'),
  // 策略中心-防护策略
  'DataProtect': () => import('@/page/a04-strategyCenter/b01-dataProtect/dataProtect.vue'),
  // 策略中心-外联探测设置
  'OutDetectionSet': () => import('@/page/a04-strategyCenter/b02-outDetectionSet/outDetectionSet.vue'),
  // 策略中心-U盘扫描设置
  'UsbScanSet': () => import('@/page/a04-strategyCenter/b03-usbScanSet/usbScanSet.vue'),

  // 策略中心-外防设置
  'PeripheralProtect': () => import('@/page/a04-strategyCenter/b06-peripheralProtect/peripheralProtect.vue'),
  // 策略中心-安全U盘
  'SecretUsb': () => import('@/page/a04-strategyCenter/b07-secretUsb/secretUsb.vue'),
  // 系统中心-系统设置
  'SystemSetup': () => import('@/page/a05-systemSetup/b01-systemSetup/systemSetup.vue'),
  // 系统中心-操作日志
  // eslint-disable-next-line no-dupe-keys
  'OperationLog': () => import('@/page/a05-systemSetup/b02-operationLog/operationLog.vue'),
  // 系统中心-用户管理
  'UserManagement': () => import('@/page/a05-systemSetup/b03-userManagement/userManagement.vue')

}
