// 这个文件封装与axios相关的所有配置
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 拦截器
// eslint-disable-next-line no-unused-expressions
axios.interceptors.request.use(function (config) {
  var token = localStorage.getItem('itcast_manage_34_token')
  config.headers['Authorization'] = token
  return config
}), function (error) {
  return Promise.reject(error)
}

export default axios
