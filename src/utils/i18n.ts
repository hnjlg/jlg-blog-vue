import { createI18n } from 'vue-i18n';
import zh from '@/i18n/source/zh.json';
import en from '@/i18n/source/en.json';
import eleZhCn from 'element-plus/dist/locale/zh-cn.mjs';
import eleEn from 'element-plus/dist/locale/en.mjs';

const messages = {
	en,
	zh,
};

export const eleLanguage = ref<{
	[key: string]: typeof eleZhCn | typeof eleEn;
}>({
	zh: eleZhCn,
	en: eleEn,
});

export const locale = ref<keyof typeof messages>('zh');

if (localStorage.getItem('language') && Object.keys(messages).includes(localStorage.getItem('language') ?? '')) {
	locale.value = localStorage.getItem('language') as keyof typeof messages;
}

watch(locale, (val) => {
	changeLanguage(val);
});

const i18n = createI18n({
	locale: locale.value,
	messages,
});

export const t = i18n.global.t;

export const changeLanguage = (lang: keyof typeof messages) => {
	i18n.global.locale = lang;
	locale.value = lang;
	localStorage.setItem('language', lang);
};

export default i18n;
