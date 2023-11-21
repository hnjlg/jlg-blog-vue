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
		<div class="model-prediction-table-container">
			<el-popover placement="left" :width="300" :visible="visible">
				<template #reference>
					<el-icon class="model-prediction-table-search" @click="visible = !visible"><Search /></el-icon>
				</template>
				<el-form ref="formRef" :model="searchForm" label-width="120px" label-position="top">
					<el-form-item label="样本" prop="context">
						<el-input v-model="searchForm.context" placeholder="Please input context" clearable />
					</el-form-item>
					<el-form-item label="预测结果" prop="result">
						<el-input v-model="searchForm.result" placeholder="Please input result" clearable />
					</el-form-item>
					<el-form-item>
						<el-button @click="searchResetHandle">Reset</el-button>
						<el-button @click="searchHandle">Search</el-button>
					</el-form-item>
				</el-form>
			</el-popover>
			<el-table :data="tableData" style="width: 100%" max-height="300" class="model-prediction-table">
				<el-table-column fixed prop="context" label="样本" min-width="300" />
				<el-table-column prop="result" label="预测结果" min-width="120" />
				<el-table-column prop="createTime" label="时间" min-width="120" />
				<el-table-column fixed="right" label="操作" width="120">
					<template #default="scope">
						<el-button link type="danger" @click="deleteRow(scope.$index, scope.row)"> Remove </el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="[10, 30, 50, 100]"
				background
				layout="prev, pager, next, sizes, jumper, total"
				:total="paginationTotal"
				@size-change="refreshTableData"
				@current-change="refreshTableData"
				@prev-click="refreshTableData"
				@next-click="refreshTableData"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { I_ModelModel, blobModelQuery } from '@/api/blob';
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';

defineOptions({
	name: 'ModelPrediction',
});

const formRef = ref<FormInstance>();

const modelPrediction = ref<{
	context: string;
	aspectTerm: string;
	image: UploadUserFile[];
}>({ context: '', aspectTerm: '', image: [] });

const tableData = ref<I_ModelModel[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const paginationTotal = ref<number>(0);
const visible = ref<boolean>(false);
const searchForm = ref<Partial<I_ModelModel>>({});

const rules = ref<FormRules>({
	context: [{ required: true, message: 'Please input context', trigger: 'blur' }],
	aspectTerm: [{ required: true, message: 'Please input aspectTerm', trigger: 'blur' }],
	image: [{ required: true, message: 'Please upload image', trigger: 'blur' }],
});

const resetHandle = () => {
	modelPrediction.value = { context: 'context', aspectTerm: '', image: [] };
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

const deleteRow = (index: number, row: I_ModelModel) => {
	console.log(index, row);
};

const refreshTableData = () => {
	pageLoading.value = true;
	blobModelQuery(currentPage.value, pageSize.value)
		.then((res) => {
			tableData.value = res.data.data.records;
			paginationTotal.value = res.data.data.records.length;
			ElMessage.success('Refresh Success');
			pageLoading.value = false;
		})
		.catch(() => {
			pageLoading.value = false;
		});
};

const searchResetHandle = () => {
	searchForm.value = {};
	refreshTableData();
};

const searchHandle = () => {
	visible.value = false;
	refreshTableData();
};

onMounted(() => {
	refreshTableData();
});
</script>

<style lang="scss" scoped>
.model-prediction-container {
	display: flex;
	flex-direction: column;
	.model-prediction-table-container {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		flex: 1;

		.model-prediction-table-search {
			cursor: pointer;
		}

		.model-prediction-table {
			flex: 1;
		}
	}
}
</style>
