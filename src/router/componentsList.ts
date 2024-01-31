export const components: { [key: string]: () => Promise<void | typeof import('@/views/blog-backend/BlogArticleAll/index.vue')> } = {
	BlogArticleAll: () => import('@/views/blog-backend/BlogArticleAll/index.vue'),
	BlogArticleAllMe: () => import('@/views/blog-backend/BlogArticleAllMe/index.vue'),
	BlogBackendIndex: () => import('@/views/blog-backend/BlogBackendIndex/index.vue'),
	BlogBackendLogin: () => import('@/views/blog-backend/BlogBackendLogin/index.vue'),
	BlogBackend: () => import('@/views/blog-backend/home/index.vue'),
	UserManagement: () => import('@/views/blog-backend/UserManagement/index.vue'),
	TagManagement: () => import('@/views/blog-backend/TagManagement/index.vue'),
	CatalogManagement: () => import('@/views/blog-backend/CatalogManagement/index.vue'),
	TreeManagement: () => import('@/views/blog-backend/TreeManagement/index.vue'),
};
