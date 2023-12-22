<template>
	<div ref="cherryMarkdownContent" class="cherry">
		<div></div>
	</div>
</template>

<script setup lang="ts">
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
