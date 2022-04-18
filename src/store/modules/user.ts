import { defineStore } from 'pinia'
import router from '@/router'

import {
  accountLoginRequest,
  requestUserInfoById,
  reqestUserMenusByRoleId,
} from '@/service/login/login'

import { IAccount } from '@/service/login/types'

import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'

interface IUserState {
  token?: string
  userInfo?: any
  userMenus?: any
  userPermissions?: string[]
}

export function setupUser() {
  const userStore = useUserStore()

  // 设置 token
  const token = localCache.getCache('token')
  token && userStore.setToken(token)

  // 设置 userInfo
  const userInfo = localCache.getCache('userInfo')
  userInfo && userStore.setUserInfo(userInfo)

  // 设置 userMenus
  const userMenus = localCache.getCache('userMenus')
  userMenus && userStore.setUserMenus(userMenus)
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
      this.token = token
      localCache.setCache('token', token)
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)
    },
    setUserMenus(userMenus: any) {
      this.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)

      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },

    async accountLoginAction(params: IAccount) {
      // 1.实现登陆逻辑
      const loginResult = await accountLoginRequest(params)
      // 获取并设置token
      const { id, token } = loginResult.data
      // 保存token到state
      this.setToken(token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      // 保存userInfo
      this.setUserInfo(userInfo)

      // 3.获取用户菜单
      const userMenusResult = await reqestUserMenusByRoleId(id)
      const userMenus = userMenusResult.data
      // 保存userMenus
      this.setUserMenus(userMenus)

      router.push('/main')
    },
  },
})
