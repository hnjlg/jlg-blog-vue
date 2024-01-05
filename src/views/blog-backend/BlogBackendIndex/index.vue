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
	console.log('initPage', socketIo);
	nextTick(() => {
		pageLoading.value = false;
	});
	socketIo.on('newMessage', (data) => {
		console.log(data, 'data');
	});

	socketIo.emit('reqHistoryMsg');

	socketIo.on('resHistoryMsg', (data) => {
		console.log(data, 'data');
	});

	socketIo.on('resNewMessage', (data) => {
		console.log(data, 'data2');
	});

	socketIo.emit('reqReadMessage');

	socketIo.on('resReadMessage', (data) => {
		console.log(data, 'data');
	});
}
initPage();
</script>

<style lang="scss" scoped></style>
