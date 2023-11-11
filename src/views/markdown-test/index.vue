<template>
	<div>
		<CherryMarkdown :ref="test" :default-content="defaultContent"></CherryMarkdown>
		<MarkDownShow :content="modelValue"></MarkDownShow>
	</div>
</template>

<script setup lang="ts">
import CherryMarkdown from '@/components/cherry-markdown/index.vue';
import MarkDownShow from '@/components/markdown-show/index.vue';

defineOptions({
	name: 'MarkdownTest',
});

const test = ref();

const modelValue = ref('<h1>一级标题</h1><h2>二级标题</h2>');

const defaultContent = ref('# 一级标题\n## 二级标题');
// test.value.cherry.getMarkdown();
// test.value.cherry.getHtml();
// console.log(test.value.cherry.getMarkdown(), test.value.cherry.getHtml());
</script>
