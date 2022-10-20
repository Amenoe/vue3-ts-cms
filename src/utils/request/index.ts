import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, RequestInterceptors, ResultData } from './types'

const DEFAULT_LOADING = true

//通过类来封装，有更强的封装性
class Request {
  instance: AxiosInstance //变量，类型是Axios提供的AxiosInstance
  interceptors?: RequestInterceptors //变量，用来保存拦截器
  loadingInstance?: any
  showLoading: boolean

  //要求传入的配置，这样可以通过配置生成不同的实例
  constructor(config: RequestConfig) {
    this.instance = axios.create(config) //创建axios实例
    this.interceptors = config.interceptors //保存实例的拦截器
    this.showLoading = config.showLoading ?? DEFAULT_LOADING //创建实例的时候，如果没有传入showLoading，默认开启

    this.setupInterceptor()
  }
  setupInterceptor(): void {
    //添加实例拦截器
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
        //是否要开启加载动画
        if (this.showLoading) {
          //Element的loading组件
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: '正在请求',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          console.log('执行Loading')
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        //TODO 网络失败判断
        //请求到数据将loading移除
        this.loadingInstance?.close()
        return res
      },
      (err) => {
        this.loadingInstance?.close()
        return err
      }
    )
  }

  //发送网络请求的方法
  request<T = any>(config: RequestConfig): Promise<T> {
    if (!config.showLoading) {
      this.showLoading = false
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, ResultData<T>>(config)
        .then((res) => {
          console.log(res)
          resolve(res.data)
          this.showLoading = true
        })
        .catch((err) => {
          console.log('服务器未响应')
          reject(err)
          this.showLoading = true
        })
    })
  }

  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
