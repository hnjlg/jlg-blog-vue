<!-- 表格 -->
<template>
	<div v-if="props.title" class="border-l-8 my-10px px-2">
		<span class="text-lg font-bold">{{ props.title }}</span>
	</div>
	<el-empty v-if="!props.tableData || props.tableData.length === 0" description="还么有创作文章！" />
	<el-table v-else ref="elTableRef" style="width: 100%" v-bind="$attrs" :data="props.tableData" @row-dblclick="dbClickRow">
		<template v-if="props.fieldList">
			<el-table-column
				v-for="(item, index) in props.fieldList"
				:key="index"
				:prop="item.field"
				:label="item.title"
				v-bind="item ?? {}"
				show-overflow-tooltip
			>
				<template v-if="item.slotName" #default="scope">
					<slot :name="item.slotName" :row="scope.row"></slot>
				</template>
			</el-table-column>
			<el-table-column v-if="props.operationColumnWidth" fixed="right" label="操作" :width="props.operationColumnWidth">
				<template #default="scope">
					<div class="flex justify-around whitespace-nowrap truncate">
						<slot name="operation-column" :row="scope"></slot>
					</div>
				</template>
			</el-table-column>
		</template>
		<template v-else>
			<el-table-column v-for="(item, index) in defaultFieldList" :key="index" :prop="item" :label="item"></el-table-column>
		</template>
	</el-table>
</template>

<script setup lang="ts">
// import { Refresh } from '@element-plus/icons-vue';
defineOptions({
	name: 'SimpleTable',
});

const props = withDefaults(
	defineProps<{
		tableData: Array<Record<string, unknown>>;
		fieldList?: Array<Record<string, unknown>>;
		title?: string | number | null | undefined;
		operationColumnWidth?: number | boolean | null | undefined;
		paginationData: any;
	}>(),
	{
		tableData: () => [],
		title: null,
		operationColumnWidth: null,
		paginationData: null,
	}
);

const elTableRef = ref();

const emit = defineEmits(['dbclick:row']);

function dbClickRow(row: Record<string, unknown>, column: Record<string, unknown>, event: () => void) {
	emit('dbclick:row', row, column, event);
}
// 表格默认列名
const defaultFieldList = props.fieldList?.length === 0 && Object.keys(props.tableData[0]);

defineExpose({
	elTableRef,
});
</script>
