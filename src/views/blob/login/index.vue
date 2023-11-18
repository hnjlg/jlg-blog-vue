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
				<el-button @click="registerHandle">Register</el-button>
				<el-button @click="SubmitHandle">Submit</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules, RuleForm } from 'element-plus';
import { useRouter } from 'vue-router';
defineOptions({
	name: 'BlobLogin',
});

const formRef = ref<FormInstance>();

const loginForm = ref({});

const router = useRouter();

const rules = ref<FormRules<RuleForm>>({
	userName: [
		{ required: true, message: 'Please input userName', trigger: 'blur' },
		{
			validator(rule, value, callback) {
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
			validator(rule, value, callback) {
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

const SubmitHandle = () => {
	ElMessage.success('Submit Success');
	router.push('blob-content-home');
};
</script>

<style lang="scss" scoped>
.blob-login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	.form {
		min-width: 400px;
		min-height: 300px;
	}
}
</style>
