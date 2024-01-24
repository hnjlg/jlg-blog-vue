<!-- blog后台layout -->
<template>
	<div class="blog-backend-container">
		<el-container v-if="$route.meta.systemPage">
			<!-- 左侧menu start -->
			<el-aside style="background-color: aliceblue; height: 100vh">
				<el-scrollbar>
					<el-menu :default-openeds="['0', '1']" :default-active="$route.path">
						<el-sub-menu index="0">
							<template #title>
								<el-icon><Location /></el-icon>首页
							</template>
							<el-menu-item-group>
								<el-menu-item @click="jumpTo({ path: '/blob-home' })">前台首页</el-menu-item>
								<el-menu-item index="/blogBackend/BlogBackendIndex" @click="jumpTo({ name: 'BlogBackendIndex' })">后台首页</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<!-- <el-sub-menu index="1">
							<template #title>
								<el-icon><IconMenu /></el-icon>系统管理
							</template>
							<el-menu-item-group>
								<template v-for="item in blogBackendStore.routerInfo" :key="item.path">
									<el-menu-item v-if="item.meta" :index="item.path" @click="jumpTo(item)"> {{ item.meta.title }} </el-menu-item>
								</template>
							</el-menu-item-group>
						</el-sub-menu> -->
						<el-sub-menu v-for="(item, index) in blogBackendStore.routerInfo" :key="index" index="1">
							<template #title>
								<el-icon><IconMenu /></el-icon>{{ item.title }}
							</template>
							<el-menu-item-group>
								<template v-for="(iitem, iindex) in item.children" :key="iindex">
									<el-menu-item v-if="iitem.meta" :index="iitem.path" @click="jumpTo(iitem)"> {{ iitem.meta.title }} </el-menu-item>
								</template>
							</el-menu-item-group>
						</el-sub-menu>
					</el-menu>
				</el-scrollbar>
			</el-aside>
			<!-- 左侧menu end -->
			<el-container>
				<el-header>
					<div class="flex justify-end">
						<div class="w-10 h-10 p-3 mr-5">
							<el-badge :hidden="false" :value="1111" :max="10" @click="elNoticeClick">
								<el-icon size="20"><Bell /></el-icon>
							</el-badge>
						</div>
						<el-dropdown>
							<el-avatar class="text-xs" shape="square" @click="clickAvatar">
								{{ isLogin ? blogBackendStore.userInfo.user_name ?? '未登录' : '未登录' }}
							</el-avatar>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item :disabled="!isLogin" @click="myInfo">我的信息</el-dropdown-item>
									<el-dropdown-item divided @click="loginOut">退出登录</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</el-header>
				<el-main v-loading="pageLoading" class="blog-backend-home-content-common blog-backend-home-content-system-page">
					<router-view v-slot="{ Component }">
						<keep-alive v-if="$route.meta.keepAlive">
							<component :is="Component" :key="$route.path" />
						</keep-alive>
						<component :is="Component" v-if="!$route.meta.keepAlive" />
					</router-view>
				</el-main>
			</el-container>
		</el-container>
		<div v-else v-loading="pageLoading" class="blog-backend-home-content-common blog-backend-home-content-other-page">
			<router-view v-slot="{ Component }">
				<keep-alive v-if="$route.meta.keepAlive">
					<component :is="Component" :key="$route.path" />
				</keep-alive>
				<component :is="Component" v-if="!$route.meta.keepAlive" />
			</router-view>
		</div>
		<el-dialog v-model="outerVisible" title="消息" destroy-on-close :close-on-click-modal="false" width="50%" height="500">
			<template #default>
				<div class="notice-box w-full">
					<el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-menu-item index="1">最新消息</el-menu-item>
						<el-menu-item index="2">历史消息</el-menu-item>
						<el-menu-item index="3" disabled>全部消息</el-menu-item>
					</el-menu>
					<div class="notice-box-content">
						<template v-if="HistoryMsg.length !== 0">
							<div v-for="(item, index) in HistoryMsg" :key="index" class="notice-item border rounded-md">
								<div class="notice-item-title">标题：{{ item.msg_title }}</div>
								<div class="notice-item-content">消息内容：{{ item.msg_content }}</div>
								<div class="notice-item-sendtime">发送时间：{{ dayjs(item.send_time).format('YYYY/MM/DD hh:mm') }}</div>
							</div>
						</template>
						<template v-else>
							<el-empty description="description" />
						</template>
					</div>
				</div>
			</template>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="outerVisible = false">关闭</el-button>
					<el-button type="primary" @click="outerVisible = false"> 一键已读 </el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Location, Bell } from '@element-plus/icons-vue';
import { RouteLocationRaw } from 'vue-router';
import { pageLoading } from './hooks/variable';
import useBlogBackendStore from '@/store/blog-backend';
import { loginOut } from './hooks/loginOut';
import { router } from '@/router/index';
import socketInit, { socketIo } from '@/mixin/useSocketHook';
import drawer from '@/mixin/drawer';
import dayjs from 'dayjs';

defineOptions({
	name: 'BlobBackendHome',
});

socketInit();

const blogBackendStore = useBlogBackendStore();

// 跳转路由
function jumpTo(routerInfo: RouteLocationRaw) {
	router.push(routerInfo);
}

const isLogin = computed<boolean>(() => (sessionStorage.getItem('blog-backend-token') ? true : false));

// 点击头像
function clickAvatar() {
	if (blogBackendStore.userInfo) {
		console.log('===已登录===');
	} else {
		router.push({ name: 'BlogBackendLogin' });
		console.log('===未登录===');
	}
}
function myInfo() {
	console.log('===我的信息===');
	drawer('MyInformation', '我的信息', {}, 'edit');
}

function elNoticeClick() {
	console.log('===查看消息===');
	outerVisible.value = true;
}

const outerVisible = ref(false);

function handleSelect(key: string, keyPath: string[]) {
	console.log('===keyPath===', keyPath);

	if (key === '1') {
		HistoryMsg.value = [];
		socketIo.value?.emit('reqNewMessage');
	} else if (key === '2') {
		HistoryMsg.value = [];
		socketIo.value?.emit('reqHistoryMsg');
	}
}

const HistoryMsg = ref<any[]>([]);
socketIo.value?.on('resHistoryMsg', (data) => {
	HistoryMsg.value = data;
	console.log(data, 'HistoryMsg');
});

socketIo.value?.on('resNewMessage', (data) => {
	console.log(data, 'resNewMessage');
	outerVisible.value = true;
	HistoryMsg.value = data;
});
</script>
<style lang="scss" scoped>
.blog-backend-container {
	height: 100vh;
	.blog-backend-home-content-common {
		height: 100%;
	}
}
</style>
