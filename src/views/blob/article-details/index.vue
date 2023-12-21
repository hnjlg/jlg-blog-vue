<template>
	<div class="article-header h-16 px-2">
		<div class="font-bold underline decoration-dashed underline-offset-8 text-2xl text-center h-7">
			{{ modelValue.title ?? '&nbsp;&nbsp;&nbsp;&nbsp;' }}
		</div>
		<div class="article-header-bottom flex justify-between h-7 my-4">
			<div class="flex-1 text-center">
				<el-icon><Watch /></el-icon>{{ modelValue.add_time }}
			</div>
			<div class="flex-1 text-center">
				<el-icon><User /></el-icon>{{ modelValue.author_name }}
			</div>
			<div class="flex-1 text-center">
				<el-icon><Document /></el-icon>{{ modelValue.tags }}
			</div>
		</div>
	</div>
	<div class="article-content px-2 min-h-[50%]">
		<MarkDownShow :content="modelValue.content_html"></MarkDownShow>
	</div>
	<div class="article-footer px-2">
		<div class="absolute bottom-0 right-0 h-8">
			<div class="w-12 px-4 cursor-pointer hover:text-3xl" @click="likeFun">
				<el-tooltip class="box-item" effect="light" content="讲得不错！赞" placement="top">
					<el-icon size="24"><Star /></el-icon>
				</el-tooltip>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MarkDownShow from '@/components/markdown-show/index.vue';
import { pageModel } from './index.vue.d';
import { Watch, User, Document, Star } from '@element-plus/icons-vue';
import { postBlogarticlequeryforarticleId } from '@/apiType/production/result';
import router from '@/router/index';

defineOptions({
	name: 'ArticleDetails',
});

const modelValue = ref<pageModel>({
	title: '夏洛不烦恼',
	content: '',
	content_html: '',
	author_name: '马冬梅',
	tags: '',
	status_name: '',
	add_time: '1970/1/1',
});

function getInitData() {
	return new Promise(() => {
		postBlogarticlequeryforarticleId({ articleId: Number(router.currentRoute.value.query.id) }).then((result) => {
			modelValue.value = { ...modelValue.value, ...result.data.content };
		});
	});
}
getInitData();

// 点赞
function likeFun() {
	ElMessage.success('点赞成功！');
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/scroll.scss';
.article-content {
	height: calc(100% - 4rem - $blob-header-goback-height);
	overflow-y: scroll;
	overflow-x: scroll;
}
</style>
