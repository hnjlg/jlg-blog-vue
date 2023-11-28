<template>
	<div class="article-classification-page px-3">
		<div
			class="page-label__search flex items-center h-10 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-stone-500 shadow-2xl shadow-slate-500/50 cursor-pointer select-none transition"
		>
			<!-- <el-icon><Search /></el-icon><span class="pl-2">搜索</span><span class="animate-blink">|</span> -->
			<el-icon @click="searchFun"><Search /></el-icon
			><el-input v-model.trim="searchKey" clearable class="caret-slate-500" @keyup.enter="searchFun"></el-input>
		</div>
		<div class="page-label__hot min-h-[100px] my-8">
			<div class="text-lg font-bold">热门标签</div>
			<div class="flex flex-wrap">
				<span
					v-for="item in 4"
					:key="item"
					class="text-base text-stone-500 px-4 m-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer select-none"
					>前端{{ item }}</span
				>
			</div>
		</div>
		<div class="page-label__all">
			<div class="text-lg font-bold">所有标签</div>
			<div class="flex flex-wrap">
				<span
					v-for="item in 24"
					:key="item"
					class="text-base text-stone-500 px-4 m-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer select-none"
					>示例&nbsp;{{ item }}</span
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
defineOptions({
	name: 'ArticleClassification',
});

const searchKey = ref('');

// 搜索
function searchFun() {
	return new Promise<void>((resolve) => {
		console.log('===搜索关键字：===', searchKey.value);
		ElMessage.success('搜索成功');
		resolve();
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
		:deep(.el-input) {
			.el-input__wrapper {
				background-color: inherit;
				box-shadow: inherit;
			}
		}
	}
}
</style>
