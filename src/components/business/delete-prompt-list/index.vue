<template>
	<el-alert type="error" effect="dark" :closable="false">
		<template #title> "{{ props.rowData.tag_name }}"标签下存在文章，请为文章选择一个新的标签并删除原标签 </template>
	</el-alert>
	<el-select
		v-model="value"
		filterable
		remote
		reserve-keyword
		placeholder="请输入标签关键词"
		collapse-tags
		collapse-tags-tooltip
		:remote-method="articleTagsRemoteMethod"
		:loading="articleTagsLoading"
		style="width: 100%; margin: 5px 0"
		@change="props.valueReturn"
	>
		<el-option v-for="item in articleTagsList" :key="item.id" :disabled="item.disabled" :label="item.tag_name" :value="item.id" />
	</el-select>
	<simple-table :table-data="props.tableData" :field-list="tableCols" max-height="500px" stripe border size="large">
		<template #add-time="{ row }">{{ dayjs(String(row.add_time)).format('YYYY/MM/DD') }}</template>
	</simple-table>
</template>
<script setup lang="ts">
import {
	AT_ArticleTagsTagsQueryResponse,
	AT_BlogTagsQueryResponse,
	AT_QueryArticleSingleByTagIdResponse,
	postBlogtagsquery,
} from '@/apiType/production/result';
import dayjs from 'dayjs';

defineOptions({
	name: 'DeletePromptList',
});
const props = withDefaults(
	defineProps<{ tableData: AT_QueryArticleSingleByTagIdResponse[]; valueReturn: (val: string) => void; rowData: AT_ArticleTagsTagsQueryResponse }>(),
	{}
);

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
const articleTagsList = ref<(AT_BlogTagsQueryResponse & { disabled: boolean })[]>([]);

function articleTagsRemoteMethod(tagName: string) {
	articleTagsLoading.value = true;
	if (tagName === '') return;
	postBlogtagsquery({
		pageIndex: 1,
		pageSize: 10,
		tagName: tagName,
	})
		.then((result) => {
			articleTagsList.value = result.data.content.arr.map((item) => ({
				...item,
				disabled: item.id === props.rowData.id,
			}));
		})
		.finally(() => {
			articleTagsLoading.value = false;
		});
}
</script>
