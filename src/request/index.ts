import axios from 'axios';

const request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 5000,
});

// 请求数据拦截处理
request.interceptors.request.use(
	(config) => {
		const Authorization = '';
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
			if (response.data.message == '403' || response.data.Message == '403') {
				// 没权限
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
		ElMessage.error('请求错误');
		return Promise.reject(error.response);
	}
);

export default request;
