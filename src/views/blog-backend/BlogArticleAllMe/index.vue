<!-- blog后台-我的文章 -->
<template>
	<div class="blog-backend-page blog-backend-my-article-page">
		<!-- <div>
			<el-button type="primary">发布</el-button>
		</div> -->
		<div class="table-box">
			<simple-table
				:table-data="tableData"
				:field-list="tableCols"
				:operation-column-width="100"
				max-height="84vh"
				stripe
				border
				size="large"
				@dbclick:row="rowDbClick"
			>
				<template #operation-column="{ row }">
					<el-link type="primary" @click="editlFun(row)">编辑</el-link>
					<el-link type="error" @click="delFun(row)">删除</el-link>
				</template>
				<template #add-time="{ row }">{{ dayjs(String(row.add_time)).format('YYYY/MM/DD') }}</template>
				<template #status-name="{ row }">
					<el-dropdown trigger="contextmenu">
						<span>
							<el-tooltip effect="dark" content="右键修改" placement="right-start">
								<el-tag :type="statusCrossType(row)" :effect="row.status_value == 1 || row.status_value == 4 ? 'plain' : 'light'">
									{{ row.status_name }}
								</el-tag>
							</el-tooltip>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item v-for="(item, index) in StatusList" :key="index" :icon="CirclePlus" @click="editStatusFun(item, row)">
									{{ item.label }}
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</simple-table>
		</div>
		<div class="pagination-box flex justify-end align-center mt-2">
			<div class="pagination-box-pagi">
				<el-pagination
					v-model:current-page="paginationInfo.pageIndex"
					v-model:page-size="paginationInfo.pageSize"
					:page-sizes="[1, 10, 30, 50, 100]"
					layout=" prev, pager, next,jumper, sizes,total"
					:total="total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
			<div class="pagination-box-refresh my-auto cursor-pointer ml-2">
				<el-icon @click="restInitPage"><Refresh /></el-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Refresh, CirclePlus } from '@element-plus/icons-vue';
import { RouteLocationRaw } from 'vue-router';
import SimpleTable from '@/components/simple-table/index.vue';
import useTable from './hooks/useTable';
import router from '@/router';
import {
	type AT_BlogBackstageArticleQueryForAuthorResponse,
	type AT_SelectListItem,
	postBlogbackstagearticledelete,
	postBlogbackstagearticlequeryforauthor,
	postBlogbackstagearticlestatusallquery,
	postBlogbackstagearticletakeback,
	AT_ArticleStatus,
} from '@/apiType/production/result';
import { pageLoading } from '@/views/blog-backend/home/hooks/variable';
import useBlogBackendStore from '@/store/blog-backend';
import tablehook from '@/mixin/useTableHook';
import dayjs from 'dayjs';

defineOptions({
	name: 'BlogArticleAllMe',
});

const blogBackendStore = useBlogBackendStore();

/* 分页逻辑 */
const { paginationInfo, total, handleSizeChange, handleCurrentChange, restInitPage } = tablehook(initPage);

const { tableCols } = useTable();

const tableData = ref([]);
function initPage() {
	pageLoading.value = true;
	paginationInfo.value.author = blogBackendStore.$state.userInfo.id;
	postBlogbackstagearticlequeryforauthor(paginationInfo.value)
		.then((result) => {
			tableData.value = result.data.content.arr;
			total.value = result.data.content.total;
			pageLoading.value = false;
		})
		.catch(() => {
			pageLoading.value = false;
		});
}

initPage();

// 编辑
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function editlFun(row: { [K: string]: any }) {
	if (row.row.status_value === AT_ArticleStatus.待审) {
		ElMessage.warning('该文章正在审核中，无法编辑');
		return;
	}
	jumpto({ name: 'BlogBackendPublish', query: { id: row.row.id, pageType: 'edit' } });
}

// 删除
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delFun(row: any) {
	ElMessageBox.confirm('Are you sure to delete this article?', 'Warning', {
		confirmButtonText: 'I am true!',
		cancelButtonText: 'NO,I will think about it again',
		type: 'warning',
	})
		.then(() => {
			postBlogbackstagearticledelete({ articleId: Number(row.row.id) }).then((result) => {
				if (result.data.status === 1) {
					ElMessage.success('Delete completed');
					restInitPage();
				}
			});
		})
		.catch(() => {
			ElMessage.info('Delete canceled');
		});
}

// 跳转页面
function jumpto(routerInfo: RouteLocationRaw, isNewTab: boolean = false) {
	if (isNewTab) {
		window.open(router.resolve(routerInfo).href, '_blank');
	} else {
		router.push(routerInfo);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowDbClick(row: any, column: any, event: any) {
	console.log('===dbclick===', row, column, event);
	jumpto({ name: 'BlogBackendPublish', query: { id: row.id, pageType: 'view' } });
}

function statusCrossType(row: AT_BlogBackstageArticleQueryForAuthorResponse & { status_value: number }) {
	switch (row.status_value) {
		case AT_ArticleStatus.草稿:
			return 'info';
		case AT_ArticleStatus.待审:
			return 'warning';
		case AT_ArticleStatus.公开:
			return 'success';
		case AT_ArticleStatus.私有:
			return 'danger';
		case AT_ArticleStatus.驳回:
			return 'danger';
		default:
			break;
	}
}

const StatusList = ref<AT_SelectListItem[]>([]);
postBlogbackstagearticlestatusallquery().then((result) => {
	if (result.data.status === 1) {
		StatusList.value = result.data.content;
	}
});

function editStatusFun(item: AT_SelectListItem, row: AT_BlogBackstageArticleQueryForAuthorResponse) {
	// 转私有
	if (item.value === AT_ArticleStatus.私有) {
		postBlogbackstagearticletakeback({
			articleId: row.id,
		}).then((result) => {
			if (result.data.status === 1) {
				ElMessage.success('操作成功');
				restInitPage();
			}
		});
	}
}
</script>
<style lang="scss" scoped></style>
