import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { blobHomeContentBackgroundHandleClick } from '@/views/blob/home/hooks/useBackgroundContent';
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';

export const routes: RouteRecordRaw[] = [
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
					isInitLoading: false,
					title: '情感分析系统',
				},
				name: 'blob-content-home',
			},
			{
				path: '/blob-home/log-management',
				component: () => import('@/views/blob/log-management/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: false,
					isInitLoading: true,
					title: '日志管理',
					icon: 'undraw_body_text_re_9riw_svg',
				},
				name: 'log-management',
			},
			{
				path: '/blob-home/about-the-project',
				component: () => import('@/views/blob/about-the-project/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
					isInitLoading: false,
					title: 'About The Project',
					icon: 'undraw_publish_article_re_3x8h_svg',
				},
				name: 'about-the-project',
			},
			{
				path: '/blob-home/system-monitoring',
				component: () => import('@/views/blob/system-monitoring/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: false,
					isInitLoading: true,
					title: '系统监控',
					icon: 'undraw_online_information_re_erks_svg',
				},
				name: 'system-monitoring',
			},
			{
				path: '/blob-home/user-management',
				component: () => import('@/views/blob/user-management/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: false,
					isInitLoading: true,
					title: '用户管理',
					icon: 'undraw_blog_post_re_fy5x_svg',
				},
				name: 'user-management',
			},
			{
				path: '/blob-home/sample-management',
				component: () => import('@/views/blob/sample-management/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: false,
					isInitLoading: true,
					title: '样本管理',
					icon: 'undraw_articles_wbpb_svg',
				},
				name: 'sample-management',
			},
			{
				path: '/blob-home/data-analysis',
				component: () => import('@/views/blob/data-analysis/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: false,
					isInitLoading: true,
					title: '数据分析',
					icon: 'undraw_blog_post_re_fy5x_svg',
				},
				name: 'data-analysis',
			},
			{
				path: '/blob-home/model-prediction',
				component: () => import('@/views/blob/model-prediction/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: false,
					isInitLoading: true,
					title: '模型预测',
					icon: 'undraw_articles_wbpb_svg',
				},
				name: 'model-prediction',
			},
			{
				path: '/blob-home/individual-center',
				component: () => import('@/views/blob/individual-center/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: false,
					isInitLoading: true,
					title: '个人中心',
					icon: 'undraw_online_information_re_erks_svg',
				},
				name: 'individual-center',
			},
			{
				path: '/blob-home/blob-login',
				component: () => import('@/views/blob/login/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: true,
					isInitLoading: false,
					title: '登录',
				},
				name: 'blob-login',
			},
			{
				path: '/blob-home/blob-register',
				component: () => import('@/views/blob/register/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: true,
					isInitLoading: false,
					title: '注册',
				},
				name: 'blob-register',
			},
			{
				path: '/blob-home/blob-404',
				component: () => import('@/views/blob/blob-404/index.vue'),
				meta: {
					keepAlive: false,
					backgroundShow: true,
					isInitLoading: false,
					title: '404',
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

router.beforeEach((to, _from, next) => {
	if (to.fullPath.includes('/blob-home')) {
		if ('isInitLoading' in to.meta && to.meta.isInitLoading) {
			// 为路由对象添加了isInitLoading的，确认页面是否需要loading
			pageLoading.value = true;
		} else {
			pageLoading.value = false;
		}
		if (localStorage.getItem('blob-token') && (to.name === 'blob-login' || to.name === 'blob-register')) {
			next({ name: 'blob-content-home' });
		} else if (!localStorage.getItem('blob-token') && to.name !== 'blob-login' && to.name !== 'blob-register') {
			pageLoading.value = false;
			next({ name: 'blob-login' });
		} else {
			next();
		}
	}
});
router.afterEach((to) => {
	if ('title' in to.meta) {
		document.title = to.meta.title + '';
	}
	// 博客前台刷新浏览器时，保持正确的背景和首屏渲染
	if ('backgroundShow' in to.meta) {
		blobHomeContentBackgroundHandleClick(to.meta);
	}
});

export default router;
