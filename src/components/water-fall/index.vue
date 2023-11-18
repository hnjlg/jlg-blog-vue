<template>
	<div
		:style="{
			display: 'grid',
			alignItems: 'start',
			gridColumnGap: info.gap + 'px',
			gridTemplateColumns: `repeat(${info.columns}, minmax(0, 1fr))`,
		}"
	>
		<fallRow v-for="(columns, index) in dataColumns" :key="index" :gap="info.gap + 'px'">
			<slot v-for="(column, index2) in columns" :key="index2" :data="column"></slot>
		</fallRow>
	</div>
</template>
<script setup lang="ts">
import { useMediaValues } from './hooks/useMedia';
import fallRow from './components/fall-row/index.vue';
import { PropConfigType } from './type';

defineOptions({
	name: 'WaterFall',
});

const createChunks = <T,>(data: T[] = [], columns = 3) => {
	const res: T[][] = [];

	for (let index = 0; index < data.length; index += columns) {
		const slice = data.slice(index, index + columns);
		res.push(slice);
	}

	return res;
};

const createDataColumns = <T,>(data: T[][] = [], columns = 3) => {
	const result = Array.from<T[], T[]>({ length: columns }, () => []);

	for (let idx = 0; idx < columns; idx++) {
		for (let jdx = 0; jdx < data.length; jdx += 1) {
			if (data[jdx][idx]) {
				result[idx].push(data[jdx][idx]);
			}
		}
	}

	return result;
};

const props = defineProps<{
	data: unknown[];
	config: PropConfigType;
}>();

const info = useMediaValues(props.config);

const chunks = createChunks(props.data, info.columns);

const dataColumns = createDataColumns(chunks, info.columns);
</script>
