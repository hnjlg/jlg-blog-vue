<template>
	<div class="user-management-container">
		<el-popover placement="left" :width="300" :visible="visible" :teleported="false" popper-class="sample-management-popover">
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
					<el-select v-model="searchForm.isAdmin" placeholder="Please Select isAdmin" clearable>
						<el-option label="管理员" :value="1" />
						<el-option label="普通用户" :value="0" />
					</el-select>
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
			<el-table-column prop="isAdmin" label="用户类型">
				<template #default="scope">
					<div style="display: flex; align-items: center">
						<span>{{ scope.row.isAdmin ? '管理员' : '普通用户' }}</span>
					</div>
				</template>
			</el-table-column>
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
import { blobAccountDelete, blobAccountQuery, I_RegisterModel } from '@/api/blob';

defineOptions({ name: 'UserManagement' });
const tableData = ref<I_RegisterModel[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const paginationTotal = ref<number>(0);
const visible = ref<boolean>(false);
const searchForm = ref<Partial<I_RegisterModel>>({});

const deleteRow = (_index: number, row: I_RegisterModel) => {
	pageLoading.value = true;
	console.log(row.id, 'row.id');
	blobAccountDelete({ id: row.id }).then(() => {
		pageLoading.value = false;
		ElMessage.success('Remove Success');
		refreshTableData();
	});
};

const refreshTableData = () => {
	pageLoading.value = true;
	blobAccountQuery(currentPage.value, pageSize.value, searchForm.value)
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

	:deep(.sample-management-popover) {
		@include useBlobTheme {
			color: getVar('textColor');
			background-color: getVar('bgColor');
		}
		.el-popper__arrow::before {
			@include useBlobTheme {
				background-color: getVar('bgColor');
			}
		}
	}

	.user-management-table {
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
		:deep(.el-table__body tr.hover-row > td.el-table__cell) {
			@include useBlobTheme {
				background-color: getVar('textColor');
				color: getVar('bgColor');
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
