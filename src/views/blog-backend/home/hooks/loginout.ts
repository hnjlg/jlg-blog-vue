import { socketIo } from '@/mixin/useSocketHook';
import router from '@/router';
import useBlogBackendStore from '@/store/blog-backend';

export function loginOut() {
	const blogBackendStore = useBlogBackendStore();
	router.push({ name: 'BlogBackendLogin' });
	blogBackendStore.clearUserInfo();
	localStorage.removeItem('blog-backend-token');
	socketIo.value?.emit('reqLoginout');
}
