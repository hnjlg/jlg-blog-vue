<template>
	<div
		:style="{
			display: 'grid',
			rowGap: prop.gap,
			gridTemplateColumns: `minmax(0, 1fr)`,
		}"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'FallRow',
});
const prop = defineProps<{
	gap: string;
}>();
</script>
