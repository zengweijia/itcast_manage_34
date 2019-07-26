import axios from '@/utils/myaxios.js'

// 获取所有角色数据
export const getAllRolelist = () => {
  return axios({
    url: 'roles'
  })
}
// 分配用户角色
export const grantUserRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data
  })
}

// 删除角色指定权限
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

// 角色管理--授权
export const grantRightById = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}

// 角色管理--添加角色
export const addRole = (data) => {
  return axios({
    url: `roles`,
    method: 'post',
    data
  })
}
