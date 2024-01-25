<!-- 标签 新增/编辑 - 组件 -->
<template>
	<el-form ref="ruleFormRef" :model="tagForm" :rules="rules" label-position="top" size="small" status-icon>
		<el-form-item label="标签名称" prop="tagName">
			<el-input v-model="tagForm.tagName" placeholder="Please input userName" clearable @keyup.enter="sumbmitFun" />
		</el-form-item>
	</el-form>
	<div class="btn-box text-right">
		<el-button @click="handleCancel">取消</el-button>
		<el-button @click="sumbmitFun">确定</el-button>
	</div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { postArticletagstagsadd } from '@/apiType/production/result.ts';
import { ref } from 'vue';
defineOptions({
	name: 'AddTag',
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
const tagForm = ref({
	tagName: '',
});

const rules = ref<FormRules>({
	tagName: [{ required: true, message: 'Please input tag name', trigger: 'blur' }],
});

async function initModal() {
	switch (props.propsData.drawerType) {
		case 'add':
			break;
		case 'edit':
			{
				console.log(props.propsData.row);
				tagForm.value.tagName = props.propsData.row.tagName;
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

const dialogVisible = ref(false);

const ruleFormRef = ref<FormInstance>();

// 编辑
async function sumbmitFun() {
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid) => {
		if (valid) {
			if (props.propsData.drawerType === 'add') {
				postArticletagstagsadd({ tagName: tagForm.value.tagName }).then((result) => {
					if (result.data.status === 1) {
						ElMessage.success('add Tag success!');
						handleCancel();
					}
				});
			} else {
				// postArticletagstagsedit({ tagName: tagForm.value.tagName, id: props.propsData.row.id }).then((result) => {
				// 	if (result.data.status === 1) {
				// 		ElMessage.success('edit Tag success!');
				// 		handleCancel();
				// 	}
				// });
			}
		} else {
			ElMessage.error('Please fill out the form according to the prompts!');
		}
	});
}

// 关闭弹窗
function handleCancel() {
	dialogVisible.value = false;
	emits('close');
}
</script>
