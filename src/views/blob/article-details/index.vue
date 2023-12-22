<template>
	<div class="article-header h-16 px-2">
		<div class="font-bold underline decoration-dashed underline-offset-8 text-2xl text-center h-7">
			{{ modelValue.title ?? '&nbsp;&nbsp;&nbsp;&nbsp;' }}
		</div>
		<div class="article-header-bottom flex justify-between h-7 my-4">
			<div class="flex-1 text-center">
				<el-icon><Watch /></el-icon>{{ dayjs(modelValue.add_time).format('YYYY/MM/DD') }}
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
</template>

<script setup lang="ts">
import MarkDownShow from '@/components/markdown-show/index.vue';
import { pageModel } from './index.vue.d';
import { Watch, User, Document } from '@element-plus/icons-vue';
import { postBlogarticlearticleInterview, postBlogarticlequeryforarticleId } from '@/apiType/production/result';
import router from '@/router/index';
import dayjs from 'dayjs';

defineOptions({
	name: 'ArticleDetails',
});

const modelValue = ref<pageModel>({
	id: -1,
	title: '',
	content: '',
	content_html: '',
	author_name: '',
	tags: '',
	status_name: '',
	add_time: '',
});

function getInitData() {
	return new Promise(() => {
		postBlogarticlequeryforarticleId({ articleId: Number(router.currentRoute.value.query.id) })
			.then((result) => {
				modelValue.value = { ...modelValue.value, ...result.data.content };
			})
			.catch(() => {
				router.go(-1);
			});
	});
}
getInitData();

const readTime = setTimeout(() => {
	postBlogarticlearticleInterview({
		articleId: modelValue.value.id,
	});
}, 10000);
onDeactivated(() => {
	clearTimeout(readTime);
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/scroll.scss';
.article-content {
	height: calc(100% - 4rem - $blob-header-goback-height);
	overflow-y: scroll;
	overflow-x: scroll;
}
</style>
