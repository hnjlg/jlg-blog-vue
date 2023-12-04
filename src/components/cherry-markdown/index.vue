<template>
	<div ref="mdboxRef" class="cherry-markdown-container">
		<div :id="uuid" ref="mdcontentRef" class="cherry-markdown-content"></div>
		<div v-if="props.displayToc" class="cherry-markdown-toc">
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
		defaultContent: string | null;
		displayToc: boolean;
	}>(),
	{ defaultContent: '', displayToc: false }
);
const uuid = generateUniqueID();

const cherry = new Cherry({
	id: uuid,
	value: props.defaultContent ?? '',
});

const toc = computed(() => {
	return cherry.getToc();
});

const mdboxRef = ref<HTMLElement>();
const mdcontentRef = ref<HTMLElement>();
onMounted(() => {
	const sourceElement = document.querySelectorAll('#' + uuid);
	if (sourceElement.length > 0) {
		mdboxRef.value?.replaceChild(sourceElement[sourceElement.length - 1], mdcontentRef.value as Node);
	} else {
		console.log('cherry >>> 未找到UUID');
	}
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
	uuid,
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
