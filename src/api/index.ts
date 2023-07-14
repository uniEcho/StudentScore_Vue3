import axios from 'axios';

// 创建 axios 实例的函数
function createInstance() {
    const instance = axios.create({
        baseURL: '/api',
        timeout: 6000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });

    // 添加请求拦截器
    instance.interceptors.request.use(
        (config: any) => {
            const token = window.localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = token;
            }

            // 如果是 POST 请求，则将 data 转换为 JSON 字符串
            if (config.method === 'post') {
                config.data = JSON.stringify(config.data);
            }
            // 如果是 PUT 请求，则将 data 转换为 JSON 字符串
            if (config.method === 'put') {
                config.data = JSON.stringify(config.data);
            }
            return config;
        },
        error => {
            // 处理请求错误
            console.error(error);
            return Promise.reject(error);
        }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
        response => {
            // 处理响应成功
            console.log('响应成功');
            return response.data;
        },
        async error => {
            // 处理响应错误
            console.error(error);
            if (error.response && error.response.status) {
                const status = error.response.status;
                console.log(status);
            }
            return Promise.reject(error);
        }
    );

    return instance;
}

// 导出默认的 axios 实例
export default createInstance();
