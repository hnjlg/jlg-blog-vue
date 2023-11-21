<template>
	<div class="blob-login-container">
		<el-form ref="formRef" :model="loginForm" :rules="rules" label-width="120px" label-position="top" class="form">
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="loginForm.userName" placeholder="Please input userName" clearable />
			</el-form-item>
			<el-form-item label="密码" prop="passWord">
				<el-input v-model="loginForm.passWord" placeholder="Please input passWord" show-password clearable />
			</el-form-item>
			<el-form-item>
				<el-button @click="registerHandle">To Register</el-button>
				<el-button :loading="submitLoading" @click="SubmitHandle">Submit</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { blobLogin, I_LoginModel } from '@/api/blob';
import useBlobStore from '@/store/blob';

defineOptions({
	name: 'BlobLogin',
});

const formRef = ref<FormInstance>();

const blobStore = useBlobStore();

const loginForm = ref<I_LoginModel>({
	userName: '',
	passWord: '',
});

const router = useRouter();

const rules = ref<FormRules>({
	userName: [
		{ required: true, message: 'Please input userName', trigger: 'blur' },
		{
			validator(_rule, value, callback) {
				if (value.length > 16 || value.length < 2) {
					callback('The length is between 2 and 16');
				} else {
					callback();
				}
			},
		},
	],
	passWord: [
		{ required: true, message: 'Please input passWord', trigger: 'blur' },
		{
			validator(_rule, value, callback) {
				if (value.length > 16 || value.length < 6) {
					callback('The length is between 6 and 16');
				} else {
					callback();
				}
			},
		},
	],
});

const registerHandle = () => {
	router.push('blob-register');
};

const submitLoading = ref<boolean>(false);

const SubmitHandle = () => {
	formRef.value?.validate((valid) => {
		if (valid) {
			submitLoading.value = true;
			blobLogin(loginForm.value)
				.then((res) => {
					ElMessage.success('Login Success');
					router.push('blob-content-home');
					submitLoading.value = false;
					blobStore.changeUserInfo(res.data.data);
					localStorage.setItem('blob-token', res.data.data.token);
				})
				.catch(() => {
					submitLoading.value = false;
				});
		} else {
			ElMessage.warning('Please enter the correct content as prompted');
		}
	});
};
</script>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
