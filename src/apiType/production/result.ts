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
export const postBlobbackstagearticleallquery = (data: { pageIndex: number; pageSize: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blob-backstage/article/all/query`, data);
};
export const postBlobbackstagearticlequeryforarticleTreeId = (data: { articleTreeId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blob-backstage/article/query/for/articleTreeId`, data);
};
export const postBlobbackstagearticlequeryforauthor = (data: { pageIndex: number; pageSize: number; author: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blob-backstage/article/query/for/author`, data);
};
export const postBlobbackstagearticledelete = (data: { articleId: number }) => {
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
	>(`/blob-backstage/article/delete`, data);
};
export const postBlobbackstagearticledraftadd = (data: {
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
	>(`/blob-backstage/article/draft/add`, data);
};
export const postBlobbackstagearticlereject = (data: { articleId: number }) => {
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
	>(`/blob-backstage/article/reject`, data);
};
export const postBlobbackstagearticlereview = (data: { articleId: number }) => {
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
	>(`/blob-backstage/article/review`, data);
};
export const postBlobbackstagearticletakeback = (data: { articleId: number }) => {
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
	>(`/blob-backstage/article/takeback`, data);
};
export const postBlobbackstagearticleadd = (data: {
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
	>(`/blob-backstage/article/add`, data);
};
export const getBlobhotquery = (limit: number) => {
	return axios.get<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blob/hot/query?${limit ? 'limit=' + limit : ''}`);
};
export const postBlobarticlesquerybyTagId = (data: { pageIndex: number; pageSize: number; byTagId: number }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string }[];
		}>
	>(`/blob/articles/query/byTagId`, data);
};
export const postBlobtagsquery = (data: { pageIndex: number; pageSize: number; tagName: string }) => {
	return axios.post<
		ResponseData<{
			status: number;
			message: string;
			content: { id: number; title: string; content: string; reading_quantity: number; add_time: string; tags: string }[];
		}>
	>(`/blob/tags/query`, data);
};
export const getBlobhottagsquery = (limit: number) => {
	return axios.get<ResponseData<{ status: number; message: string; content: { article_count: number; name: string }[] }>>(
		`/blob/hot/tags/query?${limit ? 'limit=' + limit : ''}`
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
