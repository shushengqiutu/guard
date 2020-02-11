export const validcodeName = (rule, value, callback) => {
  let reg = /[0-9a-zA-Z]{4,9}/
  if (!reg.test(value)) {
    callback(new Error('账号必须是由4-9位数字和字母组合'))
  } else {
    callback()
  }
}
