//ts的声明文件，可以在这给第三方库进行类型声明
/* eslint-disable */
/// <reference types="vite/client" />

//因为ts无法识别.vue文件，所以引入组件可能报错
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

//环境变量的类型提示
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_BASE_API: string
  readonly VITE_TIME_OUT: number
}
