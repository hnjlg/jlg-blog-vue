<template>
	<div class="sample-management-container">
		<el-table :data="tableData" style="width: 100%" max-height="700">
			<el-table-column prop="id" label="用户id" min-width="120" />
			<el-table-column prop="context" label="样本" min-width="120" />
			<el-table-column prop="result" label="测试结果" min-width="120" />
			<el-table-column prop="createTime" label="时间" min-width="120" />
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
defineOptions({ name: 'SampleManagement' });
const tableData = ref([
	{ id: 1, context: '123131', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123132', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ id: 1, context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
]);
const currentPage = ref<number>(10);
const deleteRow = () => {};
</script>

<style lang="scss" scoped>
.sample-management-container {
	.el-pagination {
		float: right;
	}
}
</style>
