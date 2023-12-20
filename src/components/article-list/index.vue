<!-- 文章列表组件 -->
<template>
	<div class="page-content">
		<div v-infinite-scroll="load" infinite-scroll-delay="800" infinite-scroll-distance="30" infinite-scroll-immediate="true">
			<div v-for="(item, index) in props.tableData" :key="index" class="pane-box py-3 mt-2 border-b-[1px] hover:bg-slate-100 flex">
				<div class="pane-box-item-right px-6 flex-1">
					<div class="pane-box-item--title max-h-12 truncate">
						<span class="cursor-pointer" @click="emit('click', item, index)">{{ item[props.correspondence.title] }}</span>
					</div>
					<div v-if="props.correspondence.description" class="pane-box-item--description min-h-[50px] text-sm opacity-75">
						<span class="cursor-pointer">{{ item[props.correspondence.description] }}</span>
					</div>
					<div class="pane-box-item--other">
						<el-tooltip effect="light" content="讲得不错！赞" placement="top">
							<el-icon size="16" class="cursor-pointer mr-2"><Star /></el-icon>
						</el-tooltip>
						<span class="text-sm">20</span>
						<el-tooltip effect="light" content="作者" placement="top">
							<el-icon size="16" class="cursor-pointer mx-2"><User /></el-icon>
						</el-tooltip>
						<span class="text-sm cursor-pointer">马冬梅</span>
						<el-tooltip effect="light" content="发表时间" placement="top">
							<el-icon size="16" class="cursor-pointer ml-2"><Watch /></el-icon>
						</el-tooltip>
						<span class="text-sm">{{ item[props.correspondence.publishTime] }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { Star, User, Watch } from '@element-plus/icons-vue';
// import { useRouter } from 'vue-router';
import { ref } from 'vue';
defineOptions({
	name: 'ArticleList',
});

const props = withDefaults(
	defineProps<{
		tableData: Array<Record<string, unknown>>;
		title?: string | number | null | undefined;
		correspondence: any;
	}>(),
	{
		tableData: () => [],
		title: null,
		correspondence: {
			title: 'title',
			description: 'description',
			publishTime: 'time',
		},
	}
);
const emit = defineEmits(['click']);

const count = ref(3);
const load = () => {
	count.value += 2;
};
</script>
