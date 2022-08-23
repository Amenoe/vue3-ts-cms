//ts的声明文件，可以在这给第三方库进行类型声明

/// <reference types="vite/client" />

//环境变量的类型提示
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
}
