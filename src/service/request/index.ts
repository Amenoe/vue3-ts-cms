import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

//通过类来封装，有更强的封装性
class Request {
  instance: AxiosInstance //变量，类型是Axios提供的AxiosInstance
  interceptors?: RequestInterceptors //变量，用来保存拦截器
  loadingInstance?

  //要求传入的配置，这样可以通过配置生成不同的实例
  constructor(config: RequestConfig) {
    this.instance = axios.create(config) //创建axios实例
    this.interceptors = config.interceptors
    //使用拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加全局的拦截器，后添加的先执行
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局的请求拦截器')
        //Element的loading组件
        this.loadingInstance = ElLoading.service({
          lock: true,
          text: '正在请求'
        })
        return config
      },
      (err) => {
        console.log('请求失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (config) => {
        console.log('全局的响应拦截器')
        //请求到数据将loading移除
        this.loadingInstance?.close()
        return config.data
      },
      (err) => {
        console.log('响应失败')
        this.loadingInstance?.close()
        return err
      }
    )
  }
  //发送网络请求的方法
  request(config: RequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default Request
