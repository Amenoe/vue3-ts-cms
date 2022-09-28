import { createApp } from 'vue'
import { globalRegister } from './registerApp'

import 'normalize.css'
import './assets/css/index.css'

import App from './App.vue'
import router from './router'
import store, { setupRouter } from './stores'

const app = createApp(App)

app.use(store)
setupRouter() //重新设置pinia中的login
app.use(router)

//如果插件是一个对象，必须提供 install 方法。
//如果插件(globalRegister)是一个函数，它会被作为 install 方法。install 方法调用时，会将 app 作为参数传入。
app.use(globalRegister)

app.mount('#app')
