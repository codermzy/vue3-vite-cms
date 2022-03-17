import ZyRequest from './request'
import { BASE_URL, TIMEOUT } from './request/config'
import localCache from '@/utils/cache'

const zyRequest = new ZyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,

  interceptors: {
    requestInsterceptor(config) {
      // 拦截token请求
      const token = localCache.getCache('token')
      console.log(config)
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInsterceptorCatch(error) {
      return error
    },

    responseInsterceptor(config) {
      return config
    },
    responseInsterceptorCatch(error) {
      return error
    },
  },
})
export default zyRequest
