<template>
	<div class="article-header h-16 px-2">
		<div class="font-bold underline decoration-dashed underline-offset-8 text-2xl text-center h-7">
			{{ modelValue.title ?? '&nbsp;&nbsp;&nbsp;&nbsp;' }}
		</div>
		<div class="article-header-bottom flex justify-between h-7 my-4">
			<div class="flex-1 text-center">
				<el-icon><Watch /></el-icon>{{ modelValue.publishTime }}
			</div>
			<div class="flex-1 text-center">
				<el-icon><User /></el-icon>{{ modelValue.publisher }}
			</div>
			<div class="flex-1 text-center">
				<el-icon><Document /></el-icon
				>{{
					modelValue.category === E_ArticleCategory.丰恺思项目
						? '丰恺思项目'
						: modelValue.category === E_ArticleCategory.OA项目
						? 'OA项目'
						: modelValue.category === E_ArticleCategory.大平台项目
						? '大平台项目'
						: '大平台项目'
				}}
			</div>
		</div>
	</div>
	<div class="article-content px-2 min-h-[50%]">
		<MarkDownShow :content="modelValue.content"></MarkDownShow>
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
// import { useRoute } from 'vue-router';
import MarkDownShow from '@/components/markdown-show/index.vue';
import { pageModel } from './index.vue.d';
import { Watch, User, Document, Star } from '@element-plus/icons-vue';
import { E_ArticleCategory } from '@/utils/enum.ts';

defineOptions({
	name: 'ArticleDetails',
});

const modelValue = ref<pageModel>({
	title: '夏洛不烦恼',
	content:
		'这里是文章内容11111<h1>一级标题</h1><h2>二级标题</h2><h1>一级标题</h1><h3><strong>标题</strong></h3>##1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111<br>11111111111111<br>111111111111111111111111111111111111111<br>1111111111111111111111111111111111111111111111111111111<br>111111111111111111111111<br>11111111111111111111111111111111111111111111111111<br>11111111111111111111111111111111111111111111111<br>1111111111111111111111111111111111111111111111111111111111111111111111111111111111111<br>1111111111111111111111111111111111111111111111111111111111111<br>11111111111111111111111111111111111111111111111111111111111111111<br>11111111111111111111111111111111111111111111<br>11111111111111111111111111111111111111111111111111111111111<br>1111111111111111111111111111111111111111111<br>111111111<br>11111111111111111111111111<br>11111111111111111111111111111111111111111111111111111111111<h1>一级标题</h1><h2>二级标题</h2><h1>一级标题</h1><h2>二级标题</h2>这里是文章内容11111<h1>一级标题</h1><h2>二级标题</h2><h1>一级标题</h1><h3><strong>标题</strong></h3>##1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111<br>11111111111111<br>111111111111111111111111111111111111111<br>1111111111111111111111111111111111111111111111111111111<br>111111111111111111111111<br>11111111111111111111111111111111111111111111111111<br>11111111111111111111111111111111111111111111111<br>1111111111111111111111111111111111111111111111111111111111111111111111111111111111111<br>1111111111111111111111111111111111111111111111111111111111111<br>11111111111111111111111111111111111111111111111111111111111111111<br>11111111111111111111111111111111111111111111<br>11111111111111111111111111111111111111111111111111111111111<br>1111111111111111111111111111111111111111111<br>111111111<br>11111111111111111111111111<br>11111111111111111111111111111111111111111111111111111111111<h1>一级标题</h1><h2>二级标题</h2><h1>一级标题</h1><h2>二级标题</h2>',
	publisher: '马冬梅',
	category: 1,
	status: 1,
	updateTime: '',
	publishTime: '2023/12/12',
});

// const route = useRoute();

// function getInitData() {
// 	return new Promise((resolve) => {
// 		// const articleId = route.query.id;
// 		// console.log('======', articleId);
// 		modelValue.value = {
// 			title: '温州皮革厂倒闭了',
// 			content: '<h1>一级标题</h1><h2>二级标题</h2><h1>一级标题</h1><h2>二级标题</h2>',
// 			publisher: '马冬梅',
// 			category: 1,
// 			status: 1,
// 			updateTime: String(new Date()),
// 			publishTime: String(new Date()),
// 		};
// 		console.log('======', modelValue.value);
// 		resolve('');
// 	});
// }
// await getInitData();

// 点赞
function likeFun() {
	ElMessage.success('点赞成功！');
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/scroll.scss';
// .article-header {
// 	height: 100px;
// }
.article-content {
	height: calc(100% - 4rem - $blob-header-goback-height);
	overflow-y: scroll;
	overflow-x: scroll;
}
</style>
