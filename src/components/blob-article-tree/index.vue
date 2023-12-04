<template>
	<div class="blob-article-tree-container">
		<template v-for="article in props.articleTree" :key="article.title">
			<h2 v-if="article.children && article.children.length !== 0" :class="{ 'box-border': article.level !== 1 }">
				<div v-if="article.level === 2" class="blob-article-second-level-title">
					<el-icon><Collection /></el-icon>{{ article.title }}
				</div>
				<div v-if="article.level === 1" class="blob-article-first-level-title">
					<el-icon><FolderOpened /></el-icon>{{ article.title }}
				</div>
				<blob-article-tree :article-tree="article.children" @article-click="articleClick"></blob-article-tree>
			</h2>
			<h2 v-if="!article.children || article.children.length === 0">
				<div
					v-if="article.level === 3"
					class="blob-article-item-title"
					@click="
						articleClick({
							article,
						})
					"
				>
					<el-icon><Document /></el-icon>{{ article.title }}
				</div>
				<div v-if="article.level === 2" class="blob-article-second-level-title">
					<el-icon><Collection /></el-icon>{{ article.title }}
				</div>
				<div v-if="article.level === 1" class="blob-article-first-level-title">
					<el-icon><FolderOpened /></el-icon>{{ article.title }}
				</div>
			</h2>
		</template>
	</div>
</template>

<script setup lang="ts">
import { FolderOpened, Collection, Document } from '@element-plus/icons-vue';
import { I_ArticleTreeItem, I_ArticleClickObj } from './type';

defineOptions({
	name: 'BlobArticleTree',
});

const props = defineProps<{
	articleTree: I_ArticleTreeItem[];
}>();

const emits = defineEmits(['articleClick']);

const articleClick = (obj: I_ArticleClickObj) => {
	emits('articleClick', obj);
};
</script>

<style scoped lang="scss">
.blob-article-tree-container {
	.blob-article-first-level-title {
		font-size: 24px;
		font-weight: bold;
	}

	.blob-article-second-level-title {
		font-size: 18px;
		padding: 20px;
	}
	.blob-article-item-title {
		cursor: pointer;
		padding: 10px 40px;
		font-size: 16px;
	}
	.box-border {
		margin: 0 30px;
		@include useBlobTheme {
			border-left: 1px dashed getBlobVar('textColor');
		}
	}
}
</style>
