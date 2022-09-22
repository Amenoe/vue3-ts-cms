import { createApp } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'normalize.css'
import './assets/css/index.css'

import App from './App.vue'
import router from './router'
import store, { setupRouter } from './stores'

const app = createApp(App)
//全局引入element-icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(
    'el-icon' + key.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()),
    component
  )
}
app.use(store)
setupRouter() //重新设置pinia中的login
app.use(router)

app.mount('#app')
