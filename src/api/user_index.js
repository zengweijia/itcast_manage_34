import axios from '@/utils/myaxios.js'
export const login = (data) => {
  console.log(data)
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}

export const getAllUserList = (params) => {
  return axios({
    url: 'users',
    params
  })
}

export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 修改用户状态
export const UpdateUserState = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
