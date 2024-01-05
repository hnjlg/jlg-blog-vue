<!-- 文章列表组件 -->
<template>
	<div class="page-content">
		<el-empty v-if="!props.tableData" description="暂时还没有主子愿意公开文章哦！" />
		<div v-else>
			<div v-for="(item, index) in props.tableData" :key="index" class="pane-box py-3 mt-2 border-b-[1px] transition duration-500 flex">
				<div class="pane-box-item-right px-6 flex-1">
					<template v-if="props.isDisplayHot && 5 - index * 2 > 0">
						<el-icon v-for="iitem in 5 - index * 2" :key="iitem" color="#ff4400"><Star /></el-icon>
					</template>
					<div class="pane-box-item--title max-h-12">
						<span class="cursor-pointer truncate" @click="emit('click', item, index)">{{ item[props.correspondence.title] }}</span>
					</div>
					<div v-if="props.correspondence.description" class="pane-box-item--description min-h-[50px] text-sm opacity-75">
						<span class="cursor-pointer">{{ item[props.correspondence.description] }}</span>
					</div>
					<div class="pane-box-item--other">
						<el-tooltip effect="light" content="阅读量" placement="top">
							<el-icon size="16" class="cursor-pointer mr-2"><View /></el-icon>
						</el-tooltip>
						<span class="text-sm">{{ item[props.correspondence.lookAmount] }}</span>
						<el-tooltip effect="light" content="作者" placement="top">
							<el-icon size="16" class="cursor-pointer mx-2"><User /></el-icon>
						</el-tooltip>
						<span class="text-sm cursor-pointer">{{ item[props.correspondence.author] }}</span>
						<el-tooltip effect="light" content="发表时间" placement="top">
							<el-icon size="16" class="cursor-pointer ml-2"><Watch /></el-icon>
						</el-tooltip>
						<span class="text-sm">{{ dayjs(String(item[props.correspondence.publishTime])).format('YYYY/MM/DD') }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { View, User, Watch, Star } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

defineOptions({
	name: 'ArticleList',
});

const props = withDefaults(
	defineProps<{
		tableData: Array<Record<string, unknown>>;
		title?: string | number | null | undefined;
		correspondence?: {
			title: string;
			description?: string;
			publishTime: string;
			lookAmount: string;
			author: string;
		};
		isDisplayHot?: boolean;
	}>(),
	{
		tableData: () => [],
		title: null,
		correspondence: () => {
			return {
				title: 'title',
				description: 'description',
				publishTime: 'time',
				lookAmount: 'lookAmount',
				author: 'author',
			};
		},
		isDisplayHot: false,
	}
);

const emit = defineEmits(['click']);
</script>
<style scoped lang="scss">
.page-content {
	.pane-box:hover {
		@include useBlobTheme {
			background-color: getBlobVar('textColor');
			color: getBlobVar('bgColor');
		}
	}
}
</style>
