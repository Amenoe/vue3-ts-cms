import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// import IconsResolver from 'unplugin-icons/resolver'
// import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
//除了mode还有command，ssrBuild等函数
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        assets: path.resolve(__dirname, './src/assets')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
        //自动引入ElementPlus相关函数和图标组件
        resolvers: [
          ElementPlusResolver()
          // IconsResolver({
          //   prefix: 'icon' // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
          // })
        ],
        dts: 'src/type/auto-import.d.ts', // 调整自动引入的文件位置
        // eslint报错解决
        eslintrc: {
          enabled: false, // Default `false` 开启生成配置文件，一次就行
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          // IconsResolver({
          //   enabledCollections: ['ep']
          // }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],
        dts: 'src/type/components.d.ts'
      })
      // Icons({
      //   autoInstall: true
      // })
    ],
    base: env.VITE_BASE_URL,
    server: {
      port: 8011,
      proxy: {
        '/api': {
          target: 'http://152.136.185.210:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // 全局css变量
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/css/var.less";`
        }
      }
    }
  }
})
