<template>
	<div class="system-monitoring-container">
		<el-button class="refresh-button" @click="refreshHandle">刷新</el-button>
		<div class="progress-container">
			<div>
				<div class="progress-title">CPU</div>
				<el-progress type="dashboard" :percentage="percentage" :color="colors" />
			</div>
			<div>
				<div class="progress-title">内存</div>
				<el-progress type="dashboard" :percentage="percentage2" :color="colors" />
			</div>
			<div>
				<div class="progress-title">磁盘</div>
				<el-progress type="dashboard" :percentage="percentage3" :color="colors" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'SystemMonitoring',
});
const percentage = ref(16);
const percentage2 = ref(30);
const percentage3 = ref(98);

const colors = [
	{ color: '#5cb87a', percentage: 30 },
	{ color: '#e6a23c', percentage: 60 },
	{ color: '#f56c6c', percentage: 90 },
];

const refreshHandle = () => {
	ElMessage.success('刷新成功');
};
</script>

<style lang="scss" scoped>
.system-monitoring-container {
	padding: 50px;
	.refresh-button {
		float: right;
	}

	.progress-container {
		display: flex;
		justify-content: space-around;

		.progress-title {
			padding: 50px 0;
		}
	}
}
</style>
