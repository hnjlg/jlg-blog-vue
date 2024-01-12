<!-- 文章编辑组件 -->
<template>
	<el-form
		ref="ruleFormRef"
		:model="pageFormData"
		:rules="formRules"
		label-position="top"
		size="small"
		status-icon
		:disabled="props.propsData.drawerType === 'view'"
	>
		<el-form-item label="article title" prop="title">
			<el-input v-model="pageFormData.title" clearable resize :disabled="props.propsData.drawerType === 'view'" />
		</el-form-item>
		<el-row span="24" gutter="20">
			<el-col :span="5">
				<el-form-item label="author" prop="authorName">
					<el-input v-model="pageFormData.author_name" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="article tags" prop="articleTags">
					<el-input v-if="props.propsData.drawerType === 'view' && 'tags' in pageFormData" :value="pageFormData.tag_names" disabled></el-input>
					<el-select
						v-else
						v-model="pageFormData.articleTags"
						multiple
						filterable
						remote
						reserve-keyword
						placeholder="Please enter a keyword"
						collapse-tags
						collapse-tags-tooltip
						:remote-method="articleTagsRemoteMethod"
						:loading="articleTagsLoading"
					>
						<el-option v-for="item in articleTagsList" :key="item.id" :label="item.tag_name" :value="item.id" />
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="article tree" prop="article_tree_id">
					<el-input
						v-if="props.propsData.drawerType === 'view' && 'article_tree_name' in pageFormData"
						:value="pageFormData.article_tree_name"
						disabled
					></el-input>
					<el-select
						v-else
						v-model="pageFormData.article_tree_id"
						filterable
						remote
						reserve-keyword
						collapse-tags
						collapse-tags-tooltip
						placeholder="Please enter a keyword"
						:remote-method="articleTreeListRemoteMethod"
						:loading="articleTagsLoading"
					>
						<el-option v-for="item in articleTreeList" :key="item.id" :label="item.article_tree_name" :value="item.id" />
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-form-item label="article content" prop="content">
					<div class="md-box flex-1">
						<MarkDownShow v-if="props.propsData.drawerType === 'view'" :content="pageFormData.content_html"></MarkDownShow>
						<CherryMarkdown v-else ref="mdEditor" :default-content="pageFormData.content" :display-toc="false"> </CherryMarkdown>
					</div>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
	<div v-if="props.propsData.drawerType === 'add' || props.propsData.drawerType === 'edit'" class="btn-box text-right">
		<el-button @click="handleCancel">取消</el-button>
		<el-button v-if="props.propsData.drawerType === 'add'" type="primary" plain @click="sumbmitDraftFun">存草稿</el-button>
		<el-button v-if="props.propsData.drawerType === 'edit'" @click="sumbmitEditFun">修改</el-button>
		<el-button v-if="props.propsData.drawerType === 'add'" type="primary" @click="sumbmitFun">发布</el-button>
	</div>
</template>

