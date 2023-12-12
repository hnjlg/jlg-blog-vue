<!-- blog后台-发布页 -->
<template>
	<div class="article-publish-page px-3">
		<el-form ref="ruleFormRef" :model="pageFormData" :rules="formRules" label-position="top" size="small" status-icon>
			<el-form-item label="article title" prop="title">
				<el-input v-model="pageFormData.title" />
			</el-form-item>
			<el-row span="24" gutter="20">
				<el-col :span="5">
					<el-form-item label="author" prop="authorName">
						<el-input v-model="pageFormData.authorName" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="article tags" prop="articleTags">
						<el-select
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
					<el-form-item label="article tree" prop="articleTreeId">
						<el-select
							v-model="pageFormData.articleTreeId"
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
							<CherryMarkdown ref="mdEditor" :default-content="pageFormData.content" :display-toc="false"> </CherryMarkdown>
						</div>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="btn-box text-right">
				<el-button @click="sumbmitDraftFun">存草稿</el-button>
				<el-button @click="sumbmitFun">发布</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import CherryMarkdown from '@/components/cherry-markdown/index.vue';
import { FormInstance, FormRules } from 'element-plus';
import { postBlogbackstagearticleadd } from '@/apiType/production/result.ts';
import { articleTagsLoading, articleTagsRemoteMethod, articleTagsList, articleTreeListRemoteMethod, articleTreeList } from './hooks/useForm';
import useBlogBackendStore from '@/store/blog-backend';
import { useRouter } from 'vue-router';
import { pageLoading } from '../home/hooks/variable';

defineOptions({
	name: 'BlogBackendPublish',
});

const pageFormData = ref({
	title: null,
	content: null,
	contentHTML: null,
	author: null,
	authorName: null,
	articleTreeId: null,
	articleTags: null,
});

const blogBackendStore = useBlogBackendStore();
pageFormData.value.author = blogBackendStore.$state.userInfo.id;
pageFormData.value.authorName = blogBackendStore.$state.userInfo.userName;

function initPage() {
	console.log('initPage');
	setTimeout(() => {
		pageLoading.value = false;
	}, 2000);
}
initPage();

const ruleFormRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
	title: [
		{ required: true, message: 'Please fill in the article title', trigger: 'blur' },
		{ min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
	],
	articleTags: [{ required: true, message: 'Please fill in the article tags', trigger: 'blur' }],
	articleTreeId: [{ required: true, message: 'Please fill in the article tree', trigger: 'blur' }],
	content: [
		{ required: true, message: 'Please fill in the article content', trigger: 'blur' },
		{ min: 100, message: 'Input at least 100 words', trigger: 'blur' },
	],
});

const mdEditor = ref();
const router = useRouter();

// 存草稿
function sumbmitDraftFun() {
	// mdEditor.value.unmount();
}

// 发布
async function sumbmitFun() {
	pageFormData.value.content = mdEditor.value.cherry.getMarkdown();
	pageFormData.value.contentHTML = mdEditor.value.cherry.getHtml();
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid) => {
		if (valid) {
			postBlogbackstagearticleadd(pageFormData.value).then((result) => {
				console.log('===result===', result);
				ElMessage.success('submit success!');
				router.push({
					name: 'BlogArticleAll',
					meta: {
						keepAlive: false,
						isInitLoading: true,
						systemPage: true,
					},
				});
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
