<!-- blog后台首页 -->
<template>
	<div>blog后台首页</div>
</template>

<script lang="ts" setup>
import { pageLoading } from '../home/hooks/variable';
import { socketIo } from '@/mixin/useSocketHook';

defineOptions({
	name: 'BlogBackendIndex',
});

function initPage() {
	nextTick(() => {
		pageLoading.value = false;
	});
	// socketIo.value?.on('newMessage', (data) => {
	// 	console.log(data, 'data');
	// });

	// socketIo.value?.emit('testGet');

	socketIo.value?.emit('reqHistoryMsg');

	socketIo.value?.on('resHistoryMsg', (data) => {
		console.log(data, 'datadatadatadatadatadatadata');
	});

	// socketIo.value?.emit('resNewMessage');

	socketIo.value?.on('resNewMessage', (data) => {
		console.log(data, 'datadatadatadatadatadatadata');
	});
}
initPage();
</script>

<style lang="scss" scoped></style>
