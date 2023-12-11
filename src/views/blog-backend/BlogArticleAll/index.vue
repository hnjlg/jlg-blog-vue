<!-- blog后台-全部文章 -->
<template>
	<div
		v-for="(item, index) of articleList"
		:key="index"
		class="pane-box py-3 mt-2 border-b-[1px] hover:bg-slate-100 flex"
		@mouseenter="mouseIn(item, index)"
		@mouseleave="mouseOut(item, index)"
	>
		<div class="box-item-left px-6 flex-1">
			<div class="pane-box-item--title">
				<span class="cursor-pointer" @click="jumpto({ name: 'article-details', query: { id: 11111 } }, true)">{{ item.title }}</span>
			</div>
			<div class="pane-box-item--description min-h-[50px] text-sm opacity-75">
				<span class="cursor-pointer">超级详细的安卓学习笔记</span>
			</div>
			<div class="pane-box-item--other">
				<el-tooltip effect="light" content="nice" placement="top">
					<el-icon size="16" class="cursor-pointer mr-3"><Star /></el-icon>
				</el-tooltip>
				<span class="text-sm">20</span>
				<el-tooltip effect="light" content="author" placement="top">
					<el-icon size="16" class="cursor-pointer mx-3"><User /></el-icon>
				</el-tooltip>
				<span class="text-sm cursor-pointer">{{ item.author }}</span>
				<el-tooltip effect="light" content="time" placement="top">
					<el-icon size="16" class="cursor-pointer ml-3"><Watch /></el-icon>
				</el-tooltip>
				<span class="text-sm">{{ item.time }}</span>
			</div>
		</div>
		<div v-show="item.isHover" class="box-item-right m-auto">
			<el-tooltip effect="light" content="Edit this article" placement="top">
				<el-icon size="16" class="cursor-pointer mr-2"><Edit /></el-icon>
			</el-tooltip>
			<el-tooltip effect="light" content="Delete this article" placement="top">
				<el-icon size="16" class="cursor-pointer mr-2"><Delete @click="delFun(item, index)" /></el-icon>
			</el-tooltip>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Star, User, Watch, Edit, Delete } from '@element-plus/icons-vue';
import { RouteLocationRaw, useRouter } from 'vue-router';

defineOptions({
	name: 'BlogArticleAll',
});

const router = useRouter();

// 跳转页面
function jumpto(routerInfo: RouteLocationRaw, isNewTab: boolean = false) {
	if (isNewTab) {
		window.open(router.resolve(routerInfo).href, '_blank');
	} else {
		router.push(routerInfo);
	}
}

const articleList = ref([
	{ id: 1, title: '马什么梅啊？', author: '马冬梅', time: '2023/11/28', isHover: false },
	{ id: 1, title: 'react从入门到衫裤跑路', author: 'admin', time: '2023/11/28', isHover: false },
	{ id: 1, title: 'vuerouter从入门到入坟', author: '夏洛', time: '2023/11/28', isHover: false },
	{ id: 1, title: 'pinia从入门到入坟', author: '大春', time: '2023/11/28', isHover: false },
	{ id: 1, title: 'vite从入门到入坟', author: '国富 陆', time: '2023/11/28', isHover: false },
	{ id: 1, title: 'vue从打开到下班', author: '马冬梅', time: '2023/11/28', isHover: false },
]);

function mouseIn(articleListItem: { isHover: boolean }, articleListItemIndex: number) {
	articleListItem.isHover = true;
	console.log('======', articleListItem, articleListItemIndex);
}
function mouseOut(articleListItem: { isHover: boolean }, articleListItemIndex: number) {
	articleListItem.isHover = false;
	console.log('======', articleListItem, articleListItemIndex);
}

// 删除
function delFun(item: unknown, index: number) {
	console.log('======', item, index);

	ElMessageBox.confirm('Are you sure to delete this article?', 'Warning', {
		confirmButtonText: 'I am true!',
		cancelButtonText: 'NO,I will think about it again',
		type: 'warning',
	})
		.then(() => {
			ElMessage({
				type: 'success',
				message: 'Delete completed',
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: 'Delete canceled',
			});
		});
}
</script>
<style lang="scss" scoped></style>
