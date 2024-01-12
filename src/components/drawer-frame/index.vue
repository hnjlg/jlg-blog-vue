<!-- 抽屉 -->
<template>
	<el-drawer
		v-model="dialogVisible"
		:title="props.drawerTitle"
		:direction="props.drawerDirection"
		:size="props.drawerSize"
		v-bind="$attrs"
		modal-class="drawerClassName"
	>
		<slot name="default"></slot>
	</el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineOptions({
	name: 'ArticleFrame',
});

const props = defineProps({
	// 抽屉标题
	drawerTitle: {
		type: String,
		default: '',
	},
	// 抽屉大小
	drawerSize: {
		type: String,
		default: '100%',
	},
	// 抽屉方向
	drawerDirection: {
		type: String,
		default: 'ltr',
	},
	// 传递参数
	propsData: {
		type: Object,
		default: () => ({}),
	},
});
const emits = defineEmits(['cancel', 'submit']);

const dialogVisible = ref(false);

// 关闭弹窗
function handleCancel() {
	dialogVisible.value = false;
	emits('cancel');
}

defineExpose({
	handleCancel,
});
</script>
