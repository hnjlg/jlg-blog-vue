import { getRouterconfiguserrouterquery } from '@/apiType/production/result';
import { blobHomeContentBackgroundHandleClick } from '@/views/blob/home/hooks/useBackgroundContent';
import { NavigationGuardWithThis, NavigationHookAfter } from 'vue-router';
import { router, componets } from './index';
import useBlogBackendStore from '@/store/blog-backend';

let isFirstLoad = true;

export const beforeNav: NavigationGuardWithThis<undefined> = (to, _from, next) => {
	// 进入后台
	if (to.fullPath.startsWith('/blogBackend')) {
		if (isFirstLoad) {
			router.addRoute({
				path: '/blogBackend',
				component: componets.BlogBackend,
				redirect: '/BlogBackendIndex',
				name: 'BlogBackend',
				meta: {
					keepAlive: true,
				},
				children: [],
			});
			router.addRoute('BlogBackend', {
				path: '/blogBackend/BlogBackendIndex',
				component: componets.BlogBackendIndex,
				meta: {
					keepAlive: true,
					systemPage: true,
					title: '博客后台首页',
				},
				name: 'BlogBackendIndex',
			});
			router.addRoute('BlogBackend', {
				path: '/blogBackend/BlogBackendLogin',
				component: () => import('@/views/blog-backend/BlogBackendLogin/index.vue'),
				meta: {
					keepAlive: false,
					systemPage: false,
					title: '登录',
				},
				name: 'BlogBackendLogin',
			});
		}
		// 后台已登录
		if (localStorage.getItem('blog-backend-token')) {
			// 后台已登录&&去登录页=拦截放行到首页
			if (to.name === 'BlogBackendLogin') {
				next({ name: 'BlogBackendIndex' });
			}
			// 后台已登录&&去登录页、注册、404等系统页面之外的页面
			else if (!['BlogBackendLogin'].includes(String(to.name))) {
				if (isFirstLoad) {
					isFirstLoad = false;
					const blogBackendStore = useBlogBackendStore();
					getRouterconfiguserrouterquery().then((result) => {
						blogBackendStore.changeRouterInfo(result.data.content);
						blogBackendStore.routerInfo.forEach((item) => {
							router.addRoute('BlogBackend', {
								path: item.path,
								component: componets[item.componentName],
								name: item.name,
								meta: (item.meta ?? {}) as { [k in string]: any },
							});
						});
						next({ ...to, replace: true });
					});
				} else {
					next();
				}
			} else {
				next();
			}
		}
		// 后台未登录&&不是去登录页
		else if (!localStorage.getItem('blog-backend-token') && to.name !== 'BlogBackendLogin') {
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
