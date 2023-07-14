// 导入router所需的方法
import { createRouter, createWebHistory } from 'vue-router';

// 路由参数配置
const router = createRouter({
    // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
    history: createWebHistory(),
    routes: [
        {
            path: '/hello',
            name: 'hello',
            component: () => import('@/components/HelloWorld.vue'),
        },

        {
            path: '/',
            name: 'login',
            component: () => import('@/views/login.vue'),
        },

        {
            path: '/index',
            name: 'index',
            component: () => import('@/views/index.vue'),
        },
    ],
});

export default router;
