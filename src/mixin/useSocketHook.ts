import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';
import useBlogBackendStore from '@/store/blog-backend';

export const socketIo = ref<Socket<DefaultEventsMap, DefaultEventsMap>>();

const init = () => {
	const blogBackendStore = useBlogBackendStore();

	const Authorization = localStorage.getItem('blog-backend-token') || blogBackendStore.$state.userInfo.token;

	socketIo.value = io(`http://192.168.13.225:3000?Authorization=${Authorization}`, {
		withCredentials: true, // 允许发送凭据（例如 cookie）
		transports: ['websocket'], // 明确指定使用 WebSocket 连接，以避免跨域问题
	});
};

export default init;
