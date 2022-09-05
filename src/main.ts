import { createApp } from 'vue'
import store from './stores'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/css/index.css'
import './permission'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
