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


// 获取商圈列表
export const getTradingAreaList = info => {
  return axios.request({
    url: 'tradingArea/list',
    params: info,
    method: 'get'
  })
}

// 添加商圈列表
export const postAddTradingArea = info => {
  return axios.request({
    url: 'tradingArea/add',
    params: info,
    method: 'post'
  })
}

// 修改商圈列表
export const postUpdTradingArea = info => {
  return axios.request({
    url: 'tradingArea/update',
    params: info,
    method: 'post'
  })
}

// 删除商圈列表
export const postdelTradingArea  = info => {
  return axios.request({
    url: 'tradingArea/delete',
    params: info,
    method: 'post'
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
