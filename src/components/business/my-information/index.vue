<!-- 我的信息 - 组件 -->
<template>
	<el-form ref="ruleFormRef" :model="editForm" :rules="rules" label-position="top" size="small" status-icon>
		<!-- <el-form-item label="用户名" prop="userName">
			<el-input v-model="loginForm.userName" placeholder="Please input userName" clearable @keyup.enter="submitHandle" />
		</el-form-item> -->
		<el-form-item label="密码" prop="passWord">
			<el-input v-model="editForm.passWord" placeholder="Please input passWord" show-password clearable @keyup.enter="sumbmitEditFun" />
		</el-form-item>
		<el-form-item label="密码确认" prop="confirmPassWord">
			<el-input v-model="editForm.confirmPassWord" placeholder="Please input confirmPassWord" show-password clearable @keyup.enter="sumbmitEditFun" />
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="editForm.email" placeholder="Please input email" clearable @keyup.enter="sumbmitEditFun" />
		</el-form-item>
		<el-checkbox v-model="editForm.isReceiveEmail" label="是否接收邮件" size="large" />
	</el-form>
	<div class="btn-box text-right">
		<el-button @click="handleCancel">取消</el-button>
		<el-button @click="sumbmitEditFun">修改</el-button>
	</div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { postUserupdate } from '@/apiType/production/result.ts';
import { ref } from 'vue';
import useBlogBackendStore from '@/store/blog-backend';
import { loginOut } from '@/views/blog-backend/home/hooks/loginout';
import CryptoJS from 'crypto-js';
defineOptions({
	name: 'MyInformation',
});

const props = defineProps({
	modalTitle: {
		type: String,
		default: '',
	},
	propsData: {
		type: Object,
		default: () => ({}),
	},
});
const emits = defineEmits(['close', 'submit']);
const editForm = ref({
	userName: '',
	passWord: '',
	confirmPassWord: '',
	email: '',
	isReceiveEmail: false,
});

const rules = ref<FormRules>({
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
				if (value !== editForm.value.passWord) {
					callback('The two password inputs are inconsistent');
				} else {
					callback();
				}
			},
		},
	],
});

async function initModal() {
	switch (props.propsData.drawerType) {
		case 'add':
			break;
		case 'edit':
			{
				// await getInitData();
			}
			break;
		case 'view':
			{
				// await getInitData();
			}
			break;
		default:
			break;
	}
}
initModal();

// const dialogVisible = ref(false);

const ruleFormRef = ref<FormInstance>();

const blogBackendStore = useBlogBackendStore();
// 编辑
async function sumbmitEditFun() {
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid) => {
		if (valid) {
			postUserupdate({
				author: blogBackendStore.getUserInfo.id,
				passWord: CryptoJS.AES.encrypt(editForm.value.passWord, 'blog').toString(),
				email: editForm.value.email,
				isReceiveEmail: editForm.value.isReceiveEmail ? 1 : 0,
			}).then((result) => {
				if (result.data.status === 1) {
					loginOut();
					ElMessage.success('edit my-information success!');
					handleCancel();
				}
			});
		} else {
			ElMessage.error('Please fill out the form according to the prompts!');
		}
	});
}

// 关闭弹窗
function handleCancel() {
	// dialogVisible.value = false;
	emits('close');
}
</script>
