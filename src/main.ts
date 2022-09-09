import { createApp } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import store from './stores'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/css/index.css'
import './permission'

const app = createApp(App)
//全局引入element-icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(
    'el-icon' + key.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()),
    component
  )
  // app.component(key, component)
}

app.use(store)
app.use(router)

app.mount('#app')
