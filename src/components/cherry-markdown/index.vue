<template>
	<div ref="mdboxRef" class="cherry-markdown-container">
		<div :id="uuid" ref="mdcontentRef" class="cherry-markdown-content"></div>
		<div v-if="props.displayToc" class="cherry-markdown-toc">
			<div v-for="item in toc" :key="item.id">
				{{ item }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import { generateUniqueID } from '@/utils/value';
import { postFileupload } from '@/apiType/production/result';

defineOptions({
	name: 'CherryMarkdown',
});

const props = withDefaults(
	defineProps<{
		defaultContent: string | null;
		displayToc: boolean;
	}>(),
	{ defaultContent: '', displayToc: false }
);
const uuid = generateUniqueID();

const cherry = new Cherry({
	id: uuid,
	value: props.defaultContent ?? '',
	fileUpload: myFileUpload,
});

const toc = computed(() => {
	return cherry.getToc();
});

const mdboxRef = ref<HTMLElement>();
const mdcontentRef = ref<HTMLElement>();
onMounted(() => {
	const sourceElement = document.querySelectorAll('#' + uuid);
	if (sourceElement.length > 0) {
		mdboxRef.value?.replaceChild(sourceElement[sourceElement.length - 1], mdcontentRef.value as Node);
	} else {
		console.log('cherry >>> 未找到UUID');
	}
});

const unmount = () => {
	const element = document.getElementById(uuid);
	element && element.parentNode?.removeChild(element);
};

onUnmounted(() => {
	unmount();
});

defineExpose({
	cherry,
	unmount,
	uuid,
});

/**
 * 上传文件函数
 * @param file 上传文件的文件对象
 * @param callback 回调函数，回调函数接收两个参数，第一个参数为文件上传后的url，第二个参数可选，为额外配置信息
 */
function myFileUpload(file: Blob, callback?: (url: string) => any) {
	const formdata = new FormData();
	formdata.set('file', file);
	postFileupload(formdata).then((result) => {
		if (result.data.status === 1 && callback) {
			callback(import.meta.env.VITE_APP_BASE_URL + '/' + result.data.content.filename);
		}
	});
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
