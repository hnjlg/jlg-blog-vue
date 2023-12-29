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
								<el-menu-item @click="jumpto({ path: '/blob-home' })">前台首页</el-menu-item>
								<el-menu-item index="/blogBackend/BlogBackendIndex" @click="jumpto({ name: 'BlogBackendIndex' })">后台首页</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="1">
							<template #title>
								<el-icon><Location /></el-icon>文章管理
							</template>
							<el-menu-item-group>
								<template v-for="item in blogBackendStore.$state.routerInfo" :key="item.path">
									<el-menu-item v-if="item.meta" :index="item.path" @click="jumpto(item)"> {{ item.meta.title }} </el-menu-item>
								</template>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="2">
							<template #title>
								<el-icon><icon-menu /></el-icon>用户管理
							</template>
							<el-menu-item-group>
								<template #title>Group 1</template>
								<el-menu-item index="2-1">Option 1</el-menu-item>
								<el-menu-item index="2-2">Option 2</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group title="Group 2">
								<el-menu-item index="2-3">Option 3</el-menu-item>
							</el-menu-item-group>
							<el-sub-menu index="2-4">
								<template #title>Option 4</template>
								<el-menu-item index="2-4-1">Option 4-1</el-menu-item>
							</el-sub-menu>
						</el-sub-menu>
						<el-sub-menu index="3">
							<template #title>
								<el-icon><setting /></el-icon>其他设置
							</template>
							<el-menu-item-group>
								<template #title>Group 1</template>
								<el-menu-item index="3-1">Option 1</el-menu-item>
								<el-menu-item index="3-2">Option 2</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group title="Group 2">
								<el-menu-item index="3-3">Option 3</el-menu-item>
							</el-menu-item-group>
							<el-sub-menu index="3-4">
								<template #title>Option 4</template>
								<el-menu-item index="3-4-1">Option 4-1</el-menu-item>
							</el-sub-menu>
						</el-sub-menu>
					</el-menu>
				</el-scrollbar>
			</el-aside>
			<!-- 左侧menu end -->
			<el-container>
				<el-header>
					<div class="flex justify-end">
						<el-dropdown>
							<el-avatar class="text-xs" @click="clickAvatar">
								{{ isLogin ? blogBackendStore.$state.userInfo.user_name ?? '未登录' : '未登录' }}
							</el-avatar>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item :disabled="!isLogin">我的信息</el-dropdown-item>
									<el-dropdown-item divided @click="loginout">退出登录</el-dropdown-item>
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
	</div>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Setting, Location } from '@element-plus/icons-vue';
import { RouteLocationRaw } from 'vue-router';
import { pageLoading } from './hooks/variable';
import useBlogBackendStore from '@/store/blog-backend';
import { loginout } from './hooks/loginout';
import { router } from '@/router/index';
import io from 'socket.io-client';

defineOptions({
	name: 'BlobBackendHome',
});

const blogBackendStore = useBlogBackendStore();

const socketIo = io('http://192.168.13.225:3000', {
	withCredentials: true, // 允许发送凭据（例如 cookie）
	transports: ['websocket'], // 明确指定使用 WebSocket 连接，以避免跨域问题
});

socketIo.on('newMessage', (data) => {
	console.log(data, 'data');
});

socketIo.emit('testGet');

// 跳转路由
function jumpto(routerInfo: RouteLocationRaw) {
	router.push(routerInfo);
}

const isLogin = computed<boolean>(() => (localStorage.getItem('blog-backend-token') ? true : false));

// 点击头像
function clickAvatar() {
	if (blogBackendStore.$state.userInfo) {
		console.log('===已登录===');
	} else {
		router.push({ name: 'BlogBackendLogin' });
		console.log('===未登录===');
	}
}
</script>
<style lang="scss" scoped>
.blog-backend-container {
	height: 100vh;
	.blog-backend-home-content-common {
		height: 100%;
	}
}
</style>
