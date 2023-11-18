<template>
	<div class="blob-register-container">
		<el-form ref="formRef" :model="registerForm" :rules="rules" label-width="120px" label-position="top" class="form">
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="registerForm.userName" placeholder="Please input userName" clearable />
			</el-form-item>
			<el-form-item label="电话" prop="phone">
				<el-input v-model="registerForm.phone" placeholder="Please input phone" clearable />
			</el-form-item>
			<el-form-item label="密码" prop="passWord">
				<el-input v-model="registerForm.passWord" placeholder="Please input passWord" show-password clearable />
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="registerForm.email" placeholder="Please input email" clearable />
			</el-form-item>
			<el-form-item label="地址" prop="address">
				<el-input v-model="registerForm.address" placeholder="Please input address" clearable />
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input-number v-model="registerForm.age" :min="0" :max="150" controls-position="right" placeholder="Please input age" />
			</el-form-item>
			<el-form-item>
				<el-button @click="loginHandle">Login</el-button>
				<el-button @click="SubmitHandle">Submit</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules, RuleForm } from 'element-plus';
import { useRouter } from 'vue-router';
defineOptions({
	name: 'BlobRegister',
});

const formRef = ref<FormInstance>();

const registerForm = ref({});

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
	phone: [
		{ required: true, message: 'Please input phone', trigger: 'blur' },
		{
			validator(rule, value, callback) {
				if (/^[1][3-8]+\d{9}$/.test(value)) {
					callback();
				} else {
					callback('phone wrong format');
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
	email: [
		{ required: true, message: 'Please input email', trigger: 'blur' },
		{
			validator(rule, value, callback) {
				if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
					callback();
				} else {
					callback('email wrong format');
				}
			},
		},
	],
});

const loginHandle = () => {
	router.push('blob-login');
};

const SubmitHandle = () => {
	ElMessage.success('Submit Success');
};
</script>

<style lang="scss" scoped>
.blob-register-container {
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
