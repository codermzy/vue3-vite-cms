import { App } from 'vue'
import { createPinia } from 'pinia'

import { setupUser } from './modules/user'

const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}
