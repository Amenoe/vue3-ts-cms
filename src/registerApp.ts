import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { formatUtcString } from '@/utils/date-format'

function registerProperties(app: App) {
  //全局的过滤函数
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}

function registerElement(app: App) {
  //全局引入element-icon图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(
      'el-icon' + key.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()),
      component
    )
  }
  //element国际化
  app.use(ElementPlus, {
    locale: zhCn
  })
}

//全局注册函数
export function globalRegister(app: App): void {
  app.use(registerProperties)
  app.use(registerElement)
}
