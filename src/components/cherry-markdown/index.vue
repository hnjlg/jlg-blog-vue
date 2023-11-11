<template>
	<div class="cherry-markdown-container">
		<div :id="uuid" class="cherry-markdown-content"></div>
		<div class="cherry-markdown-toc">
			<div v-for="item in toc" :key="item.id">
				{{ item }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import { generateUniqueID } from '@/utils/value';

defineOptions({
	name: 'CherryMarkdown',
});

const props = withDefaults(
	defineProps<{
		defaultContent: string;
	}>(),
	{ defaultContent: '' }
);
const uuid = generateUniqueID();

const cherry = new Cherry({
	id: uuid,
	value: props.defaultContent,
});

const toc = computed(() => {
	return cherry.getToc();
});

const unmount = () => {
	const element = document.getElementById(uuid);
	element && element.parentNode?.removeChild(element);
};

onUnmounted(() => {
	unmount();
});

defineExpose({
	cherry,
	unmount,
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
