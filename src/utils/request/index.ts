import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

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
            text: '正在请求'
          })
        }
        return config
      },
      (err) => {
        console.log('请求失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (config) => {
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
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, rejects) => {
      //单个请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config) //请求数据
        .then((res) => {
          //单个请求的拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING //把loading打开，不影响下一个请求
          //通过resolve将结果返回出去
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
          rejects(err)
          this.showLoading = DEFAULT_LOADING
        })
    })
  }
}

export default Request
