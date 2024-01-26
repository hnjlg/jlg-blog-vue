<!-- blog后台-登录注册页 -->
<template>
	<div class="blob-login-container">
		<el-form ref="formRef" :model="loginForm" :rules="rules" label-width="120px" label-position="top" class="form">
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="loginForm.userName" placeholder="Please input userName" clearable @keyup.enter="submitHandle" />
			</el-form-item>
			<el-form-item label="密码" prop="passWord">
				<el-input v-model="loginForm.passWord" placeholder="Please input passWord" show-password clearable @keyup.enter="submitHandle" />
			</el-form-item>
			<el-form-item>
				<el-button @click="registerHandle">To Register</el-button>
				<el-button :loading="submitLoading" @click="submitHandle">Submit</el-button>
				<el-checkbox v-model="loginForm.isRemember" label="记住密码" size="large" style="margin-left: 30px" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import useBlogBackendStore from '@/store/blog-backend';
import { getRouterconfiguserrouterquery, postUserlogin } from '@/apiType/production/result';
import CryptoJS from 'crypto-js';
import { router } from '@/router/index';

defineOptions({
	name: 'BlogBackendLogin',
});

const formRef = ref<FormInstance>();

const blogBackendStore = useBlogBackendStore();

const loginForm = ref({
	userName: '',
	passWord: '',
	isRemember: false,
});
onMounted(() => {
	const userName = localStorage.getItem('savedUsername');
	const passWord = localStorage.getItem('savedPassword');
	if (userName && passWord) {
		loginForm.value.userName = userName;
		loginForm.value.passWord = passWord;
		loginForm.value.isRemember = true;
	}
});
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
	router.push('BlogBackendRegister');
};

const submitLoading = ref<boolean>(false);

const submitHandle = () => {
	formRef.value?.validate((valid) => {
		if (valid) {
			submitLoading.value = true;
			postUserlogin({ userName: loginForm.value.userName, passWord: CryptoJS.AES.encrypt(loginForm.value.passWord, 'blog').toString() })
				.then(async (res) => {
					// 判断是否记住密码
					if (loginForm.value.isRemember) {
						localStorage.setItem('savedUsername', loginForm.value.userName);
						localStorage.setItem('savedPassword', loginForm.value.passWord);
					} else {
						localStorage.removeItem('savedUsername');
						localStorage.removeItem('savedPassword');
					}
					blogBackendStore.changeUserInfo(res.data.content);
					sessionStorage.setItem('blog-backend-token', res.data.content.token);
					const result = await getRouterconfiguserrouterquery();
					blogBackendStore.changeRouterInfo(result.data.content);
					ElMessage.success('登录成功！');
					router.push('BlogBackendIndex');
				})
				.finally(() => {
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
