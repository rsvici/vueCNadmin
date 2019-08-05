import axios from '@/libs/api.request'

export const login = info => {
  return axios.request({
    url: 'userInfo/login',
    params: info,
    method: 'post',
  })
}

export const getUserInfo = info=> {
  return axios.request({
    url: 'sysMenu/getUserMenuList',
    params: info,
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

// 用户信息
// 获取用户信息
export const sysUserList = info => {
  return axios.request({
    url: 'sysUser/listUser',
    params: info,
    method: 'get'
  })
}

// 获取详细用户信息
export const sysUserInfo = info => {
  return axios.request({
    url: 'sysUser/getInfo',
    params: info,
    method: 'get'
  })
}
// 添加用户信息
export const saveUserInfo = info => {
  return axios.request({
    url: 'sysUser/save',
    params: info,
    method: 'post'
  })
}
// 修改用户信息
export const updateUserInfo = info => {
  return axios.request({
    url: 'sysUser/update',
    params: info,
    method: 'post'
  })
}
// 删除用户信息
export const deleteUserInfo = info => {
  return axios.request({
    url: 'sysUser/delete',
    params: info,
    method: 'post'
  })
}
// 角色列表
// 查看角色列表
export const getRoleList = info => {
  return axios.request({
    url: 'sysMenu/getRoleList',
    params: info,
    method: 'get'
  })
}

// 添加角色信息
export const saveSysMenuInfo = info => {
  return axios.request({
    url: 'sysMenu/save',
    data: info,
    method: 'post'
  })
}
// 修改角色信息
export const updateSysMenuInfo = info => {
  return axios.request({
    url: 'sysMenu/update',
    data: info,
    method: 'post'
  })
}
// 删除角色信息
export const deleteSysMenuInfo = info => {
  return axios.request({
    url: 'sysMenu/delete',
    params: info,
    method: 'post'
  })
}
