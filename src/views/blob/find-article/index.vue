<!-- 搜索标签页面 -->
<template>
	<div class="article-classification-page px-3">
		<div
			class="page-label__search flex items-center sticky top-0 h-10 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-stone-500 shadow-2xl shadow-slate-500/50 cursor-pointer z-10 select-none transition"
		>
			<!-- <el-icon><Search /></el-icon><span class="pl-2">搜索</span><span class="animate-blink">|</span> -->
			<el-icon><Search /></el-icon>
			<!-- <el-input v-model.trim="searchKey" clearable class="caret-slate-500" @keyup.enter="searchFun"> </el-input> -->
			<el-select
				v-model.trim="searchKey"
				filterable
				remote
				reserve-keyword
				placeholder="Please enter a tag keyword"
				clearable
				:remote-method="articleTagsRemoteMethod"
				:loading="articleTagsLoading"
			>
				<el-option v-for="item in articleTagsList" :key="item.id" :label="item.tag_name" :value="item.tag_name" />
			</el-select>
		</div>

		<div class="page-label__hot min-h-[50px] my-8">
			<div v-if="HotArticleTagsList.length !== 0" class="border-l-8 my-10px px-2">
				<div class="text-lg font-bold">热门标签</div>
			</div>
			<div class="flex flex-wrap">
				<span
					v-for="(item, index) in HotArticleTagsList"
					:key="index"
					class="text-base text-stone-500 px-4 m-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer select-none"
					@click="tagHandleEvent(item)"
				>
					{{ item.tag_name + '(' + item.article_count + ')' }}
				</span>
			</div>
		</div>
		<transition name="el-zoom-in-top">
			<div v-show="articleTagsList.length !== 0" class="page-label__all">
				<div class="border-l-8 my-10px px-2">
					<span class="text-lg font-bold">搜索结果</span>
				</div>
				<div class="flex flex-wrap">
					<span
						v-for="(item, index) in articleTagsList"
						:key="index"
						class="text-base text-stone-500 px-4 m-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer select-none"
						@click="tagHandleEvent(item)"
					>
						{{ item.tag_name }}
					</span>
				</div>
			</div>
		</transition>
		<transition name="el-zoom-in-top">
			<div v-show="tableData.length !== 0" class="page-label__article min-h-[100px] my-8">
				<div class="border-l-8 my-10px px-2">
					<div class="text-lg font-bold">文章列表</div>
				</div>
				<article-list
					:table-data="tableData"
					:correspondence="{
						title: 'title',
						publishTime: 'add_time',
						lookAmount: 'reading_quantity',
						author: 'author_name',
					}"
					@click="handleClick"
				></article-list>
			</div>
		</transition>
		<el-empty v-if="tableData.length === 0" description="快来搜索吧！" />
	</div>
</template>

<script setup lang="ts">
import {
	getBloghottagsquery,
	postBlogarticlesquerybyTagId,
	postBlogtagsquery,
	type AT_BlogHotArticleQueryResponse,
	type AT_BlogTagsQueryResponse,
	type AT_BlogHotTagsQueryResponse,
} from '@/apiType/production/result';
import { Search } from '@element-plus/icons-vue';
import ArticleList from '@/components/article-list/index.vue';
import { router } from '@/router/index';

defineOptions({
	name: 'ArticleClassification',
});

const HotArticleTagsList = ref<AT_BlogHotTagsQueryResponse[]>([]);
getBloghottagsquery(10).then((result) => {
	HotArticleTagsList.value = result.data.content;
});

const searchKey = ref('');

const articleTagsLoading = ref(false);
// 文章标签远程检索
const articleTagsList = ref<AT_BlogTagsQueryResponse[]>([]);
function articleTagsRemoteMethod(tagName: string) {
	articleTagsLoading.value = true;
	if (tagName === '') return;
	postBlogtagsquery({
		pageIndex: 1,
		pageSize: 10,
		tagName: tagName,
	})
		.then((result) => {
			articleTagsList.value = result.data.content.arr;
		})
		.finally(() => {
			articleTagsLoading.value = false;
		});
}

const tableData = ref<AT_BlogHotArticleQueryResponse[]>([]);

function tagHandleEvent(item: AT_BlogTagsQueryResponse) {
	tableData.value = [];
	postBlogarticlesquerybyTagId({
		pageIndex: 1,
		pageSize: 30,
		tagId: item.id,
	}).then((result) => {
		if (result.data.status === 1) {
			console.log('===result===', result);
			tableData.value = result.data.content.arr;
		}
	});
}

function handleClick(item: AT_BlogHotArticleQueryResponse) {
	router.push({ name: 'article-details', query: { id: item.id } });
}
</script>

<style scoped lang="scss">
.article-classification-page {
	:deep(.el-input) {
		--el-input-focus-border: red;
	}
	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	.animate-blink {
		animation: blink 1s infinite;
	}
	.page-label__search {
		:deep(.el-select) {
			width: 100%;
			.el-select__tags {
				max-width: inherit !important;
				background-color: inherit;
				box-shadow: inherit;
			}
			.el-input__wrapper {
				background-color: inherit;
				box-shadow: inherit;
			}
		}
		:deep(.el-input) {
			.el-input__wrapper {
				background-color: inherit;
				box-shadow: inherit;
			}
		}
	}
}
</style>
