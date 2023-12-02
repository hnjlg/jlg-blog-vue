<template>
	<div class="about-the-project-container">
		<div class="about-the-project-center">
			<h1 class="about-the-project-title">ONE PIECE</h1>
			<p>简介</p>
			<p>Use the latest mainstream technology stack</p>
			<p>-by SongQuan</p>
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
			<ul class="about-the-project-time-machine-content">
				<li>
					<el-icon><Flag /></el-icon><span>2023-11-22 Graduation!</span>
				</li>
			</ul>
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
