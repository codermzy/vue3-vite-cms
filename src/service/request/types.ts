import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ZyRequestInterceptors<T = AxiosResponse> {
  requestInsterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInsterceptorCatch?: (error: any) => any
  responseInsterceptor?: (res: T) => T
  responseInsterceptorCatch?: (error: any) => any
}

export interface ZyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZyRequestInterceptors<T>
  showLoading?: boolean
}
