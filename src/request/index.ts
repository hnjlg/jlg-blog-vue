import axios from 'axios';
import useBlobStore from '@/store/blog-backend';
import { loginout } from '@/views/blog-backend/home/hooks/loginout';

const request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 5000,
});

const blogBackendStore = useBlobStore();

// 请求数据拦截处理
request.interceptors.request.use(
	(config) => {
		const Authorization = 'Bearer ' + localStorage.getItem('blog-backend-token') || blogBackendStore.$state.userInfo.token;
		config.headers.Authorization = Authorization;
		return config;
	},
	(error) => Promise.reject(error.response)
);

// 返回数据拦截处理
request.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			if (response.data.status !== 1) {
				// 异常
				ElMessage.error(response.data.message || '请求错误');
				return new Promise((_resolve, reject) => {
					reject(response);
				});
			}
			if (response.data.message == '401' || response.data.Message == '401') {
				return new Promise((_resolve, reject) => {
					reject(response);
				});
			}
			// 成功
			return new Promise((resolve) => {
				resolve(response);
			});
		} else {
			return new Promise((_resolve, reject) => {
				// 异常
				ElMessage.error(response.data.message || '请求错误');
				reject(response);
			});
		}
	},
	(error) => {
		if (error.response && error.response.status === 403) {
			ElMessage.error('登录信息过期！');
			nextTick(() => {
				loginout();
			});
		} else {
			ElMessage.error('请求错误');
			console.error(error.message);
		}

		return Promise.reject(error.response);
	}
);

export default request;
