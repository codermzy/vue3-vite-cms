import { createPinia } from 'pinia'

import { setupUser } from './modules/user'

const store = createPinia()

export function setupStore() {
  setupUser()
}

export default store
