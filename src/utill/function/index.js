// 目录扫描函数
import {
  req_scanFile,
  req_stopScan,
  req_scanStatus
} from '@/api'
export const startScan = function () {
  let async cc = () => {
    let a = await req_scanFile()
  }

}
