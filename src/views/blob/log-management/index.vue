<template>
	<div class="log-management-container">
		<el-popover placement="left" :width="300" :visible="visible">
			<template #reference>
				<el-icon class="log-management-table-search" @click="visible = !visible"><Search /></el-icon>
			</template>
			<el-form ref="formRef" :model="searchForm" label-width="120px" label-position="top">
				<el-form-item label="用户id" prop="userId">
					<el-input v-model="searchForm.userId" placeholder="Please input userId" clearable />
				</el-form-item>
				<el-form-item label="用户操作" prop="operate">
					<el-input v-model="searchForm.operate" placeholder="Please input operate" clearable />
				</el-form-item>
				<el-form-item>
					<el-button @click="resetHandle">Reset</el-button>
					<el-button @click="searchHandle">Search</el-button>
				</el-form-item>
			</el-form>
		</el-popover>
		<el-table :data="tableData" style="width: 100%" max-height="700" class="log-management-table">
			<el-table-column fixed prop="userId" label="用户id" min-width="120" />
			<el-table-column prop="operate" label="用户操作" min-width="300" />
			<el-table-column prop="createTime" label="操作时间" min-width="120" />
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
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';
import { I_LogModel, blobLogQuery } from '@/api/blob';

defineOptions({ name: 'LogManagement' });
const tableData = ref<I_LogModel[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const paginationTotal = ref<number>(0);
const visible = ref<boolean>(false);
const searchForm = ref<Partial<I_LogModel>>({});

const refreshTableData = () => {
	pageLoading.value = true;
	blobLogQuery(currentPage.value, pageSize.value)
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
.log-management-container {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	height: 100%;

	.log-management-table-search {
		cursor: pointer;
	}

	.log-management-table {
		flex: 1;
	}
}
</style>
