<template>
	<div class="contributor-card-container">
		<div class="contributor-card-top">
			<div class="contributor-card-top-bg"></div>
			<div class="contributor-card-top-img"></div>
		</div>
		<div class="contributor-card-content">本人介绍</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'ContributorCard',
});
</script>

<style scoped lang="scss">
.contributor-card-container {
	box-shadow: 0 0 10px getVar('bgColor');
	border-radius: 10px;

	.contributor-card-top {
		position: relative;
		height: 200px;

		.contributor-card-top-img {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
}
</style>
