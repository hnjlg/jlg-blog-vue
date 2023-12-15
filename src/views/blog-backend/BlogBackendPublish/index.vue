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
			:disabled="$route.query.pageType !== 'add' && $route.query.pageType !== 'edit'"
		>
			<el-form-item label="article title" prop="title">
				<el-input v-model="pageFormData.title" clearable resize />
			</el-form-item>
			<el-row span="24" gutter="20">
				<el-col :span="5">
					<el-form-item label="author" prop="authorName">
						<el-input v-if="$route.query.pageType === 'view'" v-model="pageFormData.author_name"></el-input>
						<el-input v-else v-model="pageFormData.authorName" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="article tags" prop="articleTags">
						<el-input v-if="$route.query.pageType === 'view'" v-model="pageFormData.tags"></el-input>
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
						<el-input v-if="$route.query.pageType === 'view'" v-model="pageFormData.article_tree_name"></el-input>
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
						<div class="md-box">
							<MarkDownShow v-if="$route.query.pageType === 'view'" :content="pageFormData.contentHTML"></MarkDownShow>
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
} from '@/apiType/production/result.ts';
import { articleTagsLoading, articleTagsRemoteMethod, articleTagsList, articleTreeListRemoteMethod, articleTreeList } from './hooks/useForm';
import useBlogBackendStore from '@/store/blog-backend';
import { pageLoading } from '../home/hooks/variable';
import router from '@/router';
import { onActivated } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
	name: 'BlogBackendPublish',
});

const pageFormData = ref({
	title: null,
	content: '',
	content_html: '',
	author: null,
	authorName: null,
	article_tree_id: null,
	articleTags: null,
});

const blogBackendStore = useBlogBackendStore();
pageFormData.value.author = blogBackendStore.$state.userInfo.id;
pageFormData.value.authorName = blogBackendStore.$state.userInfo.user_name;

const route = useRoute();

function initPage() {
	switch (route.query.pageType) {
		case 'add':
			{
				pageLoading.value = false;
			}
			break;
		case 'edit':
			{
				getInitData();
				pageLoading.value = false;
			}
			break;
		case 'view':
			{
				getInitData();
				pageLoading.value = false;
			}
			break;
		default:
			pageLoading.value = false;
			break;
	}
}
initPage();

function getInitData() {
	return new Promise<void>((resolve, reject) => {
		if (!route.query.id) {
			ElMessage.error('参数错误!');
			reject();
		}
		postBlogbackstagearticlequeryforarticleId({ articleId: Number(route.query.id) }).then((result) => {
			pageFormData.value = result.data.content;
			pageFormData.value.contentHTML = pageFormData.value.content_html;
			// articleTagsRemoteMethod(pageFormData.value.tags);
			// articleTreeListRemoteMethod(pageFormData.value.article_tree_name);
			resolve();
		});
	});
}

onActivated(() => {
	pageLoading.value = false;
});

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
	pageFormData.value.contentHTML = mdEditor.value.cherry.getHtml();
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid) => {
		if (valid) {
			postBlogbackstagearticledraftadd(pageFormData.value).then(() => {
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
		if (valid) {
			postBlogbackstagearticleadd(pageFormData.value).then(() => {
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
