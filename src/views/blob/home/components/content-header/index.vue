<template>
	<div class="blob-content-header-container">
		<el-icon :class="{ 'blob-content-header-lamp-dark': props.theme === 'dark', 'blob-content-header-lamp': true }" @click="changeTheme"
			><Opportunity
		/></el-icon>
		<div class="blob-content-header-user">游客</div>
	</div>
</template>

<script setup lang="ts">
import { Opportunity } from '@element-plus/icons-vue';
import { T_BlobTheme } from '../../type';
defineOptions({ name: 'BlobContentHeader' });

const props = defineProps<{ theme: T_BlobTheme; changeTheme: () => void }>();
</script>

<style scoped lang="scss">
.blob-content-header-container {
	display: flex;
	justify-content: flex-end;
	align-items: center;

	.blob-content-header-user {
		padding: 0 20px;
	}

	.blob-content-header-lamp {
		cursor: pointer;
	}

	.blob-content-header-lamp-dark {
		@include useBlobTheme() {
			box-shadow: 0 0 94px 64px getVar('textColor');
			height: 0;
		}
	}
}
</style>
