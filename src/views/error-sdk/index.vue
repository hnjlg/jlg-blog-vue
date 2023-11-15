<template>
	<div class="page-box border-2 border-solid border-black my-1 mx-2 p-1 rounded">
		<!-- swipper部分 -->
		<div class="container flex justify-end bg-gray-light h-96">
			<div class="flex-1 border-2 border-solid border-black">
				<el-carousel autoplay class="h-full">
					<el-carousel-item
						v-for="(item, index) in swipperList"
						:key="index"
						:style="{ backgroundImage: 'url(' + item + ')' }"
						class="bg-cover bg-no-repeat bg-center"
					>
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="w-1/3 border-2 border-l-0 border-solid border-black bg-yellow">多看一眼就会爆炸</div>
		</div>
		<!-- 数据列表 -->
		<div class="error-container container border-2 border-solid border-black my-1 p-1 rounded">
			<SimpleTable :table-data="tableData" title="数据列表" stripe size="large" @dbclick:row="rowDbClick"></SimpleTable>
		</div>
	</div>
</template>

<script setup lang="ts">
import SimpleTable from '@/components/simple-table/index.vue';
import { useRouter } from 'vue-router';

defineOptions({
	name: 'ErrorSdk',
});

const swipperList = ref<string[]>([
	'https://n.sinaimg.cn/sinacn10119/298/w662h436/20190916/4440-ietnfsp6465604.jpg',
	'https://p8.itc.cn/images01/20220815/12ebcb38da824abe97fa836463eba684.bmp',
]);

const tableData = [
	{
		date: '2016-05-03',
		title: '出错啦',
		description: '马冬梅写的xxx页面第xxx行，逻辑有无，有段代码永远都不会执行',
	},
	{
		date: '2016-05-02',
		title: '出错啦',
		description: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		title: '出错啦',
		description: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		title: '出错啦',
		description: 'No. 189, Grove St, Los Angeles',
	},
];
const router = useRouter();

function rowDbClick(row: (typeof tableData)[0], column: object) {
	console.log('===双击表格事件===', row, column);
	// 这里跳转错误详情页
	// 占位
	router.push('/errorDetail');
}
</script>

<style lang="scss" scoped>
.page-box {
	overflow: hidden;
	min-height: 99vh;
}
</style>
