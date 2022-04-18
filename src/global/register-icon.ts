import { App } from 'vue'

import {
  Expand,
  Flag,
  Fold,
  Iphone,
  User,
  UserFilled,
} from '@element-plus/icons-vue'

const iconModule = [User, UserFilled, Iphone, Fold, Expand, Flag]

export default function (app: App) {
  for (const icon of iconModule) {
    app.component(icon.name, icon)
  }
}
