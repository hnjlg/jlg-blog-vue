<template>
	<div
		class="drag-ball-container"
		:style="`right:${props.elRight}px;bottom:${props.elBottom}px`"
		draggable="true"
		@dragstart="dragstart($event)"
		@dragend="dragend($event)"
	>
		<slot> </slot>
	</div>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'FloatingBall',
});

const props = withDefaults(defineProps<{ elRight: number; elBottom: number }>(), {});

const emits = defineEmits(['update:elRight', 'update:elBottom']);

const startClientX = ref(0); //记录开始的横坐标位置
const startClientY = ref(0); //记录开始的纵坐标位置
// 拖拽开始事件
const dragstart = (e: DragEvent) => {
	// 记录拖拽元素初始位置
	startClientX.value = e.clientX;
	startClientY.value = e.clientY;
};
// 拖拽完成事件
const dragend = (e: DragEvent) => {
	if (!e.target) return;
	dragendHandle({
		clientX: e.clientX,
		clientY: e.clientY,
		target: {
			clientWidth: (e.target as HTMLElement).clientWidth,
			clientHeight: (e.target as HTMLElement).clientHeight,
		},
	});
};

const dragendHandle = (e: {
	clientX: number;
	clientY: number;
	target: {
		clientWidth: number;
		clientHeight: number;
	};
}) => {
	const x = startClientX.value - e.clientX; // 计算偏移量
	const y = startClientY.value - e.clientY;
	if (props.elRight + x < 0) {
		emits('update:elRight', 0);
	} else if (props.elRight + x + e.target.clientWidth > window.innerWidth) {
		emits('update:elRight', window.innerWidth - e.target.clientWidth);
	} else {
		emits('update:elRight', props.elRight + x);
	}
	if (props.elBottom + y < 0) {
		emits('update:elBottom', 0);
	} else if (props.elBottom + y + e.target.clientHeight > window.innerHeight) {
		emits('update:elBottom', window.innerHeight - e.target.clientHeight);
	} else {
		emits('update:elBottom', props.elBottom + y);
	}
};

defineExpose({
	dragendHandle,
	startClientX,
	startClientY,
});
</script>
<style scoped lang="scss">
.drag-ball-container {
	position: absolute;
	cursor: move;
	z-index: 9999;
}
</style>
