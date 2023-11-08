import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		AutoImport({
			imports: ['vue'],
			dirs: [],
			resolvers: [ElementPlusResolver()],
			dts: 'auto-imports.d.ts',
		}),
		Components({
			resolvers: [ElementPlusResolver()],
			// 允许文件夹目录作为命名空间，可以避免自动导入组件出现重名文件名警告
			directoryAsNamespace: true,
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				javascriptEnabled: true,
				additionalData: '@import "./src/assets/styles/variable.scss"; @import "./src/assets/styles/mixins.scss";',
			},
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
		// 导入时忽略的后缀名
		extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
	},
	server: {
		port: 10100,
		host: '0.0.0.0',
	},
});
