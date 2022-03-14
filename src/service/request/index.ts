import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZyRequestInterceptors, ZyRequestConfig } from './types'

// 移入loading动画组件以及样式
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

class ZYRequest {
  private instance: AxiosInstance
  private interceptors?: ZyRequestInterceptors
  private loading?: LoadingInstance
  private showLoading: boolean

  constructor(config: ZyRequestConfig) {
    // 创建封装的axios的实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 使用拦截器->这个是实例化ZYRequest传入的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInsterceptor,
      this.interceptors?.requestInsterceptorCatch,
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInsterceptor,
      this.interceptors?.requestInsterceptorCatch,
    )

    // 所有axios实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在拼命加载中...',
            background: 'rgba(0, 0, 0, 0.7)',
          })
        }
        return config
      },
      (err) => {
        return err
      },
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        return err
      },
    )
  }
  request<T>(config: ZyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求拦截器
      if (config.interceptors?.requestInsterceptor) {
        // 如果有请求拦截器,则执行拦截器
        config = config.interceptors?.requestInsterceptor(config)
      }
      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInsterceptor) {
            res = config.interceptors.responseInsterceptor(res)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get<T>(config: ZyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: ZyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: ZyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: ZyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default ZYRequest
