<template>
	<div class="article-classification-page px-3">
		<div
			class="page-search flex items-center h-10 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-stone-500 shadow-2xl shadow-slate-500/50 cursor-pointer select-none transition"
		>
			<el-icon><Search /></el-icon><span class="pl-2">搜索</span><span class="animate-blink">|</span>
		</div>
		<div class="page-content py-4">
			<el-tabs v-model="activeName">
				<el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.value">
					<div v-infinite-scroll="load" infinite-scroll-delay="800" infinite-scroll-distance="30" infinite-scroll-immediate="true">
						<div v-for="iitem in count" :key="iitem" class="pane-box py-3 mt-2 border-b-[1px] hover:bg-slate-100 flex">
							<div class="pane-box-item-left min-w-[100px] max-w-150px cursor-pointer bg-slate-100">背景图(先假装有图)</div>
							<div class="pane-box-item-right px-6 flex-1">
								<div class="pane-box-item--title">
									<span class="cursor-pointer" @click="gotoArticleDetail">2023最新版安卓逆向教程——第一天：Android Studio的安装与配置</span>
								</div>
								<div class="pane-box-item--description min-h-[50px] text-sm opacity-75">
									<span class="cursor-pointer">超级详细的安卓学习笔记</span>
								</div>
								<div class="pane-box-item--other">
									<el-tooltip effect="light" content="讲得不错！赞" placement="top">
										<el-icon size="16" class="cursor-pointer mr-2"><Star /></el-icon>
									</el-tooltip>
									<span class="text-sm">20</span>
									<el-tooltip effect="light" content="作者" placement="top">
										<el-icon size="16" class="cursor-pointer mx-2"><User /></el-icon>
									</el-tooltip>
									<span class="text-sm cursor-pointer">马冬梅</span>
									<el-tooltip effect="light" content="发表时间" placement="top">
										<el-icon size="16" class="cursor-pointer ml-2"><Watch /></el-icon>
									</el-tooltip>
									<span class="text-sm">2023/11/28</span>
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { Star, User, Watch } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
defineOptions({
	name: 'FindArticle',
});

const activeName = ref(1);
const tabs = ref([
	{ label: '丰恺思项目', value: 1 },
	{ label: 'OA项目', value: 2 },
	{ label: '大平台项目', value: 3 },
	{ label: '金六谷组件库', value: 4 },
]);

const router = useRouter();

// 跳转页面
function gotoArticleDetail() {
	router.push({ name: 'article-details', query: { id: 11111 } });
}

const count = ref(3);
const load = () => {
	count.value += 2;
};
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
	// 	--el-color-primary: getVar('textColor');
	// }
}
</style>
