<template>
	<div class="page-box border-2 border-solid border-black my-1 mx-2 p-1 rounded">
		<div class="bgimg-container w-full h-128 overflow-hidden bg-blue blur-sm text-center">
			<img class="bgimg-container-item" src="@/assets/img/error-page-top.jpg" alt="" srcset="" />
		</div>
		<div class="content-container container flex justify-between min-h-200 my-8">
			<div class="container-left border-2 border-solid border-black w-full mx-2 rounded">左:这里放编辑器保存的文本</div>
			<div class="container-right border-2 border-solid border-black mx-2 divide-y divide-dashed rounded">
				<div class="w-60 h-30 py-3 px-2">右边第一个</div>
				<div class="w-60 h-30 py-3 px-2">右边第二个</div>
				<div class="w-60 h-30 py-3 px-2">右边第3个</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'ErrorDetail',
});
</script>

<style lang="scss" scoped>
.page-box {
	overflow: hidden;
	min-height: 99vh;
}
.bgimg-container-item {
	width: 100%;
	height: 100%;
}
</style>
