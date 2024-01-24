<!-- 用户管理 - 所有用户-->
<template>
	<div class="table-box">
		<simple-table :table-data="tableData" :field-list="tableCols" :operation-column-width="120" max-height="84vh" stripe border size="large">
			<template #operation-column="row">
				<el-link type="error" @click="delFun(row)">删除</el-link>
			</template>
			<template #password-slot>
				******
				<!-- {{ CryptoJS.SHA256.decrypt(row.pass_word) }}	 -->
				<!-- {{ CryptoJS.AES.decrypt(row.pass_word, 'blog').toString(CryptoJS.enc.Utf8) }} -->
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
import { Refresh } from '@element-plus/icons-vue';
import SimpleTable from '@/components/simple-table/index.vue';
import useTable from './hooks/useTable';
import { postUserallquery, AT_UserQueryAllResponse, postUserdelete } from '@/apiType/production/result';
import { pageLoading } from '@/views/blog-backend/home/hooks/variable';
import tablehook from '@/mixin/useTableHook';
// import CryptoJS from 'crypto-js';

defineOptions({
	name: 'UserManagement',
});

/* 分页逻辑 */
const { paginationInfo, total, handleSizeChange, handleCurrentChange, restInitPage } = tablehook(initPage);

const { tableCols } = useTable();

const tableData = ref<AT_UserQueryAllResponse[]>([]);
function initPage() {
	pageLoading.value = true;
	postUserallquery(paginationInfo.value)
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

// 删除
function delFun(row: any) {
	ElMessageBox.confirm('Are you sure to delete this user?', 'Warning', {
		confirmButtonText: 'I am true!',
		cancelButtonText: 'NO,I will think about it again',
		type: 'warning',
	})
		.then(() => {
			postUserdelete({ author: Number(row.row.row.id) }).then((result) => {
				if (result.data.status === 1) {
					ElMessage.success('Delete completed');
					restInitPage();
				}
			});
		})
		.catch(() => {
			ElMessage.info('Delete canceled');
		});
}
</script>
<style lang="scss" scoped></style>
