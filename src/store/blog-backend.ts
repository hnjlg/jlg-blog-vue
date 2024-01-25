import { AT_RouterQueryResponse, AT_UserLoginResponse } from '@/apiType/production/result';
import { defineStore } from 'pinia';
// import { RouteRecordRaw } from 'vue-router';
// import { components, routes } from '@/router';

const useBlobStore = defineStore<
	string,
	{
		userInfo: AT_UserLoginResponse;
		routerInfo: AT_RouterQueryResponse[];
	},
	{
		// getRouterInfo: () => RouteRecordRaw[];
		getUserInfo: () => AT_UserLoginResponse;
	},
	{
		changeUserInfo: (userInfo: AT_UserLoginResponse) => void;
		clearUserInfo: () => void;
		changeRouterInfo: (routerInfo: AT_RouterQueryResponse[]) => void;
	}
>('blobStore', {
	// 开启持续化存储
	// 持久化存储插件其他配置
	persist: {
		// 修改存储中使用的键名称，默认为当前 Store的 id
		key: 'storekey',
		// 修改为 sessionStorage，默认为 localStorage
		storage: window.sessionStorage,
		// 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
		paths: ['routerInfo', 'userInfo'],
	},
	state: () => ({
		userInfo: { id: -1, user_name: '', token: '', user_code: '', standing: 1 },
		// 后台路由信息
		routerInfo: [],
	}),
	getters: {
		// 获取用户信息
		getUserInfo() {
			return this.userInfo;
		},
		// // 获取后台路由信息
		// getRouterInfo() {
		// 	return routes.map((route) => {
		// 		if (route.name === 'BlogBackend') {
		// 			route.children = [
		// 				...(route.children ?? []),
		// 				...this.routerInfo
		// 					.map((item) => {
		// 						return {
		// 							path: item.path,
		// 							component: components[item.componentName],
		// 							name: item.name,
		// 							meta: item.meta ?? {},
		// 						};
		// 					})
		// 					.filter((item: { path: string }) => !route.children?.find((rChild) => rChild.path === item.path)),
		// 			];
		// 		}
		// 		return route;
		// 	});
		// },
	},
	actions: {
		changeUserInfo(userInfo) {
			this.userInfo = userInfo;
			sessionStorage.setItem('blog-backend-userInfo', JSON.stringify(userInfo));
		},
		clearUserInfo() {
			this.userInfo = { id: -1, user_name: '', token: '', user_code: '', standing: 1 };
			sessionStorage.removeItem('blog-backend-userInfo');
		},
		changeRouterInfo(routerInfo) {
			this.routerInfo = routerInfo;
		},
	},
});

export default useBlobStore;
