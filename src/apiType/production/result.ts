import axios from '@/request/index';
export declare interface ResponseData<T> {
	content: T;
	message: string | void;
	status: number;
}
type ItemInTu<T, K> = T extends [infer F, ...infer R] ? (F extends K ? true : ItemInTu<R, K>) : false;
export declare type U_I_NoNull<T, U extends Array<keyof T>> = { [K in keyof T as ItemInTu<U, K> extends true ? never : K]: T[K] } & {
	[K in keyof T as ItemInTu<U, K> extends true ? K : never]-?: T[K];
};
export const postArticletreedelete = (data: { articleTreeId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/article-tree/delete`, data);
};
export const postArticletreeallquery = () => {
	return axios.post<
		ResponseData<{ status: number; message: string; content: { id: number; article_tree_name: string; parent_article_tree_id: string }[] }>
	>(`/article-tree/all/query`);
};
export const postArticletreearticletreenamequery = (data: { pageIndex: number; pageSize: number; articleTreeName: string }) => {
	return axios.post<
		ResponseData<{ status: number; message: string; content: { id: number; article_tree_name: string; parent_article_tree_id: string }[] }>
	>(`/article-tree/article-tree-name/query`, data);
};
export const postBlogbackstagearticleallquery = (data: { pageIndex: number; pageSize: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog-backstage/article/all/query`, data);
};
export const postBlogbackstagearticlequeryforarticleId = (data: { articleId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog-backstage/article/query/for/articleId`, data);
};
export const postBlogbackstagearticlequeryforarticleTreeId = (data: { articleTreeId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog-backstage/article/query/for/articleTreeId`, data);
};
export const postBlogbackstagearticlequeryforauthor = (data: { pageIndex: number; pageSize: number; author: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog-backstage/article/query/for/author`, data);
};
export const postBlogbackstagearticledelete = (data: { articleId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/blog-backstage/article/delete`, data);
};
export const postBlogbackstagearticledraftadd = (data: {
	title: string;
	content: string;
	contentHTML: string;
	author: number;
	articleTreeId: number;
	articleTags: number[];
}) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/blog-backstage/article/draft/add`, data);
};
export const postBlogbackstagearticlereject = (data: { articleId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/blog-backstage/article/reject`, data);
};
export const postBlogbackstagearticlereview = (data: { articleId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/blog-backstage/article/review`, data);
};
export const postBlogbackstagearticletakeback = (data: { articleId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/blog-backstage/article/takeback`, data);
};
export const postBlogbackstagearticleadd = (data: {
	title: string;
	content: string;
	contentHTML: string;
	author: number;
	articleTreeId: number;
	articleTags: number[];
}) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/blog-backstage/article/add`, data);
};
export const postBlogarticlequeryforarticleId = (data: { articleId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog/article/query/for/articleId`, data);
};
export const postBlogarticlequeryforarticleTreeId = (data: { articleTreeId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog/article/query/for/articleTreeId`, data);
};
export const postBlogarticleliketitlequery = (data: { pageIndex: number; pageSize: number; title: string }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog/article/like/title/query`, data);
};
export const postBlogarticlearticleInterview = (data: { articleId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/blog/article/articleInterview`, data);
};
export const getBloghotquery = (limit: number) => {
	return axios.get<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog/hot/query?${limit ? 'limit=' + limit : ''}`);
};
export const postBlogarticlesquerybyTagId = (data: { pageIndex: number; pageSize: number; byTagId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string }[];
		}>
	>(`/blog/articles/query/byTagId`, data);
};
export const postBlogarticlesquerybyTagValue = (data: { pageIndex: number; pageSize: number; tagValue: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string }[];
		}>
	>(`/blog/articles/query/byTagValue`, data);
};
export const postBlogtagsquery = (data: { pageIndex: number; pageSize: number; tagName: string }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blog/tags/query`, data);
};
export const getBloghottagsquery = (limit: number) => {
	return axios.get<ResponseData<{ status: number; message: string; content: { article_count: number; name: string }[] }>>(
		`/blog/hot/tags/query?${limit ? 'limit=' + limit : ''}`
	);
};
export const postUserdelete = (data: { author: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/user/delete`, data);
};
export const postUserlogin = (data: { userName: string; passWord: string }) => {
	return axios.post<ResponseData<{ status: number; message: string; content: { id: number; token: string; userName: string; userCode: string }[] }>>(
		`/user/login`,
		data
	);
};
export const postUserallquery = (data: { pageIndex: number; pageSize: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				id: number;
				user_name: string;
				pass_word: string;
				user_code: string;
				user_standing_id: number;
				standing_name: string;
				standing_value: number;
			}[];
		}>
	>(`/user/all/query`, data);
};
export const postUserregister = (data: { userName: string; passWord: string }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/user/register`, data);
};
export const postUserupdate = (data: { author: number; passWord: string }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: {
				fieldCount: number;
				affectedRows: number;
				insertId: number;
				info: string;
				serverStatus: number;
				warningStatus: number;
				changedRows: number;
			}[];
		}>
	>(`/user/update`, data);
};
false;
