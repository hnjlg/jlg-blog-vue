<!-- 文章树 新增/编辑 - 组件 -->
<template>
	<el-form ref="ruleFormRef" :model="TreeForm" :rules="rules" label-position="top" size="small" status-icon>
		<el-form-item label="文章树名称" prop="treeName">
			<el-input v-model="TreeForm.treeName" placeholder="Please input userName" clearable />
		</el-form-item>
		<el-form-item label="父级文章树" prop="parentId">
			<el-select
				v-model="TreeForm.parentId"
				filterable
				remote
				reserve-keyword
				collapse-tags
				collapse-tags-tooltip
				placeholder="Please enter a keyword"
				:remote-method="articleTreeListRemoteMethod"
				:loading="articleTagsLoading"
			>
				<el-option :key="null" label="默认最高级别" :value="null" />
				<el-option v-for="item in articleTreeList" :key="item.id" :label="item.article_tree_name" :value="item.id" />
			</el-select>
		</el-form-item>
	</el-form>
	<div class="btn-box text-right">
		<el-button @click="handleCancel">取消</el-button>
		<el-button type="primary" :loading="sumbmitLoading" @click="sumbmitFun">确定</el-button>
	</div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import {
	postArticletreearticletreenamequery,
	postArticletreetreeadd,
	type AT_ArticleTreeArticleTreeNameQueryResponse,
} from '@/apiType/production/result.ts';
import { ref } from 'vue';
defineOptions({
	name: 'AddTree',
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

const TreeForm = ref({
	treeName: '',
	parentId: null,
});

const rules = ref<FormRules>({
	treeName: [{ required: true, message: 'Please input treeName', trigger: 'blur' }],
	parentId: [{ required: false, message: 'Please input parentId', trigger: 'blur' }],
});

async function initModal() {
	switch (props.propsData.drawerType) {
		case 'add':
			break;
		case 'edit':
			{
				console.log(props.propsData.row);
				TreeForm.value.treeName = props.propsData.row.treeName;
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

const sumbmitLoading = ref(false);
// 编辑
async function sumbmitFun() {
	sumbmitLoading.value = true;
	if (!ruleFormRef.value) {
		sumbmitLoading.value = false;
		return;
	}
	await ruleFormRef.value.validate((valid) => {
		if (valid) {
			if (props.propsData.drawerType === 'add') {
				postArticletreetreeadd(TreeForm.value).then((result) => {
					if (result.data.status === 1) {
						ElMessage.success('add success!');
						sumbmitLoading.value = false;
						handleCancel();
					}
				});
			} else {
				// postArticletagstagsedit({ treeName: TreeForm.value.treeName, id: props.propsData.row.id }).then((result) => {
				// 	if (result.data.status === 1) {
				// 		ElMessage.success('edit Tag success!');
				// 		handleCancel();
				// 	}
				// });
				sumbmitLoading.value = false;
			}
		} else {
			sumbmitLoading.value = false;
			ElMessage.error('Please fill out the form according to the prompts!');
		}
	});
}

// 关闭弹窗
function handleCancel() {
	dialogVisible.value = false;
	emits('close');
}

const articleTagsLoading = ref(false);

// 文章树远程检索
const articleTreeList = ref<AT_ArticleTreeArticleTreeNameQueryResponse[]>([]);
function articleTreeListRemoteMethod(name: string) {
	articleTagsLoading.value = true;
	if (name === '') return;
	postArticletreearticletreenamequery({
		pageIndex: 1,
		pageSize: 10,
		articleTreeName: name,
	})
		.then((result) => {
			articleTreeList.value = result.data.content.arr;
		})
		.finally(() => {
			articleTagsLoading.value = false;
		});
}
</script>
