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
import App from '@/App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(router);

app.mount('#app');
