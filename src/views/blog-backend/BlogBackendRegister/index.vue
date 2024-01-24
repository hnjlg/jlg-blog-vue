<!-- blog后台-注册页 -->
<template>
	<div class="blob-register-container">
		<el-form ref="formRef" :model="loginForm" :rules="rules" label-width="120px" label-position="top" class="form">
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="loginForm.userName" placeholder="Please input userName" clearable @keyup.enter="submitHandle" />
			</el-form-item>
			<el-form-item label="密码" prop="passWord">
				<el-input v-model="loginForm.passWord" placeholder="Please input passWord" show-password clearable @keyup.enter="submitHandle" />
			</el-form-item>
			<el-form-item label="密码确认" prop="confirmPassWord">
				<el-input
					v-model="loginForm.confirmPassWord"
					placeholder="Please input confirmPassWord"
					show-password
					clearable
					@keyup.enter="submitHandle"
				/>
			</el-form-item>
			<el-form-item>
				<el-button @click="reHomePage">return homePage</el-button>
				<el-button :loading="submitLoading" @click="submitHandle">Submit</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
// import useBlogBackendStore from '@/store/blog-backend';
import { postUserregister } from '@/apiType/production/result';
import CryptoJS from 'crypto-js';

defineOptions({
	name: 'BlogBackendRegister',
});

const formRef = ref<FormInstance>();

// const blogBackendStore = useBlogBackendStore();

const loginForm = ref({
	userName: '',
	passWord: '',
	confirmPassWord: '',
});
const reHomePage = () => {
	router.push('BlogBackendIndex');
};
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
	confirmPassWord: [
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
		{
			validator(_rule, value, callback) {
				if (value !== loginForm.value.passWord) {
					callback('The two password inputs are inconsistent');
				} else {
					callback();
				}
			},
		},
	],
});

const submitLoading = ref<boolean>(false);

const submitHandle = () => {
	formRef.value?.validate((valid) => {
		if (valid) {
			submitLoading.value = true;
			postUserregister({ userName: loginForm.value.userName, passWord: CryptoJS.AES.encrypt(loginForm.value.passWord, 'blog').toString() })
				.then(() => {
					ElMessage.success('注册成功！');
					router.push('BlogBackendIndex');
					// });
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
