
import Main from '@/main/main.vue'
import SignIn from '@/page/signIn/signIn.vue'
export default {
  // 页面布局
  'Main': Main,
  // 登录页面
  'SignIn': SignIn,
  // 智能扫描
  'SmartExam': () => import('@/page/a01-smartExam/b01-smartExam/smartExam.vue'),
  // 安全审计
  'SecurityAudit': () => import('@/page/a02-securityAudit/b01-securityAudit/securityAudit.vue'),
  // 审计管理
  'AuditManagement': () => import('@/page/a03-auditManagement/b01-auditManagement/auditManagement.vue'),
  // 操作日志

  'OperationLog': () => import('@/page/a03-b-operationLog/b01-operationLog/operationLog.vue'),
  // 策略中心-安全策略
  'SecurityPolicy': () => import('@/page/a04-strategyCenter/b00-securityPolicy/securityPolicy.vue'),
  // 策略中心-数据防护
  'DataProtect': () => import('@/page/a04-strategyCenter/b01-dataProtect/dataProtect.vue'),
  // 策略中心-外联探测设置
  'OutDetectionSet': () => import('@/page/a04-strategyCenter/b02-outDetectionSet/outDetectionSet.vue'),
  // 策略中心-U盘扫描设置
  'UsbScanSet': () => import('@/page/a04-strategyCenter/b03-usbScanSet/usbScanSet.vue'),
  // 策略中心-工作模式
  'WorkMode': () => import('@/page/a04-strategyCenter/b04-workMode/workMode.vue'),
  // 策略中心-防护应用
  'AppProtect': () => import('@/page/a04-strategyCenter/b05-appProtect/appProtect.vue'),
  // 策略中心-外防设置
  'PeripheralProtect': () => import('@/page/a04-strategyCenter/b06-peripheralProtect/peripheralProtect.vue'),
  // 策略中心-安全U盘
  'SecretUsb': () => import('@/page/a04-strategyCenter/b07-secretUsb/secretUsb.vue'),
  // 系统设置
  'SystemSetup': () => import('@/page/a05-systemSetup/b01-systemSetup/systemSetup.vue')

}
