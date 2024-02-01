<!-- 目录管理 - 文章树-->
<template>
	<div class="page-header">
		<el-input v-model="query" class="input-with-select" placeholder="Please input keyword" clearable @input="onQueryChanged">
			<template #prepend>
				<el-button :icon="Search" @click="initPage" />
			</template>
		</el-input>
		<el-button type="primary" @click="addFun">新增</el-button>
	</div>
	<el-tree
		ref="treeRef"
		class="page-content my-4"
		:data="pageData"
		:props="{
			children: 'children',
			label: 'label',
			value: 'id',
		}"
		:highlight-current="true"
		:filter-node-method="filterMethod"
		draggable
		:allow-drop="allowDrop"
		@node-click="handleNodeClick"
	>
		<template #default="{ data }">
			<div class="w-full flex justify-between items-center">
				<div>{{ data.label }}</div>
				<div class="w-10 mr-4 flex justify-around items-baseline">
					<el-icon style="color: var(--el-color-primary)" @click.stop="editFun(data)"><EditPen /></el-icon>
					<el-icon style="color: var(--el-color-danger)" @click.stop="deleteFun"><Delete /></el-icon>
				</div>
			</div>
		</template>
	</el-tree>
	<div class="pagination-box flex justify-end align-center mt-2">
		<el-button type="primary" plain @click="saveFun">保存</el-button>
		<div class="pagination-box-refresh my-auto cursor-pointer ml-2">
			<el-icon @click="initPage"><Refresh /></el-icon>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';
import { postBlogarticletreeallquery, AT_ArticleTreeTable, postArticletreebyIddelete } from '@/apiType/production/result';
import { pageLoading } from '@/views/blog-backend/home/hooks/variable';
import { Delete, EditPen, Search } from '@element-plus/icons-vue';
import drawer from '@/mixin/drawer';
import { TreeNode } from 'element-plus';
import type { ElTreeV2 } from 'element-plus';
import { TreeNodeData } from 'element-plus/es/components/tree-v2/src/types';

defineOptions({
	name: 'TreeManagement',
});

// 没处理过的表格数据
const UnprocessedList = ref<AT_ArticleTreeTable[]>([]);
// 初始请求表格内容
function initPage() {
	pageLoading.value = true;
	postBlogarticletreeallquery()
		.then((result) => {
			if (result.data.status === 1) {
				UnprocessedList.value = result.data.content;
				pageData.value = buildTree(result.data.content);
			}
		})
		.finally(() => {
			pageLoading.value = false;
		});
}
initPage();

const pageData = ref<AT_ArticleTreeTable[]>([]);

// 构造树函数
function buildTree(nodes: AT_ArticleTreeTable[]): AT_ArticleTreeTable[] {
	const tree: any[] = [];
	const map: { [k: number | string]: AT_ArticleTreeTable } = {};

	nodes.forEach((node) => {
		map[node.id] = { label: node.article_tree_name, children: [], id: node.id };
	});

	nodes.forEach((node) => {
		if (node.parent_article_tree_id !== null) {
			map[node.parent_article_tree_id].children.push(map[node.id]);
		} else {
			tree.push(map[node.id]);
		}
	});
	return tree;
}

function handleNodeClick(data: TreeNodeData, node: TreeNode, e: MouseEvent) {
	console.log(data, node, e);
}

const treeRef = ref<InstanceType<typeof ElTreeV2>>();

const query = ref('');
const onQueryChanged = (query: string) => {
	treeRef.value!.filter(query);
};

const filterMethod = (query: string, node: TreeNode) => {
	if (!query) return true;
	return node.label!.includes(query);
};

function addFun() {
	drawer({
		drawerKey: 'AddTree',
		drawerTitle: '新增目录',
		option: {},
		drawerType: 'add',
		drawerSize: '40%',
	}).then(() => {
		initPage();
	});
}

function editFun(data: AT_ArticleTreeTable) {
	console.log('edit', data);
	drawer({
		drawerKey: 'AddTree',
		drawerTitle: '编辑目录',
		option: {
			data: data,
			parent: UnprocessedList.value.find(
				(item) => item.id === Number(UnprocessedList.value.find((item) => item.id === data.id)?.parent_article_tree_id)
			),
		},
		drawerType: 'edit',
		drawerSize: '40%',
	}).then(() => {
		initPage();
	});
}

function deleteFun() {
	ElMessageBox.confirm('Are you sure to delete this Tree?', 'Warning', {
		confirmButtonText: 'I am true!',
		cancelButtonText: 'NO,I will think about it again',
		type: 'warning',
		closeOnClickModal: false,
	})
		.then(() => {
			postArticletreebyIddelete({
				article_tree_id: 1,
			}).then((result) => {
				if (result.data.status === 1) {
					console.log('======');
				}
			});
		})
		.catch(() => {
			ElMessage.info('Delete canceled');
			pageLoading.value = false;
		});
}

function saveFun() {
	console.log('===调整后的树结构===', pageData.value);
}

function allowDrop(draggingNode: any, dropNode: any, type: any) {
	console.log('======', draggingNode, dropNode, type);
	if (draggingNode.data.id === dropNode.data.id) return false;
	return true;
}
</script>
<style lang="scss" scoped>
.page-header {
	margin-bottom: 20px;
	.input-with-select {
		width: 300px;
		margin-right: 20px;
	}
}
.page-content {
	:deep(.el-tree-node__content) {
		height: 2.5rem;
	}
}
</style>
