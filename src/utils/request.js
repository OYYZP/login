import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
// 创建请求
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时时间
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  // 注入token
  if (store.getters.token) {
    // 让请求带上Authorization
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      // 提示错误
      Message.error(message)
      // 业务错误,不能进入then,返回错误进入catch
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 提示错误
    Message.error(error.message)
    // 返回执行错误,进入catch
    return Promise.reject(error)
  }
)

// 导出service实例
export default service
