<template>
	<div>
		<el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
			<el-tab-pane label="饼状图" name="fPie-chart"><div ref="fPieChartRef" style="width: 600px; height: 500px"></div></el-tab-pane>
			<el-tab-pane label="柱状图" name="bar-chart"><div ref="barChartRef" style="width: 600px; height: 500px"></div></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import * as echarts from 'echarts';
defineOptions({
	name: 'DataAnalysis',
});

const activeName = ref('fPie-chart');

const fPieChart = ref<echarts.EChartsOption>();

const fPieChartRef = ref<HTMLDivElement>();

const barChart = ref<echarts.EChartsOption>();

const barChartRef = ref<HTMLDivElement>();

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
	activeName.value = tab.paneName;
};

const fPieChartInit = () => {
	// 基于准备好的dom，初始化echarts实例
	fPieChart.value = echarts.init(fPieChartRef.value);

	// 指定图表的配置项和数据
	const option = {
		legend: {
			top: 'bottom',
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
				data: [
					{ value: 40, name: 'rose 1' },
					{ value: 38, name: 'rose 2' },
					{ value: 32, name: 'rose 3' },
					{ value: 30, name: 'rose 4' },
					{ value: 28, name: 'rose 5' },
					{ value: 26, name: 'rose 6' },
					{ value: 22, name: 'rose 7' },
					{ value: 18, name: 'rose 8' },
				],
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
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: 'bar',
			},
		],
	};

	// 使用刚指定的配置项和数据显示图表。
	barChart.value.setOption(option);
};

onMounted(() => {
	fPieChartInit();
	barChartInit();
});
</script>
<style lang="scss" scoped>
.el-tab-pane {
	display: flex;
	justify-content: center;
}
</style>
