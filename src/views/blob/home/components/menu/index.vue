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
				:key="item.pathName"
				:class="{
					'blob-menu-first-level': item.level === 1,
					'blob-menu-second-level': item.level === 2,
					'blob-menu-current': item.level === 2 && item.pathName === route.name,
				}"
				@click="menuItemClick(item)"
			>
				<component :is="svgComputed(item)"></component>
				<div>{{ getTitle(item) }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import useBlobStore from '@/store/blob';
import { T_MenuItem } from './type';
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

const route = useRoute();

const currentRoutes = computed(() => {
	const firstUrl = route.fullPath.split('/').find((item) => item);
	if (firstUrl) {
		return router.options.routes.find((i) => i.path.includes(firstUrl));
	}
});

const toRoute = computed<(item: T_MenuItem) => RouteRecordRaw | undefined>(
	() => (item: T_MenuItem) => currentRoutes.value?.children?.find((i) => i.name === item.pathName)
);

const svgComputed = computed(() => {
	return (item: T_MenuItem) => {
		if (!toRoute.value(item) || !toRoute.value(item)?.meta) {
			return;
		}
		switch (toRoute.value(item)?.meta?.icon) {
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

const getTitle = computed(() => (item: T_MenuItem) => {
	if (item.level === 1) {
		return item.title;
	} else {
		return toRoute.value(item)?.meta?.title || '';
	}
});

const menuItemClick = (item: T_MenuItem) => {
	if (item.pathName && !props.disabled) {
		router.push(item.pathName);
	}
};
</script>

<style scoped lang="scss">
@import url('./index.scss');
</style>
