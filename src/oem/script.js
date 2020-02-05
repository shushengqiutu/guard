let item = require('./itemName.js')// 项目 OEM 名字
let itemName = item.item.name
let fs = require('fs')
let stat = fs.stat
let path = `./${itemName}/config.json`
// 同步读取配置文件文件路径
let data = fs.readFileSync(path)
let person = data.toString()
let dirArr = JSON.parse(person)
// 复制文件到对应目录
arrCopy(dirArr)
function arrCopy (arr) {
  arr.forEach((item) => {
    exists(item.src, item.dest, copy)
  })
  console.log('文件复制完毕')
}

// 复制文件或目录到对应目录函数
function copy (src, dst) {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err
    }

    paths.forEach(function (path) {
      let _src = src + '/' + path
      let _dst = dst + '/' + path
      let readable, writable

      stat(_src, function (err, st) {
        if (err) {
          throw err
        }

        // 判断是否为文件
        if (st.isFile()) {
          // 创建读取流
          readable = fs.createReadStream(_src)
          // 创建写入流
          writable = fs.createWriteStream(_dst)
          // 通过管道来传输流
          readable.pipe(writable)

          // 如果是目录则递归调用自身
        } else if (st.isDirectory()) {
          exists(_src, _dst, copy)
        }
      })
    })
  })
}
// 在复制目录前需要判断该目录是否存在
function exists (src, dst, callback) {
  fs.exists(src, function (exists) {
    if (!exists) {
      console.log('你要复制的文件目录不存在')
      return false
    }
  })
  fs.exists(dst, function (exists) {
    if (!exists) {
      console.log('你要copy的目的目录不存在')
      return false
    }
  })
  callback(src, dst)
}