<script setup lang="ts">
import CherryMarkdown from '@/components/cherry-markdown/index.vue';
import MarkDownShow from '@/components/markdown-show/index.vue';
import { FormInstance, FormRules } from 'element-plus';
import {
	postBlogbackstagearticleadd,
	postBlogbackstagearticlequeryforarticleId,
	postBlogbackstagearticledraftadd,
	type AT_BlogBackstageArticleDraftAddRequest,
	type AT_BlogBackstageArticleQueryForArticleResponse,
	postBlogbackstagearticleedit,
	type AT_ArticleTreeArticleTreeNameQueryResponse,
	type AT_BlogTagsQueryResponse,
	postArticletreearticletreenamequery,
	postBlogtagsquery,
} from '@/apiType/production/result.ts';
import useBlogBackendStore from '@/store/blog-backend';
import { nextTick, reactive, ref } from 'vue';
defineOptions({
	name: 'ArticlePublish',
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
const emits = defineEmits(['cancel', 'submit']);

const blogBackendStore = useBlogBackendStore();
const pageFormData = ref<
	(Omit<AT_BlogBackstageArticleDraftAddRequest, 'article_tree_id'> & {
		article_tree_id: null | number;
	}) &
		(Omit<AT_BlogBackstageArticleQueryForArticleResponse, 'article_tree_id'> & {
			article_tree_id: null | number;
		})
>({
	id: -1,
	title: '',
	content: '',
	content_html: '',
	author: blogBackendStore.$state.userInfo.id,
	author_name: blogBackendStore.$state.userInfo.user_name,
	article_tree_id: null,
	articleTags: [],
	reading_quantity: 0,
	add_time: '',
	tag_names: '',
	tag_ids: '',
	tags: [],
	article_tree_name: '',
});
const mdEditor = ref();

async function initModal() {
	switch (props.propsData.drawerType) {
		case 'add':
			break;
		case 'edit':
			{
				await getInitData();
			}
			break;
		case 'view':
			{
				await getInitData();
			}
			break;
		default:
			break;
	}
}
initModal();

async function getInitData() {
	return new Promise<void>((resolve, reject) => {
		if (!props.propsData.id) {
			ElMessage.error('参数错误!');
			reject();
		}
		postBlogbackstagearticlequeryforarticleId({ articleId: Number(props.propsData.id) }).then((result) => {
			pageFormData.value = { ...pageFormData.value, ...result.data.content };
			nextTick(() => {
				mdEditor.value?.cherry.setMarkdown(pageFormData.value.content_html ?? '');
			});
			articleTagsList.value = result.data.content.tags.map((item) => {
				return {
					tag_name: item.label,
					id: item.value,
				};
			});
			pageFormData.value.articleTags = result.data.content.tags.map((item) => item.value);
			resolve();
		});
	});
}

const ruleFormRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
	title: [
		{ required: true, message: 'Please fill in the article title', trigger: 'blur' },
		{ min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
	],
	articleTags: [{ required: true, message: 'Please fill in the article tags', trigger: 'blur' }],
	article_tree_id: [{ required: true, message: 'Please fill in the article tree', trigger: 'blur' }],
	content: [
		{ required: true, message: 'Please fill in the article content', trigger: 'blur' },
		{ min: 100, message: 'Input at least 100 words', trigger: 'blur' },
	],
});

// 存草稿
async function sumbmitDraftFun() {
	pageFormData.value.content = mdEditor.value.cherry.getMarkdown();
	pageFormData.value.content_html = mdEditor.value.cherry.getHtml();
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid) => {
		if (valid && typeof pageFormData.value.article_tree_id === 'number' && 'articleTags' in pageFormData.value) {
			postBlogbackstagearticledraftadd({
				title: pageFormData.value.title,
				content: pageFormData.value.content,
				content_html: pageFormData.value.content_html,
				article_tree_id: pageFormData.value.article_tree_id,
				articleTags: pageFormData.value.articleTags,
			}).then(() => {
				ElMessage.success('submit success!');
				emits('submit', pageFormData.value);
			});
		} else {
			ElMessage.error('Please fill out the form according to the prompts!');
		}
	});
}

// 发布
async function sumbmitFun() {
	pageFormData.value.content = mdEditor.value.cherry.getMarkdown();
	pageFormData.value.content_html = mdEditor.value.cherry.getHtml();
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid) => {
		if (valid && typeof pageFormData.value.article_tree_id === 'number' && 'articleTags' in pageFormData.value) {
			postBlogbackstagearticleadd({
				title: pageFormData.value.title,
				content: pageFormData.value.content,
				content_html: pageFormData.value.content_html,
				article_tree_id: pageFormData.value.article_tree_id,
				articleTags: pageFormData.value.articleTags,
			}).then(() => {
				ElMessage.success('submit success!');
				emits('submit', pageFormData.value);
			});
		} else {
			ElMessage.error('Please fill out the form according to the prompts!');
		}
	});
}

// 编辑
async function sumbmitEditFun() {
	pageFormData.value.content = mdEditor.value.cherry.getMarkdown();
	pageFormData.value.content_html = mdEditor.value.cherry.getHtml();
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid) => {
		if (valid && typeof pageFormData.value.article_tree_id === 'number' && 'articleTags' in pageFormData.value) {
			postBlogbackstagearticleedit({
				title: pageFormData.value.title,
				articleId: Number(props.propsData.id),
				content: pageFormData.value.content,
				content_html: pageFormData.value.content_html,
				article_tree_id: pageFormData.value.article_tree_id,
				articleTags: pageFormData.value.articleTags ?? [],
			}).then((result) => {
				if (result.data.status === 1) {
					ElMessage.success('submit success!');
					emits('submit', pageFormData.value);
				}
			});
		} else {
			ElMessage.error('Please fill out the form according to the prompts!');
		}
	});
}

// 关闭弹窗
function handleCancel() {
	emits('cancel');
}

const articleTagsLoading = ref(false);

// 文章标签远程检索
const articleTagsList = ref<AT_BlogTagsQueryResponse[]>([]);
function articleTagsRemoteMethod(tagName: string) {
	articleTagsLoading.value = true;
	if (tagName === '') return;
	postBlogtagsquery({
		pageIndex: 1,
		pageSize: 10,
		tagName: tagName,
	})
		.then((result) => {
			articleTagsList.value = result.data.content.arr;
		})
		.finally(() => {
			articleTagsLoading.value = false;
		});
}

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
