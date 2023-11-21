<template>
	<div class="system-monitoring-container">
		<el-button class="refresh-button" :loading="refreshLoading" @click="refreshHandle"
			><el-icon><RefreshRight /></el-icon>Refresh</el-button
		>
		<div class="progress-container">
			<div>
				<div class="progress-title">CPU</div>
				<el-progress type="dashboard" :percentage="systemCpuLoad" :color="colors" />
			</div>
			<div>
				<div class="progress-title">内存</div>
				<el-progress type="dashboard" :percentage="memoryUsage" :color="colors" />
			</div>
			<div>
				<div class="progress-title">磁盘</div>
				<el-progress type="dashboard" :percentage="availableProcessors" :color="colors" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue';
import { blobGetCsInfo } from '@/api/blob';
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';

defineOptions({
	name: 'SystemMonitoring',
});
const availableProcessors = ref(16);
const memoryUsage = ref(30);
const systemCpuLoad = ref(98);
const refreshLoading = ref(false);

const colors = [
	{ color: '#5cb87a', percentage: 30 },
	{ color: '#e6a23c', percentage: 60 },
	{ color: '#f56c6c', percentage: 90 },
];

const refreshHandle = () => {
	refreshLoading.value = true;
	getTableData(() => {
		refreshLoading.value = false;
	});
};

const getTableData = (callback: () => void) => {
	blobGetCsInfo()
		.then((res) => {
			ElMessage.success('Refresh Success');
			systemCpuLoad.value = Math.round(res.data.data.systemCpuLoad * 100);
			availableProcessors.value = Math.round(res.data.data.availableProcessors * 100);
			memoryUsage.value = Math.round(res.data.data.memoryUsage * 100);
			callback();
		})
		.catch(() => {
			callback();
		});
};

onMounted(() => {
	getTableData(() => {
		pageLoading.value = false;
	});
});
</script>

<style lang="scss" scoped>
.system-monitoring-container {
	padding: 50px;
	.refresh-button {
		float: right;
		@include useBlobTheme {
			color: getVar('bgColor');
		}
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
