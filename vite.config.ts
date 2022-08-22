import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

function resolve(dir) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
//除了mode还有command，ssrBuild等函数
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 mode 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 VITE_ 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    base: env.VITE_BASE_URL,
    server: {
      port: 8088
    }
  };
});
