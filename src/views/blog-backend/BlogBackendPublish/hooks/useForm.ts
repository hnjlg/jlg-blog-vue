import { postArticletreearticletreenamequery, postBlogtagsquery } from '@/apiType/production/result';

export const articleTagsLoading = ref(false);

// 文章标签远程检索
export const articleTagsList = ref([]);
export function articleTagsRemoteMethod(tagName: string) {
	articleTagsLoading.value = true;
	if (tagName === '') return;
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

// 文章树远程检索
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
