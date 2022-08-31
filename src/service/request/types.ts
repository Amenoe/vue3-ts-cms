import type { AxiosResponse, AxiosRequestConfig } from 'axios'

//接口拦截器
export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig //请求拦截
  requestInterceptorCatch?: (error: any) => any //请求失败拦截

  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any //请求失败拦截
}

//自定义接口，用来替换传入参数的类型，可以传入拦截器
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  showLoading?: boolean
}
