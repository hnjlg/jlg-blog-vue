<template>
	<div v-if="props.title" class="border-l-8 my-10px px-2">
		<span class="text-lg font-bold">{{ props.title }}</span>
	</div>
	<el-table ref="elTableRef" :data="props.tableData" v-bind="$attrs" @row-dblclick="dbClickRow">
		<template v-if="props.fieldList">
			<el-table-column v-for="(item, index) in props.fieldList" :key="index" :prop="item.field" :label="item.title"></el-table-column>
		</template>
		<template v-else>
			<el-table-column v-for="(item, index) in defaultFieldList" :key="index" :prop="item" :label="item"></el-table-column>
		</template>
	</el-table>
</template>

<script setup lang="ts">
defineOptions({
	name: 'SimpleTable',
});

const props = withDefaults(
	defineProps<{
		tableData: Array<Record<string, unknown>>;
		fieldList?: Array<{ field: string; title: string }>;
		title?: string | null | undefined;
	}>(),
	{
		tableData: () => [],
		title: null,
	}
);

const emit = defineEmits(['dbclick:row']);

function dbClickRow(row: Record<string, unknown>, column: Record<string, unknown>, event: () => void) {
	emit('dbclick:row', row, column, event);
}
// 表格默认列名
const defaultFieldList = Object.keys(props.tableData[0]);
</script>
