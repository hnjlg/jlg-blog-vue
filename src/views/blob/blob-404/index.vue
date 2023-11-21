<template>
	<div class="blob-not-found-container">
		<BackgroundContentHeader></BackgroundContentHeader>
		<div class="blob-not-found"></div>
	</div>
</template>

<script setup lang="ts">
import BackgroundContentHeader from '@/components/background-content-header/index.vue';
defineOptions({
	name: 'BlobNotFound',
});
</script>
<style scoped lang="scss">
.blob-not-found-container {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.blob-not-found {
		width: 50%;
		height: 50%;
		background: url('./svg/undraw_page_not_found_re_e9o6.svg') center/cover no-repeat;
	}
}
</style>
