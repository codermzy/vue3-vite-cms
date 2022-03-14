import { defineStore } from 'pinia'
import router from '@/router'

import { accountLoginRequest } from '@/service/login/login'

import { IAccount } from '@/service/login/types'

import localCache from '@/utils/cache'

interface IUserState {
  token?: string
  userInfo?: any
  userMenus?: any
  userPermissions?: string[]
}

export function setupUser() {
  const userStore = useUserStore()
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => ({
    token: undefined,
    userInfo: undefined,
    userMenus: undefined,
    userPermissions: undefined,
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      localCache.setCache('token', token)
    },

    async accountLoginAction(params: IAccount) {
      // 1.实现登陆逻辑
      const loginResult = await accountLoginRequest(params)
      // 获取并设置token
      const { id, token } = loginResult.data
      this.setToken(token)

      router.push('/main')
    },
  },
})
