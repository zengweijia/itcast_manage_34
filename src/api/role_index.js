import axios from '@/utils/myaxios.js'

// 获取所有角色数据
export const getAllRolelist = () => {
  return axios({
    url: 'roles'
  })
}
//分配用户角色
export const grantUserRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data
  })
}
