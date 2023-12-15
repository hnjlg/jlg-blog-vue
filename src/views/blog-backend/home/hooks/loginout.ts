import router from '@/router';
import useBlogBackendStore from '@/store/blog-backend';

const blogBackendStore = useBlogBackendStore();

export function loginout() {
	router.push({ name: 'BlogBackendLogin' });
	blogBackendStore.clearUserInfo();
	localStorage.removeItem('blog-backend-token');
}
