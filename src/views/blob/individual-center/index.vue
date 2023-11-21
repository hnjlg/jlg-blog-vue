<template>
	<div class="individual-center-container">
		<el-form ref="formRef" :model="individualForm" :rules="rules" label-width="120px" label-position="top" class="form">
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="individualForm.userName" placeholder="Please input userName" clearable @blur="SubmitHandle" />
			</el-form-item>
			<el-form-item label="电话" prop="phone">
				<el-input v-model="individualForm.phone" placeholder="Please input phone" clearable @blur="SubmitHandle" />
			</el-form-item>
			<el-form-item label="密码" prop="passWord">
				<el-input v-model="individualForm.passWord" placeholder="Please input passWord" show-password clearable @blur="SubmitHandle" />
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="individualForm.email" placeholder="Please input email" clearable @blur="SubmitHandle" />
			</el-form-item>
			<el-form-item label="地址" prop="address">
				<el-input v-model="individualForm.address" placeholder="Please input address" clearable @blur="SubmitHandle" />
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input-number
					v-model="individualForm.age"
					:min="0"
					:max="150"
					controls-position="right"
					placeholder="Please input age"
					@blur="SubmitHandle"
				/>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { I_RegisterModel, blobAccountUpdate } from '@/api/blob';
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';
import useBlobStore from '@/store/blob';

defineOptions({
	name: 'IndividualCenter',
});

const formRef = ref<FormInstance>();

const blobStore = useBlobStore();

const individualForm = ref<Partial<I_RegisterModel>>({});

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
	phone: [
		{ required: true, message: 'Please input phone', trigger: 'blur' },
		{
			validator(_rule, value, callback) {
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
			validator(_rule, value, callback) {
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
			validator(_rule, value, callback) {
				if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
					callback();
				} else {
					callback('email wrong format');
				}
			},
		},
	],
});

onMounted(() => {
	if (blobStore.$state.userInfo) {
		individualForm.value = blobStore.$state.userInfo;
		pageLoading.value = false;
	}
});

const SubmitHandle = () => {
	formRef.value?.validate((valid) => {
		if (valid) {
			blobAccountUpdate(individualForm.value).then((res) => {
				ElMessage.success('Change Success');
				blobStore.changeUserInfo(res.data.data);
				localStorage.setItem('blob-token', res.data.data.token);
			});
		} else {
			ElMessage.warning('Please enter the correct content as prompted');
		}
	});
};
</script>

<style lang="scss" scoped>
.individual-center-container {
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
