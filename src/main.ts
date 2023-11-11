import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router/index';
import 'normalize.css';
// tailwind模块样式文件
import './tailwind.css';
// cherry-markdown样式文件
import 'cherry-markdown/dist/cherry-markdown.css';
// 自定义覆盖修改cherry-markdown样式文件
import './cherry-markdown.scss';
import App from './App.vue';
createApp(App).use(createPinia()).use(router).mount('#app');
