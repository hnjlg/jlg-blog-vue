<template>
	<div class="background-content-header-container">
		<span class="cursor-pointer" @click="goBackHandle">
			<el-icon class="top-left-icon"><TopLeft /></el-icon><span>Go Back</span>
		</span>
		<el-select v-model="mdTheme">
			<el-option label="github-night" value="github-night" />
			<el-option label="sneh-dark" value="sneh-dark" />
		</el-select>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { TopLeft } from '@element-plus/icons-vue';
import { mdTheme } from './hooks/useMdTheme';
defineOptions({
	name: 'BackgroundContentHeader',
});

const router = useRouter();

const goBackHandle = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.background-content-header-container {
	display: flex;
	align-items: center;
	height: $blob-header-goback-height;
	.top-left-icon {
		cursor: pointer;
	}
}
</style>
