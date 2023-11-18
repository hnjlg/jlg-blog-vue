<template>
	<div class="article-square-container">
		<blob-article-tree :article-tree="articleTree" @article-click="articleClick" />
	</div>
</template>

<script setup lang="ts">
import BlobArticleTree from '@/components/blob-article-tree/index.vue';
import { I_ArticleClickObj, I_ArticleTreeItem } from '@/components/blob-article-tree/type';
import { useRouter } from 'vue-router';
defineOptions({
	name: 'ArticleSquare',
});

const router = useRouter();

const articleTree = ref<I_ArticleTreeItem[]>([
	{
		level: 1,
		title: 'Blob',
	},
	{
		level: 2,
		title: 'Javascript',
		children: [
			{
				id: 1,
				level: 3,
				title: '你不知道的JavaScript上卷',
			},
			{
				id: 2,
				level: 3,
				title: '你不知道的JavaScript中卷',
			},
			{
				id: 3,
				level: 3,
				title: '你不知道的JavaScript下卷',
			},
		],
	},
	{
		level: 2,
		title: 'Vue3',
		children: [
			{
				id: 4,
				level: 3,
				title: 'Vue3xx',
			},
			{
				id: 5,
				level: 3,
				title: 'Vue3aa',
			},
		],
	},
]);

const articleClick = (obj: I_ArticleClickObj) => {
	console.log(obj);
	router.push({ name: 'article-details', query: { id: obj.articleCld.id } });
};
</script>
