<!-- 抽屉 -->
<template>
	<el-drawer
		v-model="drawerValue"
		:title="props.drawerTitle"
		:direction="props.drawerDirection"
		:size="props.drawerSize"
		v-bind="$attrs"
		modal-class="drawerClassName"
		@closed="handleCancel"
	>
		<slot name="default"></slot>
	</el-drawer>
</template>

<script setup lang="ts">
import { I_SonData } from '@/mixin/drawer';
import { DrawerProps } from 'element-plus';

defineOptions({
	name: 'ArticleFrame',
});

const props = withDefaults(
	defineProps<{
		drawerTitle: DrawerProps['title'];
		drawerSize: DrawerProps['size'];
		drawerDirection: DrawerProps['direction'];
		propsData: unknown;
		getSonData: (data: I_SonData) => void;
	}>(),
	{ drawerTitle: '', drawerSize: '100%', drawerDirection: 'ltr' }
);

const emits = defineEmits(['close']);

const drawerValue = ref(true);

// 关闭弹窗回调
function handleCancel() {
	drawerValue.value = false;
	emits('close');
}

onMounted(() => {
	props.getSonData({
		close: () => {
			return new Promise((resolve) => {
				drawerValue.value = false;
				setTimeout(() => {
					resolve(void 0);
				}, 300);
			});
		},
	});
});

defineExpose({
	handleCancel,
});
</script>
