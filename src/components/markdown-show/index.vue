<template>
	<div ref="cherryMarkdownContent" :class="mdTheme">
		<div></div>
	</div>
</template>

<script setup lang="ts">
import { mdTheme } from '@/views/blob/home/components/background-content-header/hooks/useMdTheme';
defineOptions({
	name: 'MarkdownShow',
});

const props = withDefaults(defineProps<{ content: string }>(), {});

const cherryMarkdownContent = ref<HTMLDivElement | null>();

watch(
	() => props.content,
	() => {
		replaceNode();
	}
);

function replaceNode() {
	const tempContainer = document.createElement('div');
	tempContainer.innerHTML = props.content;
	cherryMarkdownContent.value?.replaceChild(tempContainer, cherryMarkdownContent.value?.childNodes[0]);
}

onMounted(() => {
	replaceNode();
});
</script>
