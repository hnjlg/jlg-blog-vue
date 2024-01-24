import { socketIo } from '@/mixin/useSocketHook';
import router from '@/router';
import { isFirstLoad, isAddAxiosRoute } from '@/router/navigate';
import useBlogBackendStore from '@/store/blog-backend';

export function loginOut() {
	const blogBackendStore = useBlogBackendStore();
	router.push({ name: 'BlogBackendLogin' });
	blogBackendStore.clearUserInfo();
	sessionStorage.removeItem('blog-backend-token');
	socketIo.value?.emit('reqLoginout');
	isAddAxiosRoute.value = false;
	isFirstLoad.value = true;
}
