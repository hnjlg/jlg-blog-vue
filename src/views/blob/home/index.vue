<template>
	<div id="blob-home-container" :data-theme="theme">
		<div class="blob-home-container">
			<div id="blob-home-content-background" class="blob-home-content-common blob-home-content-background">
				<background-content-header v-if="$route.meta.backgroundShow"></background-content-header>
				<router-view v-slot="{ Component }">
					<keep-alive v-if="$route.meta.keepAlive && $route.meta.backgroundShow">
						<component :is="Component" :key="$route.path" />
					</keep-alive>
					<component :is="Component" v-if="!$route.meta.keepAlive && $route.meta.backgroundShow" />
				</router-view>
			</div>
			<div id="blob-home-content" class="blob-home-content-common blob-home-content">
				<blob-menu class="blob-home-left-menu" :disabled="currentShow !== 'content'"></blob-menu>
				<div class="blob-home-right-content">
					<blob-content-header :theme="theme" :change-theme="changeTheme" class="blob-home-content-right-header"></blob-content-header>
					<div id="blob-home-content-right-content" class="blob-home-content-right-content">
						<router-view v-slot="{ Component }">
							<keep-alive v-if="$route.meta.keepAlive && !$route.meta.backgroundShow">
								<component :is="Component" :key="$route.path" />
							</keep-alive>
							<component :is="Component" v-if="!$route.meta.keepAlive && !$route.meta.backgroundShow" />
						</router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import BlobMenu from './components/menu/index.vue';
import BlobContentHeader from './components/content-header/index.vue';
import BackgroundContentHeader from './components/background-content-header/index.vue';
import { currentShow } from './hooks/useBackgroundContent';
import { T_BlobTheme } from './type';

defineOptions({
	name: 'BlobHome',
});

const theme = ref<T_BlobTheme>('light');

const changeTheme = () => {
	theme.value = theme.value === 'dark' ? 'light' : 'dark';
};
</script>

<style scoped lang="scss">
@import url('./index.scss');
</style>
