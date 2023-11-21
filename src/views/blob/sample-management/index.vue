<template>
	<div class="sample-management-container">
		<el-popover placement="left" :width="300" :visible="visible">
			<template #reference>
				<el-icon class="sample-management-table-search" @click="visible = !visible"><Search /></el-icon>
			</template>
			<el-form ref="formRef" :model="searchForm" label-width="120px" label-position="top">
				<el-form-item label="用户id" prop="userId">
					<el-input v-model="searchForm.userId" placeholder="Please input userId" clearable />
				</el-form-item>
				<el-form-item label="样本" prop="context">
					<el-input v-model="searchForm.context" placeholder="Please input context" clearable />
				</el-form-item>
				<el-form-item label="测试结果" prop="result">
					<el-input v-model="searchForm.result" placeholder="Please input result" clearable />
				</el-form-item>
				<el-form-item>
					<el-button @click="resetHandle">Reset</el-button>
					<el-button @click="searchHandle">Search</el-button>
				</el-form-item>
			</el-form>
		</el-popover>
		<el-table :data="tableData" class="sample-management-table" max-height="700">
			<el-table-column prop="id" label="用户id" min-width="120" />
			<el-table-column prop="context" label="样本" min-width="120" />
			<el-table-column prop="result" label="测试结果" min-width="120" />
			<el-table-column prop="createTime" label="时间" min-width="120" />
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-button link type="danger" @click="deleteRow(scope.$index, scope.row)"> Remove </el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[10, 30, 50, 100]"
			background
			layout="prev, pager, next, sizes, jumper, total"
			:total="paginationTotal"
			@size-change="refreshTableData"
			@current-change="refreshTableData"
			@prev-click="refreshTableData"
			@next-click="refreshTableData"
		/>
	</div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { blobModelQuery, I_ModelModel, blobModelDelete } from '@/api/blob';
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';

defineOptions({ name: 'SampleManagement' });
const tableData = ref<I_ModelModel[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const paginationTotal = ref<number>(0);
const visible = ref<boolean>(false);
const searchForm = ref<Partial<I_ModelModel>>({});

const deleteRow = (_index: number, row: I_ModelModel) => {
	pageLoading.value = true;
	blobModelDelete(row).then(() => {
		pageLoading.value = false;
		ElMessage.success('Remove Success');
		refreshTableData();
	});
};

const refreshTableData = () => {
	pageLoading.value = true;
	blobModelQuery(currentPage.value, pageSize.value, searchForm.value)
		.then((res) => {
			tableData.value = res.data.data.records;
			paginationTotal.value = res.data.data.records.length;
			ElMessage.success('Refresh Success');
			pageLoading.value = false;
		})
		.catch(() => {
			pageLoading.value = false;
		});
};

const resetHandle = () => {
	searchForm.value = {};
	refreshTableData();
};

const searchHandle = () => {
	visible.value = false;
	refreshTableData();
};

onMounted(() => {
	refreshTableData();
});
</script>

<style lang="scss" scoped>
.sample-management-container {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	height: 100%;

	.sample-management-table-search {
		cursor: pointer;
	}

	.sample-management-table {
		flex: 1;
		@include useBlobTheme {
			color: getVar('textColor');
			background-color: getVar('bgColor');
		}

		:deep(thead) {
			@include useBlobTheme {
				color: getVar('textColor');
			}
		}

		:deep(th.el-table__cell) {
			@include useBlobTheme {
				background-color: getVar('bgColor');
			}
		}

		:deep(tr) {
			@include useBlobTheme {
				background-color: getVar('bgColor');
			}
		}
	}

	:deep(.el-pagination__total) {
		@include useBlobTheme {
			color: getVar('textColor');
		}
	}

	:deep(.el-pagination__jump) {
		@include useBlobTheme {
			color: getVar('textColor');
		}
	}
}
</style>
