import zyRequest from '../index'

import { IDataType } from '../types'
import { ILoginResult, IAccount } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  LoginUserMenu = '/role/', // role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return zyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  })
}

export function requestUserInfoById(id: number) {
  return zyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  })
}

export function reqestUserMenusByRoleId(id: number) {
  return zyRequest.get<IDataType>({
    url: LoginAPI.LoginUserMenu + id + '/menu',
    showLoading: false,
  })
}
