<template>
	<div class="background-content-header-container">
		<el-icon class="top-left-icon" @click="goBackHandle"><TopLeft /></el-icon><span>Go Back</span>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { TopLeft } from '@element-plus/icons-vue';
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
	padding: 5px 10px;
	display: flex;
	align-items: center;
	.top-left-icon {
		cursor: pointer;
	}
}
</style>
