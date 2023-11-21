<template>
	<div>
		<el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
			<el-tab-pane label="饼状图" name="fPie-chart"
				><div v-show="analysis.length" ref="fPieChartRef" style="width: 800px; height: 500px"></div>
				<el-empty v-show="!analysis.length" :image-size="200"
			/></el-tab-pane>
			<el-tab-pane label="柱状图" name="bar-chart"
				><div v-show="analysis.length" ref="barChartRef" style="width: 800px; height: 500px"></div>
				<el-empty v-show="!analysis.length" :image-size="200"
			/></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';
import { I_DataAnalysisData, blobDataAnalysis } from '@/api/blob';
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';
defineOptions({
	name: 'DataAnalysis',
});

const activeName = ref<'fPie-chart' | 'bar-chart'>('fPie-chart');

const fPieChart = ref<ECharts>();

const fPieChartRef = ref<HTMLDivElement>();

const barChart = ref<ECharts>();

const barChartRef = ref<HTMLDivElement>();

const handleClick = (tab: TabsPaneContext & { paneName: 'fPie-chart' | 'bar-chart' }) => {
	activeName.value = tab.paneName;
};

const fPieChartInit = () => {
	// 基于准备好的dom，初始化echarts实例
	fPieChart.value = echarts.init(fPieChartRef.value);

	// 指定图表的配置项和数据
	const option = {
		legend: {
			left: 'top',
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
		series: [
			{
				name: 'Nightingale Chart',
				type: 'pie',
				radius: [50, 250],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8,
				},
				data: analysis.value.map((item) => ({
					name: item.result,
					value: item.num,
				})),
			},
		],
	};

	// 使用刚指定的配置项和数据显示图表。
	fPieChart.value.setOption(option);
};

const barChartInit = () => {
	// 基于准备好的dom，初始化echarts实例
	barChart.value = echarts.init(barChartRef.value);

	// 指定图表的配置项和数据
	const option = {
		xAxis: {
			type: 'category',
			data: analysis.value.map((item) => item.result),
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: analysis.value.map((item) => item.num),
				type: 'bar',
			},
		],
	};

	// 使用刚指定的配置项和数据显示图表。
	barChart.value.setOption(option);
};

const analysis = ref<I_DataAnalysisData['analysis']>([]);

const refreshData = () => {
	blobDataAnalysis().then((res) => {
		analysis.value = res.data.data.analysis;
		pageLoading.value = false;
		fPieChartInit();
		barChartInit();
	});
};

onMounted(() => {
	refreshData();
});
</script>
<style lang="scss" scoped>
.el-tab-pane {
	display: flex;
	justify-content: center;
}
</style>
