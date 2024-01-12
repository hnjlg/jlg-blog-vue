<!-- blog后台首页 -->
<template>
	<div>blog后台首页</div>
</template>

<script lang="ts" setup>
import { pageLoading } from '../home/hooks/variable';
import { socketIo } from '@/mixin/useSocketHook';
// import useBlogBackendStore from '@/store/blog-backend';
// import { router, componets } from '@/router';
// import initRoutes from '@/router/initRoutes';

defineOptions({
	name: 'BlogBackendIndex',
});

// const blogBackendStore = useBlogBackendStore();

function initPage() {
	nextTick(() => {
		pageLoading.value = false;
	});
	// socketIo.value?.on('newMessage', (data) => {
	// 	console.log(data, 'data');
	// });

	// socketIo.value?.emit('reqHistoryMsg');

	socketIo.value?.emit('reqReadMessage');

	socketIo.value?.on('resReadMessage', (data) => {
		console.log(data, 'data');
	});

	socketIo.value?.emit('reqHistoryMsg');

	socketIo.value?.on('resHistoryMsg', (data) => {
		console.log(data, 'datadatadatadatadatadatadata');
	});

	// socketIo.value?.emit('resNewMessage');

	socketIo.value?.on('resNewMessage', (data) => {
		console.log(data, 'datadatadatadatadatadatadata');
	});

	// socketIo.value?.on('resRouterChange', (data) => {
	// 	console.log('===data===', data);

	// 	console.log(data, 'datadatadatadatadatadatadata');
	// 	blogBackendStore.changeRouterInfo(data);
	// 	router.removeRoute('BlogBackend');
	// 	initRoutes();
	// 	data.forEach((item) => {
	// 		router.addRoute('BlogBackend', {
	// 			path: item.path,
	// 			component: componets[item.componentName],
	// 			name: item.name,
	// 			meta: (item.meta ?? {}) as { [k in string]: any },
	// 		});
	// 	});
	// });

	socketIo.value?.on('resLoginout', () => {
		console.log('===resLoginout===');
	});
}
initPage();
</script>

<style lang="scss" scoped></style>
