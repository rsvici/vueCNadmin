import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

// 获取微信矩阵列表
export const getMatrixList = info => {
  return axios.request({
    url: 'matrixList/list',
    params: info,
    method: 'get'
  })
}

// 添加微信矩阵
export const postAddMatrixList = info => {
  return axios.request({
    url: 'matrixList/add',
    params: info,
    method: 'post'
  })
}
// 修改微信矩阵
export const postUpdMatrix = info => {
  return axios.request({
    url: 'matrixList/update',
    params: info,
    method: 'post'
  })
}

// 删除微信矩阵
export const postdelMatrix = info => {
  return axios.request({
    url: 'matrixList/delete',
    params: info,
    method: 'post'
  })
}

// 获取积分商品列表
export const getIntegralList = info => {
  return axios.request({
    url: 'integral/list',
    params: info,
    method: 'get'
  })
}

// 添加积分商品列表
export const postAddIntegraltList = info => {
  return axios.request({
    url: 'integral/add',
    params: info,
    method: 'post'
  })
}

// 修改积分商品列表
export const postUpdIntegralt = info => {
  return axios.request({
    url: 'integral/update',
    params: info,
    method: 'post'
  })
}

// 删除积分商品列表
export const postdelIntegralt = info => {
  return axios.request({
    url: 'integral/delete',
    params: info,
    method: 'post'
  })
}

// 获取商圈,商场列表
export const getTradingAreaList = info => {
  return axios.request({
    url: 'tradingArea/list',
    params: info,
    method: 'get'
  })
}

// 添加商圈,商场
export const postAddTradingArea = info => {
  return axios.request({
    url: 'tradingArea/add',
    data: info,
    method: 'post'
  })
}

// 修改商圈,商场
export const postUpdTradingArea = info => {
  return axios.request({
    url: 'tradingArea/update',
    params: info,
    method: 'post'
  })
}

// 删除商圈,商场
export const postdelTradingArea = info => {
  return axios.request({
    url: 'tradingArea/delete',
    params: info,
    method: 'post'
  })
}

// 活动
// 活动
// 活动
// 活动
// 获取活动列表
export const getActivityList = info => {
  return axios.request({
    url: 'activity/list',
    params: info,
    method: 'get'
  })
}
// 添加活动
export const postAddactivity = info => {
  return axios.request({
    url: 'activity/add',
    data: info,
    method: 'post'
  })
}
// 删除活动
export const postDelActivity = info => {
  return axios.request({
    url: 'activity/delete',
    params: info,
    method: 'post'
  })
}

// 修改活动
export const postUpdActivity = info => {
  return axios.request({
    url: 'activity/update',
    data: info,
    method: 'post'
  })
}

// 审核活动
export const postAudtitActivity = info => {
  return axios.request({
    url: 'activity/audit',
    data: info,
    method: 'post'
  })
}

// 评论列表
export const getCommentList = info => {
  return axios.request({
    url: 'collect/listComment',
    data: info,
    method: 'get'
  })
}



// 获取用户信息列表
export const getUserList = () => {
  return axios.request({
    url: 'login/registeredList',
    method: 'get'
  })
}

// export const getDragList = () => {
//   return axios.request({
//     url: 'get_drag_list',
//     method: 'get'
//   })
// }

// export const errorReq = () => {
//   return axios.request({
//     url: 'error_url',
//     method: 'post'
//   })
// }

// export const saveErrorLogger = info => {
//   return axios.request({
//     url: 'save_error_logger',
//     data: info,
//     method: 'post'
//   })
// }
