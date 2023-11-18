<template>
	<div class="blob-article-tree-container">
		<template v-for="article in props.articleTree" :key="article.title">
			<h1 v-if="article.level === 1" class="blob-article-first-level-title">
				<el-icon><FolderOpened /></el-icon>{{ article.title }}
			</h1>
			<template v-else-if="article.level === 2">
				<h2 class="blob-article-second-level-title">
					<el-icon><Collection /></el-icon>{{ article.title }}
				</h2>
				<ul v-if="article.children">
					<li
						v-for="articleCld in article.children"
						:key="articleCld.title"
						class="blob-article-item-title"
						@click="
							articleClick({
								articleCld,
								article,
							})
						"
					>
						<el-icon><Document /></el-icon>{{ articleCld.title }}
					</li>
				</ul>
			</template>
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
}
</style>
