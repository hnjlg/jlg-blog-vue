<template>
	<div class="article-square-page w-full h-full flex">
		<div class="article-square-page-left">
			<article-list
				:table-data="tableData"
				:correspondence="{
					title: 'title',
					publishTime: 'add_time',
					lookAmount: 'reading_quantity',
					author: 'author_name',
				}"
				:is-display-hot="true"
				@click="handleClick"
			></article-list>
		</div>
		<!-- <div class="article-square-page-right w-1/2">123</div> -->
	</div>
</template>

<script setup lang="ts">
import { AT_BlogHotArticleQueryResponse, getBloghotarticlequery } from '@/apiType/production/result';
import ArticleList from '@/components/article-list/index.vue';
import { useRouter } from 'vue-router';
defineOptions({
	name: 'ArticleSquare',
});

const tableData = ref<AT_BlogHotArticleQueryResponse[]>([]);
getBloghotarticlequery(10).then((result) => {
	tableData.value = result.data.content;
});

const router = useRouter();
function handleClick(item: AT_BlogHotArticleQueryResponse) {
	router.push({ name: 'article-details', query: { id: item.id } });
}
</script>
<style scoped lang="scss">
@import '@/assets/styles/scroll.scss';
</style>
