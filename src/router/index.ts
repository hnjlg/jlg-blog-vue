import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { blobHomeContentBackgroundHandleClick } from '@/views/blob/home/hooks/useBackgroundContent';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: 'blob-home',
	},
	{
		path: '/home',
		component: () => import('@/views/home/index.vue'),
		meta: {
			keepAlive: true,
		},
	},
	{
		path: '/errorSDK',
		component: () => import('@/views/error-sdk/index.vue'),
		beforeEnter: (to, from) => {
			console.log(to, from, '路由独享守卫');
		},
		meta: {
			keepAlive: false,
		},
	},
	{
		path: '/markdown-test',
		component: () => import('@/views/markdown-test/index.vue'),
		meta: {
			keepAlive: false,
		},
	},
	{
		path: '/blob-home',
		component: () => import('@/views/blob/home/index.vue'),
		meta: {
			keepAlive: true,
		},
		children: [
			{
				path: '/blob-home',
				redirect: '/blob-home/blob-login',
			},
			{
				path: '/blob-home/blob-content-home',
				component: () => import('@/views/blob/blob-content-home/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'blob-content-home',
			},
			{
				path: '/blob-home/log-management',
				component: () => import('@/views/blob/log-management/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'log-management',
			},
			{
				path: '/blob-home/about-the-project',
				component: () => import('@/views/blob/about-the-project/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'about-the-project',
			},
			{
				path: '/blob-home/system-monitoring',
				component: () => import('@/views/blob/system-monitoring/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'system-monitoring',
			},
			{
				path: '/blob-home/user-management',
				component: () => import('@/views/blob/user-management/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'user-management',
			},
			{
				path: '/blob-home/sample-management',
				component: () => import('@/views/blob/sample-management/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'sample-management',
			},
			{
				path: '/blob-home/data-analysis',
				component: () => import('@/views/blob/data-analysis/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'data-analysis',
			},
			{
				path: '/blob-home/model-prediction',
				component: () => import('@/views/blob/model-prediction/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'model-prediction',
			},
			{
				path: '/blob-home/individual-center',
				component: () => import('@/views/blob/individual-center/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'individual-center',
			},
			{
				path: '/blob-home/blob-login',
				component: () => import('@/views/blob/login/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: true,
				},
				name: 'blob-login',
			},
			{
				path: '/blob-home/blob-register',
				component: () => import('@/views/blob/register/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: true,
				},
				name: 'blob-register',
			},
			{
				path: '/blob-home/blob-404',
				component: () => import('@/views/blob/blob-404/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: true,
				},
				name: 'blob-404',
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory('/'),
	routes,
});

router.beforeEach((_to, _from, next) => {
	next();
});
router.afterEach((to) => {
	// 博客前台刷新浏览器时，保持正确的背景和首屏渲染
	if ('backgroundShow' in to.meta) {
		blobHomeContentBackgroundHandleClick(to.meta);
	}
});

export default router;
