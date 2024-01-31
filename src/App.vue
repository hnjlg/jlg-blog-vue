<template>
	<el-config-provider :locale="language[locale]">
		<div class="navigation-menu-container-switch" @click="navigationSwitchHandle">{{ navigationSwitchUrl }}</div>
		<Navigation-Menu
			v-model="navigationMenuShow"
			:animation-event-callback="{
				drawerOpened,
				drawerClosed,
			}"
		></Navigation-Menu>

		<router-view v-slot="{ Component }">
			<keep-alive v-if="$route.meta.keepAlive">
				<component :is="Component" />
			</keep-alive>
			<component :is="Component" v-if="!$route.meta.keepAlive" />
		</router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import NavigationMenu from '@/components/navigation-menu/index.vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import { ElConfigProvider } from 'element-plus';

const language = ref([zhCn, en]);

const locale = ref(0);

const navigationMenuShow = ref<boolean>(false);
const navigationSwitchUrl = ref<string>('中');
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
