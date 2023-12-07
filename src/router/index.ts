import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { blobHomeContentBackgroundHandleClick } from '@/views/blob/home/hooks/useBackgroundContent';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: 'blob-backend',
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
				redirect: '/blob-home/blob-content-home',
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
				path: '/blob-home/article-square',
				component: () => import('@/views/blob/article-square/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'article-square',
			},
			{
				path: '/blob-home/article-classification',
				component: () => import('@/views/blob/article-classification/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'article-classification',
			},
			{
				path: '/blob-home/find-article',
				component: () => import('@/views/blob/find-article/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'find-article',
			},
			{
				path: '/blob-home/fks-technology-docs',
				component: () => import('@/views/blob/fks-technology-docs/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'fks-technology-docs',
			},
			{
				path: '/blob-home/fks-component-library-docs',
				component: () => import('@/views/blob/fks-component-library-docs/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'fks-component-library-docs',
			},
			{
				path: '/blob-home/oa-technology-docs',
				component: () => import('@/views/blob/oa-technology-docs/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'oa-technology-docs',
			},
			{
				path: '/blob-home/jlg-component-library-docs',
				component: () => import('@/views/blob/jlg-component-library-docs/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'jlg-component-library-docs',
			},
			{
				path: '/blob-home/contributors',
				component: () => import('@/views/blob/contributors/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: false,
				},
				name: 'contributors',
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
				path: '/blob-home/article-details',
				component: () => import('@/views/blob/article-details/index.vue'),
				meta: {
					keepAlive: true,
					backgroundShow: true,
				},
				name: 'article-details',
			},
		],
	},
	{
		path: '/blob-backend',
		component: () => import('@/views/blog-backend/home/index.vue'),
		meta: {
			keepAlive: false,
		},
		children: [
			{
				path: '/blog-backend',
				redirect: '/blog-backend/blog-backend-index',
			},
			{
				path: '/blog-backend/blog-backend-index',
				component: () => import('@/views/blog-backend/blog-backend-index/index.vue'),
				name: 'blog-backend-index',
			},
			{
				path: '/blog-backend/blog-backend-publish',
				component: () => import('@/views/blog-backend/blog-backend-publish/index.vue'),
				name: 'blog-backend-publish',
			},
			{
				path: '/blog-backend/blog-article-all',
				component: () => import('@/views/blog-backend/blog-article-all/index.vue'),
				name: 'blog-article-all',
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory('/'),
	routes,
});

router.beforeEach((to, from, next) => {
	//如果未匹配到路由
	if (to.matched.length === 0) {
		//如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由。404还没写
		next({ path: from.path ? from.path : '404' });
	} else {
		next(); //如果匹配到正确跳转
	}
});

router.afterEach((to) => {
	// 博客前台刷新浏览器时，保持正确的背景和首屏渲染
	if ('backgroundShow' in to.meta) {
		blobHomeContentBackgroundHandleClick(to.meta);
	}
});

export default router;
