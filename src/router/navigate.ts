import { getRouterconfiguserrouterquery } from '@/apiType/production/result';
import { blobHomeContentBackgroundHandleClick } from '@/views/blob/home/hooks/useBackgroundContent';
import { NavigationGuardWithThis, NavigationHookAfter } from 'vue-router';
import { routes, router, componets } from './index';

import useBlogBackendStore from '@/store/blog-backend';

export const beforeNav: NavigationGuardWithThis<undefined> = (to, _from, next) => {
	if (to.fullPath.startsWith('/blogBackend')) {
		if (localStorage.getItem('blog-backend-token') && to.name === 'BlogBackendLogin') {
			next({ name: 'BlogBackendIndex' });
		} else if (!localStorage.getItem('blog-backend-token') && to.name !== 'BlogBackendLogin') {
			next({ name: 'BlogBackendLogin' });
		} else {
			next();
		}
		if (!['BlogBackendLogin'].includes(String(to.name))) {
			const blogBackendStore = useBlogBackendStore();
			getRouterconfiguserrouterquery().then((result) => {
				// console.log('===blogBackendStore===', blogBackendStore);
				routes.forEach((route) => {
					if (route.path === '/blogBackend') {
						result.data.content.forEach((item) => {
							router.addRoute('BlogBackend', {
								path: item.path,
								component: componets[item.componentName],
								name: item.name,
								meta: (item.meta ?? {}) as { [k in string]: any },
							});
						});
					}
				});
				// console.log('====12==', routes);

				blogBackendStore.changeRouterInfo(result.data.content);
			});
		}
	}

	next();
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
