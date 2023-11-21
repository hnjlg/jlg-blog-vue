import axios from 'axios';
import router from '@/router';

const request = axios.create({
	baseURL: import.meta.env.VITE_APP_BLOB_BASE_URL,
	timeout: 5000,
});

// 请求数据拦截处理
request.interceptors.request.use(
	(config) => {
		config.headers['satoken'] = localStorage.getItem('blob-token');
		return config;
	},
	(error) => Promise.reject(error.response)
);

// 返回数据拦截处理
request.interceptors.response.use(
	(response) => {
		if (response.data.code === 200 && response.data.status) {
			// 成功
			return new Promise((resolve) => {
				resolve(response);
			});
		} else if ([501, 502, 503, 504, 505, 506].includes(response.data.code)) {
			router.push('blob-login');
			window.location.href = '';
			return new Promise((_resolve, reject) => {
				// 异常
				ElMessage.error(response.data.msg);
				reject(response);
			});
		} else {
			return new Promise((_resolve, reject) => {
				// 异常
				ElMessage.error('请求错误');
				reject(response);
			});
		}
	},
	(error) => {
		ElMessage.error('请求错误');
		return Promise.reject(error.response);
	}
);

export default request;
