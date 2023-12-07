<!-- blog后台layout -->
<template>
	<div class="common-layout">
		<el-container>
			<!-- 左侧menu start -->
			<el-aside style="background-color: aliceblue; height: 100vh">
				<el-scrollbar>
					<el-menu :default-openeds="['1', '2']" default-active="1-1">
						<el-sub-menu index="0">
							<template #title>
								<el-icon><Location /></el-icon>首页
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-2" @click="jumpto({ path: '/blob-home' })">前台首页</el-menu-item>
								<el-menu-item index="1-1" @click="jumpto({ name: 'blog-backend-index' })">后台首页</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="1">
							<template #title>
								<el-icon><Location /></el-icon>文章管理
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1" @click="jumpto({ name: 'blog-backend-publish' })">发布文章</el-menu-item>
								<el-menu-item index="1-2" @click="jumpto({ name: 'blog-article-all' })">全部文章</el-menu-item>
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
				<el-header>Header</el-header>
				<el-main>
					<router-view v-slot="{ Component }">
						<KeepAlive v-if="Component">
							<component :is="Component"></component>
						</KeepAlive>
					</router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Setting, Location } from '@element-plus/icons-vue';
import { RouteLocationRaw, useRouter } from 'vue-router';

defineOptions({
	name: 'BlobBackendHome',
});

const router = useRouter();

// 跳转路由
function jumpto(routerInfo: RouteLocationRaw) {
	router.push(routerInfo);
}
</script>
<style lang="scss" scoped></style>
