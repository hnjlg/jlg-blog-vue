<template>
	<div class="page-box border-2 border-solid border-black my-1 mx-2 p-1 rounded">首页</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'TestHome',
});
onMounted(() => {
	console.log('TestHome');
});
</script>

<style scoped lang="scss">
.page-box {
	overflow: hidden;
	min-height: calc(100vh - 8px);
}
</style>
