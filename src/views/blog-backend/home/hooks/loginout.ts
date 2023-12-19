import router from '@/router';
import useBlogBackendStore from '@/store/blog-backend';

export function loginout() {
	const blogBackendStore = useBlogBackendStore();
	router.push({ name: 'BlogBackendLogin' });
	blogBackendStore.clearUserInfo();
	localStorage.removeItem('blog-backend-token');
}
