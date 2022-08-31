//service的统一出口
import Request from './request'

const request = new Request({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: import.meta.env.VITE_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('实例请求拦截器')
      return config
    },
    responseInterceptor: (config) => {
      console.log('实例响应拦截器')
      return config
    }
  }
})

export default request
