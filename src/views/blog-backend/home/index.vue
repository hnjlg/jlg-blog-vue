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
						<el-dropdown>
							<el-avatar class="text-xs" @click="clickAvatar">
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
	</div>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Location } from '@element-plus/icons-vue';
import { RouteLocationRaw } from 'vue-router';
import { pageLoading } from './hooks/variable';
import useBlogBackendStore from '@/store/blog-backend';
import { loginOut } from './hooks/loginOut';
import { router } from '@/router/index';
import socketInit from '@/mixin/useSocketHook';
import drawer from '@/mixin/drawer';

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
</script>
<style lang="scss" scoped>
.blog-backend-container {
	height: 100vh;
	.blog-backend-home-content-common {
		height: 100%;
	}
}
</style>
