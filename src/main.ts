import { createApp } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './permission'
import 'normalize.css'
import './assets/css/index.css'

import App from './App.vue'
import router from './router'
import store from './stores'
import { setupRouter } from './permission'

const app = createApp(App)
//全局引入element-icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(
    'el-icon' + key.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()),
    component
  )
}
app.use(store)
setupRouter() //动态注册文件
app.use(router)
console.log('main.ts log')

app.mount('#app')
