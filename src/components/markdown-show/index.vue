<template>
	<div ref="cherryMarkdownContent">
		<div></div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'MarkdownShow',
});

const props = withDefaults(defineProps<{ content: string }>(), {});

const cherryMarkdownContent = ref<HTMLDivElement | null>();

onMounted(() => {
	const tempContainer = document.createElement('div');
	tempContainer.innerHTML = props.content;
	cherryMarkdownContent.value?.replaceChild(tempContainer, cherryMarkdownContent.value?.childNodes[0]);
});
</script>
