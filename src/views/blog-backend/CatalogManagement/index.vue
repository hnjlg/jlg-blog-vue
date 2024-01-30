<!-- 目录管理 - 所有目录-->
<template>
	<div class="table-box">
		<div class="header">
			<!-- <el-input v-model="tagName" placeholder="Please input tagName" clearable class="input-with-select" @click="initPage" @keyup.enter="initPage">
				<template #prepend>
					<el-button :icon="Search" @click="initPage" />
				</template>
			</el-input> -->
			<!-- <el-button type="primary" class="button" @click="addTag">新增</el-button> -->
		</div>

		<el-table
			:data="tableData"
			style="width: 100%"
			row-key="id"
			border
			lazy
			:load="load"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column prop="id" label="id" />
			<el-table-column prop="article_tree_name" label="article_tree_name" />
			<el-table-column prop="parent_article_tree_id" label="parent_article_tree_id" />
			<el-table-column label="操作">
				<template #default="scope">
					<!-- <el-link type="primary" style="margin-left: 20px" @click="editlFun(scope.row)">编辑</el-link> -->
					<el-link type="error" style="margin-left: 20px" @click="delFun(scope.row)">删除</el-link>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import {
	postBlogarticletreeallquery,
	AT_ArticleTreeTable,
	postArticletreebyIddelete,
	postArticletreearticletreeidquery,
} from '@/apiType/production/result';
import { pageLoading } from '@/views/blog-backend/home/hooks/variable';
// import drawer from '@/mixin/drawer';

defineOptions({
	name: 'CatalogManagement',
});

const load = (row: AT_ArticleTreeTable, treeNode: unknown, resolve: (date) => void) => {
	console.log(row, treeNode, resolve);
	postArticletreearticletreeidquery({ articleTreeId: row.id }).then((result) => {
		resolve(result.data.content.map((item) => (item = { ...item, hasChildren: true })) ?? []);
	});
};
const tableData = ref<AT_ArticleTreeTable[]>([]);
// 初始请求表格内容
function initPage() {
	pageLoading.value = true;
	postBlogarticletreeallquery()
		.then((result) => {
			tableData.value = result.data.content
				.filter((item) => item.parent_article_tree_id === null)
				.map((item) => (item = { ...item, hasChildren: true }));
			pageLoading.value = false;
		})
		.catch(() => {
			pageLoading.value = false;
		});
}

initPage();

function delFun(row: AT_ArticleTreeTable) {
	ElMessageBox.confirm('Are you sure to delete this Tag?', 'Warning', {
		confirmButtonText: 'I am true!',
		cancelButtonText: 'NO,I will think about it again',
		type: 'warning',
		closeOnClickModal: false,
	})
		.then(() => {
			postArticletreebyIddelete({ article_tree_id: row.id }).then((result) => {
				if (result.data.status === 1) {
					ElMessage.success('Delete completed');
					initPage();
				}
			});
		})
		.catch(() => {
			ElMessage.info('Delete canceled');
			pageLoading.value = false;
		});
}

// 新增
// const addTag = () => {
// 	drawer('AddTag', '新增标签', {}, 'add').then(() => {
// 		initPage();
// 	});
// };
// 编辑
// const editlFun = (row: AT_ArticleTreeTable) => {
// 	drawer('AddTag', '编辑标签', { row: row }, 'edit').then(() => {
// 		initPage();
// 	});
// };
</script>
<style lang="scss" scoped>
.header {
	margin-bottom: 20px;
	.input-with-select {
		width: 300px;
		margin-right: 20px;
	}
}
</style>
