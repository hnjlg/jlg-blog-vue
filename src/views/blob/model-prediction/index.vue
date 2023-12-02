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
				<el-upload v-model:file-list="modelPrediction.image" :auto-upload="false" :on-change="handleChange" multiple drag>
					<el-button>Click to upload</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button v-loading="submitLoading" @click="registerHandle">预测</el-button>
				<el-button @click="resetHandle">重置</el-button>
			</el-form-item>
		</el-form>
		<div class="model-prediction-table-container">
			<el-popover placement="left" :width="300" :visible="visible">
				<template #reference>
					<el-icon class="model-prediction-table-search" @click="visible = !visible"><Search /></el-icon>
				</template>
				<el-form ref="formRef" :model="searchForm" label-width="120px" label-position="top">
					<el-form-item label="上下文" prop="context">
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
				<el-table-column fixed prop="context" label="上下文" min-width="200" />
				<el-table-column fixed prop="aspectTerm" label="方面词" min-width="200" />

				<el-table-column prop="image" label="图像" min-wdith="120">
					<template #default="scope">
						<el-image
							v-for="(image, index) in scope.row.image.split(',')"
							:key="index"
							:src="image"
							:zoom-rate="1.2"
							:max-scale="7"
							:min-scale="0.2"
							:preview-src-list="scope.row.image.split(',')"
							:initial-index="4"
							fit="cover"
							:preview-teleported="true"
						/>
					</template>
				</el-table-column>
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
			<el-dialog v-model="dialogTableVisible" title="">
				<h1>预测结果：{{ dialogData.outputs }}</h1>
			</el-dialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import type { FormInstance, FormRules, UploadProps } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { I_ModelModel, blobModelInsert, blobModelQuery, blobModelDelete } from '@/api/blob';
import { pageLoading } from '@/views/blob/home/hooks/useBlobPageLoading';
import useBlobStore from '@/store/blob';
import router from '@/router';

defineOptions({
	name: 'ModelPrediction',
});

const formRef = ref<FormInstance>();

const blobStore = useBlobStore();

const dialogTableVisible = ref(false);

const dialogData = ref({});

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
const searchForm = ref<Partial<I_ModelModel>>({
	userId: blobStore.$state.userInfo?.id,
});

const rules = ref<FormRules>({
	context: [{ required: true, message: 'Please input context', trigger: 'blur' }],
	aspectTerm: [{ required: true, message: 'Please input aspectTerm', trigger: 'blur' }],
	image: [{ required: true, message: 'Please upload image', trigger: 'blur' }],
});

const resetHandle = () => {
	modelPrediction.value = { context: '', aspectTerm: '', image: [] };
};

const submitLoading = ref<boolean>(false);

const registerHandle = () => {
	const formData = new FormData();
	modelPrediction.value.image.map((item) => {
		formData.append('image_files', item.raw);
	});
	formData.append('text_raw', modelPrediction.value.context);
	formData.append('text_aspect', modelPrediction.value.aspectTerm);
	formRef.value?.validate((valid) => {
		if (valid) {
			submitLoading.value = true;
			fetch('http://127.0.0.1:5000/predict', {
				method: 'POST',
				body: formData,
			})
				.then((res) => {
					res.json().then((resJson) => {
						dialogTableVisible.value = true;
						resJson.image_urls = resJson.image_urls.map((item) => 'http://localhost:5000' + item);
						dialogData.value = resJson;
						resetHandle();
						if (blobStore.$state.userInfo?.id) {
							blobModelInsert({
								userId: blobStore.$state.userInfo?.id,
								context: modelPrediction.value.context,
								aspectTerm: modelPrediction.value.aspectTerm,
								image: resJson.image_urls.join(','),
								result: resJson.outputs,
							}).then(() => {
								refreshTableData();
							});
						} else {
							ElMessage.error('useId not found');
							router.push('blob-login');
						}
					});
				})
				.catch(() => {
					ElMessage.error('分析错误');
				})
				.finally(() => {
					submitLoading.value = false;
				});
		} else {
			ElMessage.warning('Please enter the correct content as prompted');
		}
	});
};

const deleteRow = (_index: number, row: I_ModelModel) => {
	pageLoading.value = true;
	blobModelDelete(row).then(() => {
		pageLoading.value = false;
		ElMessage.success('Remove Success');
		refreshTableData();
	});
};

const refreshTableData = () => {
	pageLoading.value = true;
	blobModelQuery(currentPage.value, pageSize.value, searchForm.value)
		.then((res) => {
			tableData.value = res.data.data.records.reverse();
			paginationTotal.value = res.data.data.records.length;
			ElMessage.success('Refresh Success');
			pageLoading.value = false;
		})
		.catch(() => {
			pageLoading.value = false;
		});
};

const searchResetHandle = () => {
	searchForm.value = { userId: blobStore.$state.userInfo?.id };
	refreshTableData();
};

const searchHandle = () => {
	visible.value = false;
	refreshTableData();
};

onMounted(() => {
	refreshTableData();
});

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
	console.log(uploadFile, uploadFiles);
	// modelPrediction.image = uploadFiles.push(uploadFile.raw);
};
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
			@include useBlobTheme {
				color: getVar('textColor');
				background-color: getVar('bgColor');
			}

			:deep(thead) {
				@include useBlobTheme {
					color: getVar('textColor');
				}
			}

			:deep(th.el-table__cell) {
				@include useBlobTheme {
					background-color: getVar('bgColor');
				}
			}

			:deep(tr) {
				@include useBlobTheme {
					background-color: getVar('bgColor');
				}
			}
			:deep(.el-table__body tr.hover-row > td.el-table__cell) {
				@include useBlobTheme {
					background-color: getVar('textColor');
					color: getVar('bgColor');
				}
			}
		}

		:deep(.el-pagination__total) {
			@include useBlobTheme {
				color: getVar('textColor');
			}
		}

		:deep(.el-pagination__jump) {
			@include useBlobTheme {
				color: getVar('textColor');
			}
		}
	}
}
</style>
