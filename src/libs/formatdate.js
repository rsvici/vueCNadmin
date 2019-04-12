// 时间格式化
export function formatDate(date, fmt) {
  if(date.getTime()<100){
    return ''
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
// 审核格式化
export function formatCheck(formatData) {
  switch (formatData) {
    case '0':
      formatData = '未审核'
      break
    case '1':
      formatData = '通过'
      break
    case '2':
      formatData = '未通过'
      break
  }
  return formatData
}

// 类型格式化
export function formatType(formatData) {
  switch (formatData) {
    case '0':
      formatData = '话剧'
      break
    case '1':
      formatData = '电影'
      break
    case '2':
      formatData = '活动'
      break
    case '3':
      formatData = '运动'
      break
    default:
      formatData = '其它'
  }
  return formatData
}

// 标签1格式化
export function formatLabelOne(formatData) {
  switch (formatData) {
    case '0':
      formatData = '文化 / 体育'
      break
    case '1':
      formatData = '购物'
      break
    case '2':
      formatData = '餐饮/美食'
      break
  }
  return formatData
}
// 标签2格式化
export function formatLabelTow(formatData) {
  switch (formatData) {
    case '0':
      formatData = '乐文'
      break
    case '1':
      formatData = '乐影'
      break
    case '2':
      formatData = '乐动'
      break
    case '3':
      formatData = '乐演'
      break
  }
  return formatData
}
