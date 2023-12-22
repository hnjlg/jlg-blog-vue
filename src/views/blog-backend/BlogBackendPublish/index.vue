<!-- blog后台-发布页 -->
<template>
	<div class="article-publish-page px-3">
		<el-form
			ref="ruleFormRef"
			:model="pageFormData"
			:rules="formRules"
			label-position="top"
			size="small"
			status-icon
			:disabled="$route.query.pageTy === 'view'"
		>
			<el-form-item label="article title" prop="title">
				<el-input v-model="pageFormData.title" clearable resize />
			</el-form-item>
			<el-row span="24" gutter="20">
				<el-col :span="5">
					<el-form-item label="author" prop="authorName">
						<el-input v-model="pageFormData.author_name" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="article tags" prop="articleTags">
						<el-input v-if="$route.query.pageType === 'view' && 'tags' in pageFormData" :value="pageFormData.tags"></el-input>
						<el-select
							v-else-if="'articleTags' in pageFormData"
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
							v-if="$route.query.pageType === 'view' && 'article_tree_name' in pageFormData"
							:value="pageFormData.article_tree_name"
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
							<MarkDownShow v-if="$route.query.pageType === 'view'" :content="pageFormData.content_html"></MarkDownShow>
							<CherryMarkdown v-else ref="mdEditor" :default-content="pageFormData.content" :display-toc="false"> </CherryMarkdown>
						</div>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div v-if="$route.query.pageType === 'add' || $route.query.pageType === 'edit'" class="btn-box text-right">
			<el-button @click="sumbmitDraftFun">存草稿</el-button>
			<el-button @click="sumbmitFun">发布</el-button>
		</div>
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
	AT_BlogBackstageArticleDraftAddRequest,
	AT_BlogBackstageArticleQueryForArticleResponse,
} from '@/apiType/production/result.ts';
import { articleTagsLoading, articleTagsRemoteMethod, articleTagsList, articleTreeListRemoteMethod, articleTreeList } from './hooks/useForm';
import useBlogBackendStore from '@/store/blog-backend';
import { pageLoading } from '../home/hooks/variable';
import router from '@/router';
import { useRoute } from 'vue-router';

defineOptions({
	name: 'BlogBackendPublish',
});
const blogBackendStore = useBlogBackendStore();
const pageFormData = ref<
	| ((Omit<AT_BlogBackstageArticleDraftAddRequest, 'article_tree_id'> & { article_tree_id: number | null }) & {
			author_name: string;
	  })
	| AT_BlogBackstageArticleQueryForArticleResponse
>({
	title: '',
	content: '',
	content_html: '',
	author: blogBackendStore.$state.userInfo.id,
	author_name: '',
	article_tree_id: null,
	articleTags: [],
});

const route = useRoute();

async function initPage() {
	switch (route.query.pageType) {
		case 'add':
			break;
		case 'edit':
			{
				await getInitData();
				pageLoading.value = false;
			}
			break;
		case 'view':
			{
				await getInitData();
				pageLoading.value = false;
			}
			break;
		default:
			pageLoading.value = false;
			break;
	}
}
initPage();

async function getInitData() {
	return new Promise<void>((resolve, reject) => {
		if (!route.query.id) {
			ElMessage.error('参数错误!');
			reject();
		}
		postBlogbackstagearticlequeryforarticleId({ articleId: Number(route.query.id) }).then((result) => {
			pageFormData.value = result.data.content;
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

const mdEditor = ref();

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
				author: pageFormData.value.author,
			}).then(() => {
				ElMessage.success('submit success!');
				router.push('BlogArticleAll');
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
				author: pageFormData.value.author,
			}).then(() => {
				ElMessage.success('submit success!');
				router.push('BlogArticleAll');
			});
		} else {
			ElMessage.error('Please fill out the form according to the prompts!');
		}
	});
}
</script>

<style lang="scss" scoped>
.article-publish-page {
	// --el-color-primary: blue;
	// @include useBlobTheme {
	// 	--el-text-color-regular: getBlobVar('bgColor');
	// }
	// }
	// :deep(.el-input__inner) {
	// 	color: getBlobVar('bgColor');
	// }
	// :deep(.el-button) {
	// 	color: getBlobVar('bgColor');
	// }
}
</style>
