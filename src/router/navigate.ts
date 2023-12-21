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
		} else if (localStorage.getItem('blog-backend-token') && !['BlogBackendLogin'].includes(String(to.name))) {
			console.log('===to===', to);

			const blogBackendStore = useBlogBackendStore();
			getRouterconfiguserrouterquery().then((result) => {
				blogBackendStore.changeRouterInfo(result.data.content);
			});
			routes.forEach((route) => {
				if (route.path === '/blogBackend') {
					blogBackendStore.routerInfo.forEach((item) => {
						router.addRoute('BlogBackend', {
							path: item.path,
							component: componets[item.componentName],
							name: item.name,
							meta: (item.meta ?? {}) as { [k in string]: any },
						});
					});
				}
			});
			next();
		} else {
			next();
		}
	} else {
		console.log('===不是后台===');
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
