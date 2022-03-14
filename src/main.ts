import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from './store'

import './assets/css/index.less'

import { globalRegister } from '@/global'

const app = createApp(App)

// 使用pinia
setupStore(app)

app.use(router)

globalRegister(app)
app.mount('#app')
