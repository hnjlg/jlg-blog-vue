<template>
	<el-select
		v-model="value"
		filterable
		remote
		reserve-keyword
		placeholder="Please enter a keyword"
		collapse-tags
		collapse-tags-tooltip
		:remote-method="articleTagsRemoteMethod"
		:loading="articleTagsLoading"
		@change="props.valueReturn"
	>
		<el-option v-for="item in articleTagsList" :key="item.id" :label="item.tag_name" :value="item.id" />
	</el-select>
	<simple-table :table-data="props.tableData" :field-list="tableCols" max-height="500px" stripe border size="large">
		<template #add-time="{ row }">{{ dayjs(String(row.add_time)).format('YYYY/MM/DD') }}</template>
	</simple-table>
</template>
<script setup lang="ts">
import { AT_BlogTagsQueryResponse, AT_QueryArticleSingleByTagIdResponse, postBlogtagsquery } from '@/apiType/production/result';
import dayjs from 'dayjs';

defineOptions({
	name: 'DeletePromptList',
});
const props = withDefaults(defineProps<{ tableData: AT_QueryArticleSingleByTagIdResponse[]; valueReturn: (val: string) => void }>(), {});

const tableCols = ref([
	{
		title: '文章标题',
		field: 'title',
		minWidth: 200,
	},

	{
		title: '发表时间',
		field: 'add_time',
		width: 120,
		slotName: 'add-time',
	},
	{
		title: '作者',
		field: 'user_name',
		width: 80,
	},
]);
const value = ref('');

// 文章标签远程检索
const articleTagsLoading = ref(false);
const articleTagsList = ref<AT_BlogTagsQueryResponse[]>([]);
function articleTagsRemoteMethod(tagName: string) {
	articleTagsLoading.value = true;
	if (tagName === '') return;
	postBlogtagsquery({
		pageIndex: 1,
		pageSize: 10,
		tagName: tagName,
	})
		.then((result) => {
			articleTagsList.value = result.data.content.arr;
		})
		.finally(() => {
			articleTagsLoading.value = false;
		});
}
</script>
