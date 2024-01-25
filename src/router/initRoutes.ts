import { router, components } from './index';

export default function () {
	router.addRoute({
		path: '/blogBackend',
		component: components.BlogBackend,
		redirect: '/BlogBackendIndex',
		name: 'BlogBackend',
		meta: {
			keepAlive: true,
		},
		children: [],
	});
	router.addRoute('BlogBackend', {
		path: '/blogBackend/BlogBackendIndex',
		component: components.BlogBackendIndex,
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
	router.addRoute('BlogBackend', {
		path: '/blogBackend/BlogBackendRegister',
		component: () => import('@/views/blog-backend/BlogBackendRegister/index.vue'),
		meta: {
			keepAlive: false,
			systemPage: false,
			title: '注册',
		},
		name: 'BlogBackendRegister',
	});
}
