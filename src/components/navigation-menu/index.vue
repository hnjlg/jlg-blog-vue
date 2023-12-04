<template>
	<div class="navigation-menu-container">
		<el-drawer
			:model-value="props.modelValue"
			direction="ttb"
			size="80%"
			:with-header="false"
			:show-close="false"
			:modal="false"
			:lock-scroll="false"
		>
			<div>
				<div @click="menuLink('/home')">home</div>
				<div @click="menuLink('/errorSDK')">error-sdk</div>
				<div @click="menuLink('/markdown-test')">markdown-test</div>
				<div @click="menuLink('/blob-home')">blob-home</div>
				<div @click="menuLink('/blob-backend')">blob-backend</div>
			</div>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
defineOptions({
	name: 'NavigationMenu',
});

const props = withDefaults(
	defineProps<{
		modelValue: boolean;
		animationEventCallback?: {
			drawerOpened: () => void;
			drawerClosed: () => void;
		};
	}>(),
	{
		modelValue: false,
	}
);

const emits = defineEmits(['update:modelValue']);

const router = useRouter();

const menuLink = (url: string) => {
	router.push(url);
	emits('update:modelValue', false);
};

const timer = ref<NodeJS.Timeout | null>(null);
watch(
	() => props.modelValue,
	(newValue) => {
		if (timer.value) {
			clearTimeout(timer.value);
		}
		timer.value = setTimeout(
			() => {
				newValue ? props?.animationEventCallback?.drawerOpened?.() : props?.animationEventCallback?.drawerClosed?.();
			},
			newValue ? 2000 : 300
		);
	}
);
</script>

<style scoped lang="scss">
.navigation-menu-container {
	:deep(.el-drawer) {
		transition-duration: 2s;
	}
}
</style>
