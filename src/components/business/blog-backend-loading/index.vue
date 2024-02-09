<template>
	<div class="prevent-event">
		<slot @click="forbidden"></slot>
		<lottie-animation v-show="props.modelValue" class="blog-backend-loading-container" :src="movingCar"></lottie-animation>
	</div>
</template>

<script setup lang="ts">
import LottieAnimation from '@/components/lottie-animation/index.vue';
import movingCar from '@/assets/lottie/movingCar';

defineOptions({
	name: 'BlogBackendLoading',
});

const props = withDefaults(defineProps<{ modelValue: boolean }>(), {});

const forbidden = (e: PointerEvent) => {
	if (props.modelValue) {
		e.preventDefault();
		e.stopPropagation();
	}
};
</script>

<style scoped lang="scss">
.prevent-event {
	.blog-backend-loading-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
