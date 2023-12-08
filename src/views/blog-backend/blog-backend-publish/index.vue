<!-- blog后台-发布页 -->
<template>
	<div class="article-publish-page px-3">
		<el-form ref="ruleFormRef" :model="pageFormData" :rules="formRules" label-position="top" size="small" status-icon>
			<el-form-item label="文章标题" prop="title">
				<el-input v-model="pageFormData.title" />
			</el-form-item>
			<el-row span="24" gutter="20">
				<el-col :span="5">
					<el-form-item label="发布人" prop="publisher">
						<el-input v-model="pageFormData.authorName" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="发布时间" prop="publishTime">
						<el-input v-model="pageFormData.publishTime" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="文章标签" prop="articleTags">
						<el-select
							v-model="pageFormData.articleTags"
							multiple
							filterable
							remote
							reserve-keyword
							placeholder="Please enter a keyword"
							:remote-method="articleTagsRemoteMethod"
							:loading="articleTagsLoading"
						>
							<el-option v-for="item in articleTagsList" :key="item.id" :label="item.tag_name" :value="item.id" />
						</el-select>
					</el-form-item>
					<el-form-item label="文章树" prop="articleTags">
						<el-select
							v-model="pageFormData.articleTreeId"
							filterable
							remote
							reserve-keyword
							placeholder="Please enter a keyword"
							:remote-method="articleTreeListRemoteMethod"
							:loading="articleTagsLoading"
						>
							<el-option v-for="item in articleTreeList" :key="item.id" :label="item.article_tree_name" :value="item.id" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="md-box">
				<CherryMarkdown ref="mdEditor" :default-content="pageFormData.content" :display-toc="false"> </CherryMarkdown>
			</div>
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

defineOptions({
	name: 'BlogBackendPublish',
});
const pageFormData = ref({
	title: '温州皮革厂倒闭了',
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

const ruleFormRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
	title: [
		{ required: true, message: '请填写文章标题', trigger: 'blur' },
		{ max: 100, message: '最大输入100字', trigger: 'blur' },
	],
	category: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
});

const mdEditor = ref();

// 存草稿
function sumbmitDraftFun() {
	// mdEditor.value.unmount();
}

// 发布
async function sumbmitFun() {
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid, fields) => {
		if (valid) {
			pageFormData.value.content = mdEditor.value.cherry.getMarkdown();
			pageFormData.value.contentHTML = mdEditor.value.cherry.getHtml();
			postBlogbackstagearticleadd(pageFormData.value).then((result) => {
				console.log('===result===', result);
				ElMessage.success('提交成功');
			});
		} else {
			ElMessage.error('error submit!' + fields);
		}
	});
}
</script>

<style lang="scss" scoped>
.article-publish-page {
	// --el-color-primary: blue;
	@include useBlobTheme {
		--el-text-color-regular: getBlobVar('bgColor');
	}
	// }
	:deep(.el-input__inner) {
		color: getBlobVar('bgColor');
	}
	:deep(.el-button) {
		color: getBlobVar('bgColor');
	}
}
</style>
