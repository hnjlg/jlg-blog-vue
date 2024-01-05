<!-- 搜索文章页面 -->
<template>
	<div class="article-classification-page px-3">
		<!-- <div
			class="page-search flex items-center h-10 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-stone-500 shadow-2xl shadow-slate-500/50 cursor-pointer select-none transition"
		>
			<el-icon><Search /></el-icon><span class="pl-2">搜索</span><span class="animate-blink">|</span>
		</div> -->
		<div
			class="page-label__search flex items-center h-10 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-stone-500 shadow-2xl shadow-slate-500/50 cursor-pointer select-none transition"
		>
			<el-icon><Search /></el-icon>
			<el-input v-model.trim="searchKey" clearable class="caret-slate-500" @keyup.enter="searchFun"> </el-input>
		</div>
		<div class="page-content py-4">
			<transition name="el-zoom-in-top">
				<div v-show="tableData.length !== 0">
					<div class="border-l-8 my-10px px-2">
						<span class="text-lg font-bold">搜索结果：</span>
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
	</div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { router } from '@/router';
import ArticleList from '@/components/article-list/index.vue';
import { postBlogarticleliketitlequery, type AT_BlogArticleLikeTitleResponse } from '@/apiType/production/result';
defineOptions({
	name: 'FindArticle',
});

// const router = useRouter();

const searchKey = ref('');

// 跳转页面
function handleClick(item: AT_BlogArticleLikeTitleResponse) {
	router.push({ name: 'article-details', query: { id: item.id } });
}

const tableData = ref<AT_BlogArticleLikeTitleResponse[]>([]);

function searchFun() {
	if (searchKey.value === '') return;
	postBlogarticleliketitlequery({
		pageIndex: 1,
		pageSize: 10,
		title: searchKey.value,
	}).then((result) => {
		if (result.data.status === 1) {
			tableData.value = result.data.content.arr;
		}
	});
}
</script>

<style scoped lang="scss">
.article-classification-page {
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
	// @include useBlobTheme {
	// 	--el-color-primary: getBlobVar('textColor');
	// }

	.pane-box:hover {
		@include useBlobTheme {
			background-color: getBlobVar('textColor');
			color: getBlobVar('bgColor');
		}
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
