import { postArticletreearticletreenamequery, postBlogtagsquery } from '@/apiType/production/result';

export const articleTagsLoading = ref(false);

export const articleTagsList = ref([]);

export function articleTagsRemoteMethod(tagName: string) {
	articleTagsLoading.value = true;
	postBlogtagsquery({
		pageIndex: 1,
		pageSize: 10,
		tagName: tagName,
	})
		.then((result) => {
			articleTagsList.value = result.data.content;
		})
		.finally(() => {
			articleTagsLoading.value = false;
		});
}

export const articleTreeList = ref([]);

export function articleTreeListRemoteMethod(name: string) {
	articleTagsLoading.value = true;
	if (name === '') return;
	postArticletreearticletreenamequery({
		pageIndex: 1,
		pageSize: 10,
		articleTreeName: name,
	})
		.then((result) => {
			articleTreeList.value = result.data.content;
		})
		.finally(() => {
			articleTagsLoading.value = false;
		});
}
