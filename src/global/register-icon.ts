import { App } from 'vue'

import { Iphone, User, UserFilled } from '@element-plus/icons-vue'

const iconModule = [User, UserFilled, Iphone]

export default function (app: App) {
  for (const icon of iconModule) {
    app.component(icon.name, icon)
  }
}
