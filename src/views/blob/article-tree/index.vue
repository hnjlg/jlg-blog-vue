<!-- 文章树页面 -->
<template>
	<div class="article-tree-page">
		<el-tree
			:data="pageData"
			:props="{
				children: 'children',
				label: 'label',
			}"
			@node-click="handleNodeClick"
		/>
	</div>
</template>

<script setup lang="ts">
import { postArticletreeallquery, type AT_MySQLResult } from '@/apiType/production/result';
defineOptions({
	name: 'ArticleTree',
});

const handleNodeClick = (data: AT_MySQLResult) => {
	console.log(data);
};

const pageData = ref<AT_MySQLResult[]>([
	{
		label: 'Level one 1',
		children: [
			{
				label: 'Level two 1-1',
				children: [
					{
						label: 'Level three 1-1-1',
					},
				],
			},
		],
	},
	{
		label: 'Level one 2',
		children: [
			{
				label: 'Level two 2-1',
				children: [
					{
						label: 'Level three 2-1-1',
					},
				],
			},
			{
				label: 'Level two 2-2',
				children: [
					{
						label: 'Level three 2-2-1',
					},
				],
			},
		],
	},
	{
		label: 'Level one 3',
		children: [
			{
				label: 'Level two 3-1',
				children: [
					{
						label: 'Level three 3-1-1',
					},
				],
			},
			{
				label: 'Level two 3-2',
				children: [
					{
						label: 'Level three 3-2-1',
					},
				],
			},
		],
	},
]);
postArticletreeallquery().then((result) => {
	if (result.data.status === 1) {
		console.log('===res===', result);
		pageData.value = result.data.content;
	}
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/scroll.scss';
</style>
