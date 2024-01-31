<template>
	<div class="about-the-project-container">
		<div class="about-the-project-center">
			<h1 class="about-the-project-title">ONE PIECE</h1>
			<p>A library of documents co-written</p>
			<p>by jlg front-end project development team members</p>
			<p class="about-the-project-echnology-stack-text">Technology Stack</p>
			<p class="about-the-project-echnology-stack-images">
				<img src="./image/github.webp" width="80" />
				<img src="./image/js.webp" width="80" />
				<img src="./image/vscode.webp" width="80" />
				<img src="./image/vue.webp" width="80" />
				<img src="./image/react.webp" width="80" />
			</p>
		</div>
		<div class="about-the-project-time-machine">
			<p class="about-the-project-time-machine-first-level-title">
				<el-icon><Guide /></el-icon>
				<span>Time Machine</span>
			</p>
			<p class="about-the-project-time-machine-second-level-title">
				<el-icon><Calendar /></el-icon><span>2023-11</span>
			</p>
			<div class="about-the-project-time-machine-content">
				<p>
					<el-icon><Flag /></el-icon><span>2023-11-08 开始</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2023-11-28 博客前台文章列表展示,详情浏览</span>
				</p>
			</div>
			<p class="about-the-project-time-machine-second-level-title">
				<el-icon><Calendar /></el-icon><span>2023-12</span>
			</p>
			<div class="about-the-project-time-machine-content">
				<p>
					<el-icon><Flag /></el-icon><span>2023-12-05 swagger动态生成axios请求和ts约束</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2023-12-10 后台登录</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2023-12-15 后台文章管理</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2023-12-19 后台菜单管理</span>
				</p>
			</div>
			<p class="about-the-project-time-machine-second-level-title">
				<el-icon><Calendar /></el-icon><span>2024-01</span>
			</p>
			<div class="about-the-project-time-machine-content">
				<p>
					<el-icon><Flag /></el-icon><span>2024-01-05 后台注册功能</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2024-01-06 markdown文章浏览支持选择不同主题</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2023-01-11 前台新增个性字体</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2023-01-12 后台个人中心修改信息，文章审核流过程中邮件通知</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2023-01-22 后台用户管理</span>
				</p>
				<p>
					<el-icon><Flag /></el-icon><span>2023-01-30 后台标签管理</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Guide, Calendar, Flag } from '@element-plus/icons-vue';
defineOptions({
	name: 'AboutTheProject',
});
</script>

<style scoped lang="scss">
.about-the-project-container {
	font-size: 16px;

	.about-the-project-center {
		text-align: center;
		.about-the-project-title {
			font-size: 24px;
			font-weight: bold;
			padding: 40px;
		}

		.about-the-project-echnology-stack-text {
			padding: 20px;
		}

		.about-the-project-echnology-stack-images {
			display: flex;
			justify-content: center;
			padding: 20px;

			img {
				padding: 0 10px;
			}
		}
	}

	.about-the-project-time-machine {
		padding: 40px 10%;

		.el-icon {
			margin-right: 10px;
		}

		.about-the-project-time-machine-first-level-title {
			padding: 30px 0;
			font-size: 18px;
			font-weight: bold;
		}

		.about-the-project-time-machine-second-level-title {
			padding: 20px 0;
			font-weight: bold;
		}

		.about-the-project-time-machine-content {
			padding: 10px 20px;
		}
	}
}
</style>
