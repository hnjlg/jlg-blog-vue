<!-- 文章树 新增/编辑 - 组件 -->
<template>
	<el-form ref="ruleFormRef" :model="TreeForm" :rules="rules" label-position="top" size="small" status-icon>
		<el-form-item label="文章树名称" prop="treeName">
			<el-input v-model="TreeForm.treeName" placeholder="Please input treeName" clearable />
		</el-form-item>
		<el-form-item label="父级文章树" prop="parentId">
			<el-select
				v-model="TreeForm.parentId"
				filterable
				remote
				reserve-keyword
				collapse-tags
				collapse-tags-tooltip
				placeholder="Please enter a word"
				:remote-method="articleTreeListRemoteMethod"
				:loading="articleTagsLoading"
				style="width: 100%"
			>
				<el-option :key="defaultParentId" :label="defaultParentLabel" :value="defaultParentId" />
				<el-option v-for="item in articleTreeList" :key="item.id" :label="item.article_tree_name" :value="item.id" :disabled="item.disabled" />
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
	postArticletreearticletreeidupdate,
} from '@/apiType/production/result.ts';
import { ref } from 'vue';
defineOptions({
	name: 'AddTree',
});
const defaultParentId = ref<number | null>(null);
const defaultParentLabel = ref<string | null>('');
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
// 记录所有 当前 以下的后代
const unSelectedList: any = [];
const recursion = (data: any) => {
	unSelectedList.push(data.id);
	data.children.forEach((item) => {
		recursion(item);
	});
};
async function initModal() {
	switch (props.propsData.drawerType) {
		case 'add':
			break;
		case 'edit':
			{
				TreeForm.value.treeName = props.propsData.data.label;
				defaultParentLabel.value = props.propsData.parent.article_tree_name;
				defaultParentId.value = props.propsData.parent.article_tree_id;
				TreeForm.value.parentId = props.propsData.parent.article_tree_id;
				recursion(props.propsData.data);
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
				postArticletreearticletreeidupdate({
					id: props.propsData.data.id,
					article_tree_name: TreeForm.value.treeName,
					parent_article_tree_id: TreeForm.value.parentId,
				}).then((result) => {
					if (result.data.status === 1) {
						ElMessage.success('edit Tag success!');
						handleCancel();
					}
				});
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
			articleTreeList.value = result.data.content.arr.map((item) => {
				if (unSelectedList.includes(item.id)) {
					item.disabled = true;
				}
				return item;
			});
		})
		.finally(() => {
			articleTagsLoading.value = false;
		});
}
</script>
