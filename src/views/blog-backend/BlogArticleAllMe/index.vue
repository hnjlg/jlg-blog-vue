<!-- blog后台-我的文章 -->
<template>
	<div class="blog-backend-page blog-backend-my-article-page">
		<div class="table-box">
			<simple-table
				:table-data="tableData"
				:field-list="tableCols"
				:operation-column-width="100"
				max-height="84vh"
				stripe
				border
				size="large"
				@dbclick:row="rowDbClick"
			>
				<template #operation-column="row">
					<el-link type="primary" @click="editlFun(row)">编辑</el-link>
					<el-link type="error" @click="delFun(row)">删除</el-link>
				</template>
			</simple-table>
		</div>
		<div class="pagination-box flex justify-end align-center mt-2">
			<div class="pagination-box-pagi">
				<el-pagination
					v-model:current-page="paginationInfo.pageIndex"
					v-model:page-size="paginationInfo.pageSize"
					:page-sizes="[1, 10, 30, 50, 100]"
					layout=" prev, pager, next,jumper, sizes,total"
					:total="total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
			<div class="pagination-box-refresh my-auto cursor-pointer ml-2">
				<el-icon @click="restInitPage"><Refresh /></el-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';
import { RouteLocationRaw } from 'vue-router';
import SimpleTable from '@/components/simple-table/index.vue';
import useTable from './hooks/useTable';
import router from '@/router';
import { postBlogbackstagearticlequeryforauthor } from '@/apiType/production/result';
import { pageLoading } from '@/views/blog-backend/home/hooks/variable';
import useBlogBackendStore from '@/store/blog-backend';
import tablehook from '@/mixin/useTableHook';

defineOptions({
	name: 'BlogArticleAll',
});

const blogBackendStore = useBlogBackendStore();

/* 分页逻辑 */
const { paginationInfo, total, handleSizeChange, handleCurrentChange, restInitPage } = tablehook(initPage);

const { tableCols } = useTable();

const articleList = ref([
	{
		id: 1,
		title: '马什么梅啊？',
		content: '文章内容。。。。。。。。。。。。。。。。。。。',
		author: '马冬梅',
		time: '2023/11/28',
		reading_quantity: 79,
		fiexd: 'left',
		fiexd1: 'left',
	},
	{ id: 2, title: 'react从入门到衫裤跑路', author: 'admin', time: '2023/11/28', reading_quantity: 79 },
	{ id: 3, title: 'vuerouter从入门到入坟', author: '夏洛', time: '2023/11/28', reading_quantity: 79 },
	{ id: 4, title: 'pinia从入门到入坟', author: '大春', time: '2023/11/28', reading_quantity: 79 },
	{ id: 8, title: 'vite从入门到入坟', author: '国富 陆', time: '2023/11/28', reading_quantity: 79 },
	{
		id: 22,
		title: 'vue从打开到下班vue从打开到下班vue从打开到下班vue从打开到下班vue从打开到下班vue从打开到下班vue从打开到下班vue从打开到下班',
		author: '马冬梅',
		time: '2023/11/28',
	},
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
	{ id: 22, title: 'vue从打开到下班', content: '文章内容。。。。。。。。。。。。。。。。。。。', author: '马冬梅', time: '2023/11/28' },
]);

const tableData = ref([]);
function initPage() {
	pageLoading.value = true;
	paginationInfo.value.author = blogBackendStore.$state.userInfo.id;
	postBlogbackstagearticlequeryforauthor(paginationInfo.value)
		.then((result) => {
			tableData.value = result.data.content.arr;
			total.value = result.data.content.total;
			pageLoading.value = false;
		})
		.catch(() => {
			tableData.value = articleList.value;
			pageLoading.value = false;
		});
}

initPage();

// 编辑
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function editlFun(row: { [K: string]: any }) {
	console.log('======', row);
	jumpto({ name: 'BlogBackendPublish', params: { id: row.row.id } }, true);
}

// 删除
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delFun(row: any) {
	console.log('======', row);
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

// 跳转页面
function jumpto(routerInfo: RouteLocationRaw, isNewTab: boolean = false) {
	if (isNewTab) {
		window.open(router.resolve(routerInfo).href, '_blank');
	} else {
		router.push(routerInfo);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowDbClick(row: any, column: any, event: any) {
	console.log('===dbclick===', row, column, event);
	jumpto({ name: 'BlogBackendPublish', query: { id: row.id, pageType: 'view' } });
}
</script>
<style lang="scss" scoped></style>
