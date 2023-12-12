<!-- blog后台-全部文章 -->
<template>
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
</template>

<script setup lang="ts">
// import { Star, User, Watch, Edit, Delete } from '@element-plus/icons-vue';
// import { RouteLocationRaw, useRouter } from 'vue-router';
import SimpleTable from '@/components/simple-table/index.vue';
import useTable from './hooks/useTable';
import router from '@/router';

defineOptions({
	name: 'BlogArticleAll',
});

// const router = useRouter();

// 跳转页面
// function jumpto(routerInfo: RouteLocationRaw, isNewTab: boolean = false) {
// 	if (isNewTab) {
// 		window.open(router.resolve(routerInfo).href, '_blank');
// 	} else {
// 		router.push(routerInfo);
// 	}
// }

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
	// postBlogbackstagearticleallquery({
	// 	pageIndex: 1,
	// 	pageSize: 10,
	// })
	// 	.then((result) => {
	// 		tableData.value = result.data.content;
	// 	})
	// 	.catch(() => {
	// 		tableData.value = articleList.value;
	// 	});
	tableData.value = articleList.value;
}

initPage();

// 编辑
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function editlFun(row: { [K: string]: any }) {
	console.log('======', row);
	router.push({ name: 'BlogBackendPublish', params: { id: row.row.id } });
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowDbClick(row: any, column: any, event: any) {
	console.log('===dbclick===', row, column, event);
}
</script>
<style lang="scss" scoped></style>
