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
import { postBlogarticletreeallquery, type AT_ArticleTreeTable } from '@/apiType/production/result';
defineOptions({
	name: 'ArticleTree',
});

const handleNodeClick = (data: AT_ArticleTreeTable) => {
	console.log(data);
};

const pageData = ref<AT_ArticleTreeTable[]>([]);

// 构造树函数
function buildTree(nodes: AT_ArticleTreeTable[]): AT_ArticleTreeTable[] {
	const tree: any[] = [];
	const map: { [k: number | string]: { label: string; children: any[] } } = {};

	nodes.forEach((node) => {
		map[node.id] = { label: node.article_tree_name, children: [] };
	});

	nodes.forEach((node) => {
		if (node.parent_article_tree_id !== null) {
			map[node.parent_article_tree_id].children.push(map[node.id]);
		} else {
			tree.push(map[node.id]);
		}
	});
	return tree;
}

postBlogarticletreeallquery().then((result) => {
	if (result.data.status === 1) {
		pageData.value = buildTree(result.data.content);
	}
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/scroll.scss';
</style>
