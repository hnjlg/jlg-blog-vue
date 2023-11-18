<template>
	<div class="log-management-container">
		<el-table :data="tableData" style="width: 100%" max-height="700">
			<el-table-column fixed prop="context" label="用户id" min-width="300" />
			<el-table-column prop="result" label="用户操作" min-width="120" />
			<el-table-column prop="createTime" label="操作时间" min-width="120" />
		</el-table>
		<el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :total="1000" />
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LogManagement' });
const tableData = ref([
	{ context: '123131', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123132', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '12313', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: '123133333', result: '注册', createTime: '2023-11-18T08:22:35.000+00:00' },
]);

const currentPage = ref<number>(10);
</script>

<style lang="scss" scoped>
.log-management-container {
	.el-pagination {
		float: right;
	}
}
</style>
