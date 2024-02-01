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

// 国际化
import i18n from '@/utils/i18n';

const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(router);

app.use(i18n);

app.mount('#app');
