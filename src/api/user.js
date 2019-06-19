import axios from '@/libs/api.request'

export const login = info => {
  return axios.request({
    url: 'userInfo/login',
    data: info,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

// 权限管理


export const sysUserList = info => {
  return axios.request({
    url: 'sysUser/listUser',
    data: info,
    method: 'get'
  })
}