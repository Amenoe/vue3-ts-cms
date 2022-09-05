//service的统一出口
import Request from '@/utils/request'

import LocalCache from '@/utils/cache'

const request = new Request({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: import.meta.env.VITE_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache('token')
      if (token) {
        if (config && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
      }
      return config
    },
    responseInterceptor: (config) => {
      return config
    }
  }
})

export default request
