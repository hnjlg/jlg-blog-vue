<template>
	<div class="navigation-menu-container-switch" @click="navigationSwitchHandle">
		<div class="w-20">
			{{ navigationSwitchUrl }}
		</div>
	</div>
	<Navigation-Menu
		v-model="navigationMenuShow"
		:animation-event-callback="{
			drawerOpened,
			drawerClosed,
		}"
	></Navigation-Menu>
	<router-view v-slot="{ Component }">
		<keep-alive>
			<component :is="Component" v-if="$route.meta.keepAlive" />
		</keep-alive>
		<component :is="Component" v-if="!$route.meta.keepAlive" />
	</router-view>
</template>

<script setup lang="ts">
import NavigationMenu from '@/components/navigation-menu/index.vue';

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
* {
	font-size: 16px;
}
</style>
