<template>
	<div class="article-publish-page px-3">
		<el-form ref="ruleFormRef" :model="pageFormData" :rules="formRules" label-position="top" size="small" status-icon>
			<el-form-item label="文章标题" prop="title">
				<el-input v-model="pageFormData.title" />
			</el-form-item>
			<el-row span="24" gutter="20">
				<el-col :span="5">
					<el-form-item label="发布人" prop="publisher">
						<el-input v-model="pageFormData.publisher" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="发布时间" prop="publishTime">
						<el-input v-model="pageFormData.publishTime" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="文章分类" prop="category">
						<el-select v-model="pageFormData.category" placeholder="Select" clearable>
							<el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="md-box">
				<CherryMarkdown ref="mdEditor" :default-content="pageFormData.content" :display-toc="false"> </CherryMarkdown>
			</div>
			<!-- <el-row span="24" gutter="20">
				<el-col :offset="18">
					<el-button @click="sumbmitDraftFun">存草稿</el-button>
					<el-button @click="sumbmitFun">发布</el-button>
				</el-col>
			</el-row> -->
			<div class="btn-box text-right">
				<el-button @click="sumbmitDraftFun">存草稿</el-button>
				<el-button @click="sumbmitFun">发布</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import CherryMarkdown from '@/components/cherry-markdown/index.vue';
import { E_ArticleStatus } from '@/utils/enum';
import { FormInstance, FormRules } from 'element-plus';

defineOptions({
	name: 'ArticlePublish',
});

const pageFormData = ref({
	title: '温州皮革厂倒闭了',
	content: null,
	publisher: '马冬梅',
	category: null,
	status: E_ArticleStatus.未发布,
	updateTime: '更新时间',
	publishTime: String(new Date()),
});

const ruleFormRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
	title: [
		{ required: true, message: '请填写文章标题', trigger: 'blur' },
		{ max: 100, message: '最大输入100字', trigger: 'blur' },
	],
	category: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
});

const categoryOptions = ref([
	{ label: '丰恺思项目', value: 1 },
	{ label: 'OA项目', value: 2 },
	{ label: '大平台项目', value: 3 },
]);

const mdEditor = ref();

// 存草稿
function sumbmitDraftFun() {
	// mdEditor.value.unmount();
}

// 发布
async function sumbmitFun() {
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid, fields) => {
		console.log('======', valid);
		if (valid) {
			ElMessage.success('校验成功');
		} else {
			ElMessage.error('error submit!' + fields);
		}
	});

	pageFormData.value.content = mdEditor.value.cherry.getMarkdown();
	console.log('===pageFormData===', pageFormData.value);
	console.log('===mdEditor===', mdEditor.value.cherry.getMarkdown());
}
</script>

<style lang="scss" scoped>
.article-publish-page {
	// --el-color-primary: blue;
	@include useBlobTheme {
		--el-text-color-regular: getBlobVar('bgColor');
	}
	// .md-box {
	// 	height: 600px;
	// }
	:deep(.el-input__inner) {
		color: getBlobVar('bgColor');
	}
	:deep(.el-button) {
		color: getBlobVar('bgColor');
	}
}
</style>
