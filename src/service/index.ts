import Request from '../utils/request'
import localCache from '@/utils/cache'

//请求实例
const request = new Request({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: import.meta.env.VITE_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        if (config && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      if (res.data.code === 0) {
        console.log('请求成功')
        return res.data
      } else {
        //这里是服务器返回的错误代码
        ElMessage.error(res.data.data)
      }
    },
    responseInterceptorCatch: (err) => {
      //这里是直接浏览器报的错
      const { status, data } = err.response
      if (status === 500) {
        ElMessage.error('服务端异常，请稍后重试')
      } else if (status >= 400) {
        ElMessage.error(`${status} ${data}`)
      }
      return err.response //这里返回的也是在this.instance.request.then中接收
    }
  }
})

export default request
