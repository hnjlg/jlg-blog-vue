import { AT_RouterConfigUserRouterQueryResponse, AT_UserLoginResponse } from '@/apiType/production/result';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

const useBlobStore = defineStore<
	string,
	{
		userInfo: AT_UserLoginResponse;
		routerInfo: AT_RouterConfigUserRouterQueryResponse[];
	},
	{
		getRouterInfo: () => RouteRecordRaw | undefined;
	},
	{
		changeUserInfo: (userInfo: AT_UserLoginResponse) => void;
		clearUserInfo: () => void;
		changeRouterInfo: (routerInfo: AT_RouterConfigUserRouterQueryResponse[]) => void;
	}
>('blobStore', {
	state: () => ({
		userInfo: localStorage.getItem('blog-backend-userInfo') === 'undefined' ? '' : JSON.parse(localStorage.getItem('blog-backend-userInfo') ?? '{}'),
		routerInfo: [],
	}),
	getters: {
		getRouterInfo() {
			// return routes.find((route) => route.name === 'BlogBackend');
			return this.routerInfo;
		},
	},
	actions: {
		changeUserInfo(userInfo) {
			this.userInfo = userInfo;
			localStorage.setItem('blog-backend-userInfo', JSON.stringify(userInfo));
		},
		clearUserInfo() {
			this.userInfo = { id: -1, user_name: '', token: '', user_code: '' };
			localStorage.removeItem('blog-backend-userInfo');
		},
		changeRouterInfo(routerInfo) {
			this.routerInfo = routerInfo;
		},
	},
});

export default useBlobStore;
