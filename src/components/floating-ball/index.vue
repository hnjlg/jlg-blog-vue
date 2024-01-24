<template>
	<div
		class="drag-ball-container"
		:style="`right:${elRight}px;bottom:${elBottom}px`"
		draggable="true"
		@dragstart="dragstart($event)"
		@dragend="dragend($event)"
	>
		<slot> </slot>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({
	name: 'FloatingBall',
});

const startClientX = ref(0); //记录开始的横坐标位置
const startClientY = ref(0); //记录开始的纵坐标位置
const elRight = ref(50); //定位-初始位置
const elBottom = ref(100); //定位-初始位置
// 拖拽开始事件
const dragstart = (e: MouseEvent) => {
	// 记录拖拽元素初始位置
	startClientX.value = e.clientX;
	startClientY.value = e.clientY;
};
// 拖拽完成事件
const dragend = (e: MouseEvent) => {
	const x = startClientX.value - e.clientX; // 计算偏移量
	const y = startClientY.value - e.clientY;
	if (elRight.value + x < 0) {
		elRight.value = 0;
	} else if (elRight.value + x + e.target.clientWidth > window.innerWidth) {
		elRight.value = window.innerWidth - e.target.clientWidth;
	} else {
		elRight.value += x;
	}
	if (elBottom.value + y < 0) {
		elBottom.value = 0;
	} else if (elBottom.value + y + e.target.clientHeight > window.innerHeight) {
		elBottom.value = window.innerHeight - e.target.clientHeight;
	} else {
		elBottom.value += y;
	}
};
</script>
<style scoped lang="scss">
.drag-ball-container {
	position: absolute;
	cursor: move;
	z-index: 9999;
}
</style>
