<!-- 标签管理 - 所有标签-->
<template>
	<div class="table-box">
		<div class="header">
			<el-input v-model="tagName" placeholder="Please input tagName" clearable class="input-with-select" @keyup.enter="initPage">
				<template #prepend>
					<el-button :icon="Search" @click="initPage" />
				</template>
			</el-input>
			<el-button type="primary" class="button" @click="addTag">新增</el-button>
		</div>

		<simple-table :table-data="tableData" :field-list="tableCols" :operation-column-width="120" max-height="84vh" stripe border size="large">
			<template #operation-column="{ row: { row } }">
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
</template>

<script setup lang="ts">
import { Refresh, Search } from '@element-plus/icons-vue';
import SimpleTable from '@/components/simple-table/index.vue';
import DeletePromptList from '@/components/business/delete-prompt-list/index.vue';
import useTable from './hooks/useTable';
import {
	AT_ArticleTagsTagsQueryResponse,
	postArticletagstagsquery,
	postArticletagstagsdelete,
	getArticletagstagsqueryArticleSingleByTagId,
	postBlogbackstagearticlebatchUpdate,
} from '@/apiType/production/result';
import { pageLoading } from '@/views/blog-backend/home/hooks/variable';
import tableHook from '@/mixin/useTableHook';
import drawer from '@/mixin/drawer';
import './messagebox.scss';

defineOptions({
	name: 'TagManagement',
});

/* 分页逻辑 */
const { paginationInfo, total, handleSizeChange, handleCurrentChange, restInitPage } = tableHook(initPage);

const { tableCols } = useTable();

const tagName = ref('');
const tableData = ref<AT_ArticleTagsTagsQueryResponse[]>([]);
// 初始请求表格内容
function initPage() {
	pageLoading.value = true;
	postArticletagstagsquery({ ...paginationInfo.value, tagName: tagName.value.trim() })
		.then((result) => {
			tableData.value = result.data.content.arr;
			total.value = result.data.content.total;
			pageLoading.value = false;
		})
		.catch(() => {
			pageLoading.value = false;
		});
}

initPage();

function delAjax(row: AT_ArticleTagsTagsQueryResponse) {
	return postArticletagstagsdelete({ id: Number(row.id) }).then((result) => {
		if (result.data.status === 1) {
			ElMessage.success('Delete completed');
			restInitPage();
		}
	});
}

// 删除
function delFun(row: AT_ArticleTagsTagsQueryResponse) {
	ElMessageBox.confirm('Are you sure to delete this Tag?', 'Warning', {
		confirmButtonText: 'I am true!',
		cancelButtonText: 'NO,I will think about it again',
		type: 'warning',
		closeOnClickModal: false,
	})
		.then(() => {
			getArticletagstagsqueryArticleSingleByTagId(Number(row.id)).then(async (result) => {
				const tableData = result.data.content;
				if (tableData.length === 0) {
					pageLoading.value = true;
					await delAjax(row);
					pageLoading.value = false;
				} else {
					let newArticleTagId: number | undefined;
					ElMessageBox({
						title: '标签所属文章',
						closeOnClickModal: false,
						customClass: 'delete-prompt-list',
						message: () =>
							h(DeletePromptList, {
								tableData: tableData,
								rowData: row,
								valueReturn: (val: number) => {
									newArticleTagId = val;
								},
							}),
					}).then(() => {
						if (newArticleTagId !== undefined) {
							pageLoading.value = true;
							Promise.all([
								postBlogbackstagearticlebatchUpdate({ article_ids: tableData.map((item) => item.id), tag_id: newArticleTagId }),
								delAjax(row),
							]).then(() => {
								pageLoading.value = false;
								restInitPage();
							});
						}
					});
				}
			});
		})
		.catch(() => {
			ElMessage.info('Delete canceled');
			pageLoading.value = false;
		});
}
// 新增
const addTag = () => {
	drawer({
		drawerKey: 'AddTag',
		drawerTitle: '新增标签',
		option: {},
		drawerType: 'add',
	}).then(() => {
		restInitPage();
	});
};
// 编辑
const editlFun = (row: AT_ArticleTagsTagsQueryResponse) => {
	drawer({
		drawerKey: 'AddTag',
		drawerTitle: '编辑标签',
		option: { row: row },
		drawerType: 'edit',
	}).then(() => {
		restInitPage();
	});
};
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
