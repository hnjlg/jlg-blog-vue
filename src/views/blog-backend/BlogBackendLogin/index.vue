<!-- blog后台-登录注册页 -->
<template>
	<input type="text" />
	<div class="blob-login-container">
		<el-form ref="formRef" :model="loginForm" :rules="rules" label-width="120px" label-position="top" class="form">
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="loginForm.userName" placeholder="Please input userName" clearable @keyup.enter="submitHandle" />
			</el-form-item>
			<el-form-item label="密码" prop="passWord">
				<el-input
					v-model="loginForm.passWord"
					type="password"
					placeholder="Please input passWord"
					:show-password="!loginForm.isRemember"
					clearable
					@keyup.enter="submitHandle"
					@input="handleInput"
				/>
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
import Cookies from 'js-cookie';
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
// 记住密码 - 存储的密码（加密过）
const storePassWord = ref('');
// 密码框内容是否被改动过
const isPassWordChange = ref(false);
onMounted(() => {
	const userName = Cookies.get('savedUsername');
	const passWord = Cookies.get('savedPassword');
	if (userName && passWord) {
		storePassWord.value = passWord;
		loginForm.value.userName = userName;
		loginForm.value.passWord = '******';
		loginForm.value.isRemember = true;
	}
});
const handleInput = () => {
	isPassWordChange.value = true;
};
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
			// 只有当Cookies中有保存用户名和密码时 且 用户没有动过密码框时 采用不加密提交
			const passWord =
				Cookies.get('savedUsername') && !isPassWordChange.value
					? storePassWord.value
					: CryptoJS.AES.encrypt(loginForm.value.passWord, 'blog').toString();
			postUserlogin({
				userName: loginForm.value.userName,
				passWord: passWord,
			})
				.then(async (res) => {
					// 判断是否记住密码
					if (loginForm.value.isRemember) {
						Cookies.set('savedUsername', loginForm.value.userName, { expires: 3 });
						Cookies.set('savedPassword', passWord, { expires: 3 });
					} else {
						Cookies.remove('savedUsername');
						Cookies.remove('savedPassword');
					}
					// 记录登录信息
					blogBackendStore.changeUserInfo(res.data.content);
					sessionStorage.setItem('blog-backend-token', res.data.content.token);
					// 记录路由权限信息
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
