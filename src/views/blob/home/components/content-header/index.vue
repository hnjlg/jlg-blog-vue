<template>
	<div class="blob-content-header-container">
		<el-icon :class="{ 'blob-content-header-lamp-dark': props.theme === 'dark', 'blob-content-header-lamp': true }" @click="changeTheme"
			><Opportunity
		/></el-icon>
		<el-dropdown trigger="click">
			<span>
				<div class="blob-content-header-user">
					{{ blobStore.$state?.userInfo?.userName ?? '游客' }}<el-icon><MoreFilled /></el-icon>
				</div>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item :icon="SwitchButton" @click="logOutHandle">Log out</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup lang="ts">
import { Opportunity, MoreFilled, SwitchButton } from '@element-plus/icons-vue';
import { T_BlobTheme } from '../../type';
import useBlobStore from '@/store/blob';
import { useRouter } from 'vue-router';

defineOptions({ name: 'BlobContentHeader' });

const blobStore = useBlobStore();

const router = useRouter();

const props = defineProps<{ theme: T_BlobTheme; changeTheme: () => void }>();

const logOutHandle = () => {
	router.push('blob-login');
	blobStore.changeUserInfo(null);
	localStorage.setItem('blob-userInfo', '{}');
	localStorage.setItem('blob-token', '');
};
</script>

<style scoped lang="scss">
.blob-content-header-container {
	display: flex;
	justify-content: flex-end;
	align-items: center;

	.blob-content-header-user {
		padding: 0 20px;

		@include useBlobTheme {
			color: getVar('textColor');
		}
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
