import router from '@/router';
import useBlogBackendStore from '@/store/blog-backend';
import { isFristLoading } from '@/views/blog-backend/home/hooks/variable';

export function loginout() {
	const blogBackendStore = useBlogBackendStore();
	router.push({ name: 'BlogBackendLogin' });
	blogBackendStore.clearUserInfo();
	localStorage.removeItem('blog-backend-token');
	isFristLoading.value = false;
}
