<template>
	<div class="article-classification-page px-3">
		<div
			class="page-label__search flex items-center h-10 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-stone-500 shadow-2xl shadow-slate-500/50 cursor-pointer select-none transition"
		>
			<!-- <el-icon><Search /></el-icon><span class="pl-2">搜索</span><span class="animate-blink">|</span> -->
			<el-icon @click="searchFun"><Search /></el-icon>
			<!-- <el-input v-model.trim="searchKey" clearable class="caret-slate-500" @keyup.enter="searchFun"> </el-input> -->
			<el-select
				v-model="searchKey"
				filterable
				remote
				reserve-keyword
				placeholder="Please enter a keyword"
				:remote-method="articleTagsRemoteMethod"
				:loading="articleTagsLoading"
				@keyup.enter="searchFun"
			>
				<el-option v-for="item in articleTagsList" :key="item.id" :label="item.tag_name" :value="item.id" />
			</el-select>
		</div>

		<div class="page-label__hot min-h-[100px] my-8">
			<div class="text-lg font-bold">热门标签</div>
			<div class="flex flex-wrap">
				<span
					v-for="(item, index) in HotArticleTagsList"
					:key="index"
					class="text-base text-stone-500 px-4 m-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer select-none"
				>
					{{ item.tag_name }}
				</span>
			</div>
		</div>
		<div v-show="SearchArticleTagsList.length !== 0" class="page-label__all">
			<div class="text-lg font-bold">搜索结果</div>
			<div class="flex flex-wrap">
				<span
					v-for="(item, index) in SearchArticleTagsList"
					:key="index"
					class="text-base text-stone-500 px-4 m-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer select-none"
				>
					{{ item.tag_name }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getBloghottagsquery, postBlogtagsquery } from '@/apiType/production/result';
import { Search } from '@element-plus/icons-vue';
defineOptions({
	name: 'ArticleClassification',
});

const HotArticleTagsList = ref<any[]>([]);
getBloghottagsquery(5).then((result) => {
	HotArticleTagsList.value = result.data.content;
});

const searchKey = ref('');

const SearchArticleTagsList = ref<any[]>([]);
function searchFun() {
	return new Promise<void>((resolve) => {
		postBlogtagsquery({
			pageIndex: 1,
			pageSize: 10,
			tagName: searchKey.value,
		})
			.then((result) => {
				SearchArticleTagsList.value = result.data.content.arr;
				ElMessage.success('搜索成功');
			})
			.finally(() => {
				articleTagsLoading.value = false;
			});
		resolve();
	});
}

const articleTagsLoading = ref(false);
// 文章标签远程检索
const articleTagsList = ref([]);
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
