import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8089/', // 后端API地址
                changeOrigin: true, // 允许跨域
                ws: true, // 允许websocket代理
                // 重写路径 --> 作用与vue配置pathRewrite作用相同
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
});
