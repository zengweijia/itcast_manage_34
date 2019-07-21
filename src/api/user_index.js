import axios from '@/utils/myaxios.js'
export const login = (data) => {
  console.log(data)
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}
