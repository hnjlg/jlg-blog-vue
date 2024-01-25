import { blobHomeContentBackgroundHandleClick } from '@/views/blob/home/hooks/useBackgroundContent';
import { NavigationGuardWithThis, NavigationHookAfter } from 'vue-router';
import { router, components } from './index';
import useBlogBackendStore from '@/store/blog-backend';
import initRoutes from './initRoutes';

export const isFirstLoad = ref(true);

export const isAddAxiosRoute = ref(false);

export const beforeNav: NavigationGuardWithThis<undefined> = (to, _from, next) => {
	// 进入后台
	if (to.fullPath.startsWith('/blogBackend')) {
		if (isFirstLoad.value) {
			initRoutes();
			isFirstLoad.value = false;
		}
		// 后台已登录
		if (sessionStorage.getItem('blog-backend-token')) {
			if (['BlogBackendLogin', 'BlogBackendRegister'].includes(String(to.name))) {
				next({ name: 'BlogBackendIndex' });
			} else {
				if (!isAddAxiosRoute.value) {
					const blogBackendStore = useBlogBackendStore();
					blogBackendStore.routerInfo.forEach((iitem) => {
						iitem.children?.forEach((item) => {
							router.addRoute('BlogBackend', {
								path: item.path,
								component: components[item.componentName],
								name: item.name,
								meta: item.meta ?? {},
							});
						});
					});

					isAddAxiosRoute.value = true;
					next({ ...to, replace: true });
				} else {
					next();
				}
			}
		}
		// 后台未登录&&不是去登录页
		else if (!sessionStorage.getItem('blog-backend-token') && to.name !== 'BlogBackendLogin' && to.name !== 'BlogBackendRegister') {
			next({ name: 'BlogBackendLogin' });
		}
		// 后台未登录&&去登录页
		else {
			next();
		}
	} else {
		next();
	}
};

export const afterNav: NavigationHookAfter = (to) => {
	if ('title' in to.meta) {
		document.title = to.meta.title + '';
	}
	// 博客前台刷新浏览器时，保持正确的背景和首屏渲染
	if ('backgroundShow' in to.meta) {
		blobHomeContentBackgroundHandleClick(to.meta);
	}
	document.title = '丰恺思营销系统';
};
