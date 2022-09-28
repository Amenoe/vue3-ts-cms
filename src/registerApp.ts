import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { formatUtcString } from '@/utils/date-format'

function registerProperties(app: App) {
  //全局的过滤函数
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}

function registerEleIcon(app: App) {
  //全局引入element-icon图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(
      'el-icon' + key.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()),
      component
    )
  }
}

//全局注册函数
export function globalRegister(app: App): void {
  app.use(registerProperties)
  registerEleIcon(app)
}
