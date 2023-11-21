<template>
	<div class="user-management-container">
		<el-popover placement="left" :width="300" :visible="visible">
			<template #reference>
				<el-icon class="user-management-table-search" @click="visible = !visible"><Search /></el-icon>
			</template>
			<el-form ref="formRef" :model="searchForm" label-width="120px" label-position="top">
				<el-form-item label="用户id" prop="id">
					<el-input v-model="searchForm.id" placeholder="Please input id" clearable />
				</el-form-item>
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="searchForm.userName" placeholder="Please input userName" clearable />
				</el-form-item>
				<el-form-item label="用户类型" prop="isAdmin">
					<el-input v-model="searchForm.isAdmin" placeholder="Please input isAdmin" clearable />
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="searchForm.phone" placeholder="Please input phone" clearable />
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="searchForm.email" placeholder="Please input email" clearable />
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model="searchForm.age" placeholder="Please input age" clearable />
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="searchForm.address" placeholder="Please input address" clearable />
				</el-form-item>
				<el-form-item>
					<el-button @click="resetHandle">Reset</el-button>
					<el-button @click="searchHandle">Search</el-button>
				</el-form-item>
			</el-form>
		</el-popover>
		<el-table :data="tableData" style="width: 100%" max-height="700" class="user-management-table">
			<el-table-column fixed prop="id" label="用户id" min-width="120" />
			<el-table-column prop="userName" label="用户名" min-width="120" />
			<el-table-column prop="isAdmin" label="用户类型"></el-table-column>
			<el-table-column prop="phone" label="电话" min-width="120" />
			<el-table-column prop="email" label="邮箱" min-width="120" />
			<el-table-column prop="age" label="年龄" min-width="120" />
			<el-table-column prop="address" label="地址" min-width="120" />
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-button link :disabled="scope.row.isAdmin" type="danger" @click="deleteRow(scope.$index, scope.row)"> Remove </el-button>
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
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';
import { blobAccountQuery, I_RegisterModel, blobAccountDelete } from '@/api/blob';

defineOptions({ name: 'UserManagement' });
const tableData = ref<I_RegisterModel[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const paginationTotal = ref<number>(0);
const visible = ref<boolean>(false);
const searchForm = ref<Partial<I_RegisterModel>>({});

const deleteRow = (_index: number, row: I_RegisterModel) => {
	pageLoading.value = true;
	blobAccountDelete(row).then(() => {
		pageLoading.value = false;
		ElMessage.success('Remove Success');
		refreshTableData();
	});
};

const refreshTableData = () => {
	pageLoading.value = true;
	blobAccountQuery(currentPage.value, pageSize.value)
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
.user-management-container {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	height: 100%;

	.user-management-table-search {
		cursor: pointer;
	}

	.user-management-table {
		flex: 1;
	}
}
</style>
