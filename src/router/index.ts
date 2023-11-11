import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/markdown-test',
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
		path: '/home',
		component: () => import('@/views/home/index.vue'),
		meta: {
			keepAlive: true,
		},
	},
	{
		path: '/markdown-test',
		component: () => import('@/views/markdown-test/index.vue'),
		meta: {
			keepAlive: false,
		},
	},
];

const router = createRouter({
	history: createWebHashHistory('/'),
	routes,
});

router.beforeEach((to, from, next) => {
	console.log(to, from, '全局前置守卫');
	next();
});
router.afterEach((to, from) => {
	console.log(to, from, '全局后置钩子');
});

export default router;
