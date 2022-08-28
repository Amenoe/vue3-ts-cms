//service的统一出口
import { useStore } from '@/stores'
import Request from './request'
const store = useStore()

const rainRequest = new Request({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: import.meta.env.VITE_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功的拦截')
      return config
    },
    responseInterceptor: (config) => {
      console.log('响应成功的拦截')
      return config.data
    }
  }
})

export default rainRequest
