<template>
	<div class="blob-menu-container">
		<div
			class="blob-menu-item blob-menu-back-home"
			@click="
				menuItemClick({
					pathName: 'blob-content-home',
					level: 1,
					title: '情感分析系统',
				})
			"
		>
			情感分析系统
		</div>
		<div class="blob-menu-content">
			<div
				v-for="item in blobStore.blobMenu"
				:key="item.title"
				:class="{
					'blob-menu-first-level': item.level === 1,
					'blob-menu-second-level': item.level === 2,
				}"
				@click="menuItemClick(item)"
			>
				<component :is="svgComputed(item)"></component>
				<div>{{ item.title }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useBlobStore from '@/store/blob';
import { I_MenuItem } from './type';
import undraw_articles_wbpb_svg from './svg/undraw_articles_wbpb.svg';
import undraw_blog_post_re_fy5x_svg from './svg/undraw_blog_post_re_fy5x.svg';
import undraw_body_text_re_9riw_svg from './svg/undraw_body_text_re_9riw.svg';
import undraw_my_personal_files_re_3q0p_svg from './svg/undraw_my_personal_files_re_3q0p.svg';
import undraw_online_article_re_daq5_svg from './svg/undraw_online_article_re_daq5.svg';
import undraw_online_articles_re_yrkj_svg from './svg/undraw_online_articles_re_yrkj.svg';
import undraw_online_information_re_erks_svg from './svg/undraw_online_information_re_erks.svg';
import undraw_placeholders_re_pvr4_svg from './svg/undraw_placeholders_re_pvr4.svg';
import undraw_publish_article_re_3x8h_svg from './svg/undraw_publish_article_re_3x8h.svg';

defineOptions({
	name: 'BlobMenu',
});

const props = withDefaults(defineProps<{ disabled: boolean }>(), {
	disabled: false,
});

const blobStore = useBlobStore();

const router = useRouter();

const svgComputed = computed(() => {
	return (item: I_MenuItem) => {
		switch (item.icon) {
			case 'undraw_articles_wbpb_svg':
				return undraw_articles_wbpb_svg;
			case 'undraw_blog_post_re_fy5x_svg':
				return undraw_blog_post_re_fy5x_svg;
			case 'undraw_body_text_re_9riw_svg':
				return undraw_body_text_re_9riw_svg;
			case 'undraw_my_personal_files_re_3q0p_svg':
				return undraw_my_personal_files_re_3q0p_svg;
			case 'undraw_online_article_re_daq5_svg':
				return undraw_online_article_re_daq5_svg;
			case 'undraw_online_articles_re_yrkj_svg':
				return undraw_online_articles_re_yrkj_svg;
			case 'undraw_online_information_re_erks_svg':
				return undraw_online_information_re_erks_svg;
			case 'undraw_placeholders_re_pvr4_svg':
				return undraw_placeholders_re_pvr4_svg;
			case 'undraw_publish_article_re_3x8h_svg':
				return undraw_publish_article_re_3x8h_svg;
		}
	};
});

const menuItemClick = (item: I_MenuItem) => {
	if (item.pathName && !props.disabled) {
		router.push(item.pathName);
	}
};
</script>

<style scoped lang="scss">
/* WebKit浏览器 */
::-webkit-scrollbar {
	width: 1px;
}

// 滚动条轨道色
::-webkit-scrollbar-track {
	background: #fff;
}

// 滚动条柱体颜色
::-webkit-scrollbar-thumb {
	background: #000;
	border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
	background: #000;
}

.blob-menu-container {
	.blob-menu-back-home {
		height: $blob-header-height;
		line-height: $blob-header-height;
		text-align: center;
		border-radius: 20px 0 0 0;
		cursor: pointer;
	}

	.blob-menu-content {
		height: calc(100% - $blob-header-height);
		overflow-x: hidden;
		overflow-y: auto;
		padding: 0 30px;

		.blob-menu-first-level {
			font-size: 14px;
			padding: 45px 0;
			@include useBlobTheme() {
				border-top: 1px solid getVar('textColor');
			}
		}

		.blob-menu-second-level {
			padding: 30px 0;
			cursor: pointer;
			display: flex;
			align-items: center;
		}
	}
}
</style>
