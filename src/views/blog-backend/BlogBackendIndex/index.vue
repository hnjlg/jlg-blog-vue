<!-- blog后台首页 -->
<template>
	<div>blog后台首页</div>
</template>

<script lang="ts" setup>
import { pageLoading } from '../home/hooks/variable';

defineOptions({
	name: 'BlogBackendIndex',
});

function initPage() {
	console.log('initPage');
	nextTick(() => {
		pageLoading.value = false;
	});
}
initPage();
</script>

<style lang="scss" scoped></style>
