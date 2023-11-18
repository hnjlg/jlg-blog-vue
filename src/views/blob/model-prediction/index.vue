<template>
	<div class="model-prediction-container">
		<el-form ref="formRef" :model="modelPrediction" :rules="rules" label-width="120px" label-position="top" class="form">
			<el-form-item label="上下文" prop="context">
				<el-input v-model="modelPrediction.context" placeholder="Please input context" clearable />
			</el-form-item>
			<el-form-item label="方面词" prop="aspectTerm">
				<el-input v-model="modelPrediction.aspectTerm" placeholder="Please input aspectTerm" clearable />
			</el-form-item>
			<el-form-item label="图像" prop="image">
				<el-upload
					v-model:file-list="modelPrediction.image"
					action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
					multiple
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:before-remove="beforeRemove"
					:limit="1"
					:on-exceed="handleExceed"
				>
					<el-button>Click to upload</el-button>
					<template #tip>
						<div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
					</template>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button @click="registerHandle">预测</el-button>
				<el-button @click="resetHandle">重置</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" style="width: 100%" max-height="300">
			<el-table-column fixed prop="context" label="样本" min-width="300" />
			<el-table-column prop="result" label="预测结果" min-width="120" />
			<el-table-column prop="createTime" label="时间" min-width="120" />
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-button link type="danger" @click="deleteRow(scope)"> Remove </el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :total="1000" />
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules, RuleForm } from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus';

defineOptions({
	name: 'ModelPrediction',
});

const formRef = ref<FormInstance>();

const modelPrediction = ref<{
	context: string;
	aspectTerm: string;
	image: UploadUserFile[];
}>({});

const tableData = ref([
	{ context: 'content1', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content2', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content3', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content3', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
	{ context: 'content3333', result: '积极', createTime: '2023-11-18T08:22:35.000+00:00' },
]);

const currentPage = ref<number>(10);

const rules = ref<FormRules<RuleForm>>({
	context: [{ required: true, message: 'Please input context', trigger: 'blur' }],
	aspectTerm: [{ required: true, message: 'Please input aspectTerm', trigger: 'blur' }],
	image: [{ required: true, message: 'Please upload image', trigger: 'blur' }],
});

const resetHandle = () => {
	modelPrediction.value = {};
};

const registerHandle = () => {};

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
	console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
	console.log(uploadFile);
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
	ElMessage.warning(`The limit is 1, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`);
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile) => {
	return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
		() => true,
		() => false
	);
};

const deleteRow = () => {};
</script>

<style lang="scss" scoped>
.model-prediction-container {
	.el-pagination {
		float: right;
	}
}
</style>
