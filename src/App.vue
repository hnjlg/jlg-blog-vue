<template>
	<el-config-provider :locale="eleLanguage[locale]">
		<div class="navigation-menu-container-switch" @click="navigationSwitchHandle">{{ navigationSwitchUrl }}</div>
		<Navigation-Menu
			v-model="navigationMenuShow"
			:animation-event-callback="{
				drawerOpened,
				drawerClosed,
			}"
		></Navigation-Menu>

		<transition name="slide">
			<router-view v-slot="{ Component }">
				<blog-backend-loading :model-value="pageLoading">
					<keep-alive v-if="$route.meta.keepAlive">
						<component :is="Component" />
					</keep-alive>
					<component :is="Component" v-if="!$route.meta.keepAlive" />
				</blog-backend-loading>
			</router-view>
		</transition>
	</el-config-provider>
	<floating-ball v-model:el-right="ballElRight" v-model:el-bottom="ballElBottom">
		<el-radio-group v-model="locale">
			<el-radio label="zh">简体中文</el-radio>
			<el-radio label="en">English</el-radio>
		</el-radio-group>
	</floating-ball>
</template>

<script setup lang="ts">
import NavigationMenu from '@/components/navigation-menu/index.vue';
import { eleLanguage, locale } from '@/utils/i18n';
import { ElConfigProvider } from 'element-plus';
import FloatingBall from '@/components/floating-ball/index.vue';
import BlogBackendLoading from '@/components/business/blog-backend-loading/index.vue';
import { pageLoading } from '@/views/blog-backend/home/hooks/variable';

const navigationMenuShow = ref<boolean>(false);
const navigationSwitchUrl = ref<string>('中');
const ballElRight = ref<number>(10);
const ballElBottom = ref<number>(0);

const navigationSwitchHandle = () => {
	navigationMenuShow.value = !navigationMenuShow.value;
	navigationMenuShow.value ? (navigationSwitchUrl.value = '放') : (navigationSwitchUrl.value = '收');
};
const drawerOpened = () => {
	console.log('drawer open animate done');
	navigationSwitchUrl.value = '中';
};
const drawerClosed = () => {
	console.log('drawer close animate done');
	navigationSwitchUrl.value = '中';
};
</script>
<style lang="scss" scoped>
.navigation-menu-container-switch {
	position: fixed;
	top: 0;
	right: 10%;
	z-index: 9999;
}
</style>
