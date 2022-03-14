import zyRequest from '../index'

import { IDataType } from '../types'
import { ILoginResult, IAccount } from './types'

export function accountLoginRequest(account: IAccount) {
  return zyRequest.post<IDataType<ILoginResult>>({
    url: '/login',
    data: account,
  })
}
