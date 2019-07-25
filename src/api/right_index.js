import axios from '@/utils/myaxios.js'

// 获取所有权限列表
export const getAllRightlist = (type) => {
  return axios({
    url: `rights/${type}`,
    method: 'get'
  })
}


