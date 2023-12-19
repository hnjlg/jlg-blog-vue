import useBlogBackendStore from '@/store/blog-backend';
import { AxiosInterceptorManager, AxiosResponse } from 'axios';

type FirstParameter<T> = T extends (first: infer P, ...args: any[]) => any ? P : never;

export const interceptorsReq: FirstParameter<AxiosInterceptorManager<any>['use']> = (config) => {
	const blogBackendStore = useBlogBackendStore();
	const Authorization = 'Bearer ' + localStorage.getItem('blog-backend-token') || blogBackendStore.$state.userInfo.token;
	config.headers.Authorization = Authorization;
	return config;
};

export const interceptorsRes: FirstParameter<
	AxiosInterceptorManager<
		AxiosResponse<{
			status: 200 | 401 | 403 | 404;
			message: string;
			content: any;
		}>
	>['use']
> = (response) => {
	if (response.status === 200) {
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
};
