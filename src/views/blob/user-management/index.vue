<template>
	<div class="user-management-container">
		<el-table :data="tableData" style="width: 100%" max-height="700">
			<el-table-column fixed prop="id" label="用户id" min-width="120" />
			<el-table-column prop="userName" label="用户名" min-width="120" />
			<el-table-column prop="phone" label="电话" min-width="120" />
			<el-table-column prop="email" label="邮箱" min-width="120" />
			<el-table-column prop="age" label="年龄" min-width="120" />
			<el-table-column prop="address" label="地址" min-width="120" />
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-button link type="danger" @click="deleteRow(scope)"> Remove </el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :total="1000" />
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserManagement' });
const tableData = ref([
	{ userName: '123131', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123132', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ userName: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
]);
const currentPage = ref<number>(10);
const deleteRow = () => {};
</script>

<style lang="scss" scoped>
.user-management-container {
	.el-pagination {
		float: right;
	}
}
</style>
