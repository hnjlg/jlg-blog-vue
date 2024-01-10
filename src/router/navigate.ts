import { blobHomeContentBackgroundHandleClick } from '@/views/blob/home/hooks/useBackgroundContent';
import { NavigationGuardWithThis, NavigationHookAfter } from 'vue-router';
import { router, componets } from './index';
import useBlogBackendStore from '@/store/blog-backend';
import initRoutes from './initRoutes';

let isFirstLoad = true;

let i = 0;
export const beforeNav: NavigationGuardWithThis<undefined> = (to, _from, next) => {
	console.log('======', isFirstLoad, ++i);

	// 进入后台
	if (to.fullPath.startsWith('/blogBackend')) {
		if (isFirstLoad) {
			initRoutes();
		}

		// 后台已登录
		if (localStorage.getItem('blog-backend-token')) {
			// 后台已登录&&去登录页=拦截放行到首页
			if (to.name === 'BlogBackendLogin') {
				next({ name: 'BlogBackendIndex' });
			}
			// 后台已登录&&去登录页、注册、404等系统页面之外的页面
			else if (!['BlogBackendLogin', 'BlogBackendRegister'].includes(String(to.name)) && isFirstLoad) {
				const blogBackendStore = useBlogBackendStore();
				blogBackendStore.routerInfo.forEach((item) => {
					router.addRoute('BlogBackend', {
						path: item.path,
						component: componets[item.componentName],
						name: item.name,
						meta: (item.meta ?? {}) as { [k in string]: any },
					});
				});
				next({ ...to, replace: true });
			} else {
				next();
			}
		}
		// 后台未登录&&不是去登录页
		else if (!localStorage.getItem('blog-backend-token') && to.name !== 'BlogBackendLogin' && to.name !== 'BlogBackendRegister') {
			next({ name: 'BlogBackendLogin' });
		}
		// 后台未登录&&去登录页
		else {
			next();
		}
	} else {
		next();
	}

	isFirstLoad = false;
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
