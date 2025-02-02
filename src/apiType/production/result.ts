import axios from '@/request/index';

type ItemInTu<T, K> = T extends [infer F, ...infer R] ? (F extends K ? true : ItemInTu<R, K>) : false;
export declare type U_I_NoNull<T, U extends Array<keyof T>> = { [K in keyof T as ItemInTu<U, K> extends true ? never : K]: T[K] } & {
	[K in keyof T as ItemInTu<U, K> extends true ? K : never]-?: T[K];
};
export const postArticletagstagsadd = (data: { tagName: string }) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/article-tags/tags/add`, data);
};
export const postArticletagstagsdelete = <NUDATA extends (keyof AT_ArticleTagAddRequest)[] = []>(
	data: U_I_NoNull<AT_ArticleTagAddRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/article-tags/tags/delete`, data);
};
export const postArticletagstagsquery = <NUDATA extends (keyof AT_ArticleTagsTagsQueryRequest)[] = []>(
	data: U_I_NoNull<AT_ArticleTagsTagsQueryRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: { total: number; arr: AT_ArticleTagsTagsQueryResponse[] } }>(
		`/article-tags/tags/query`,
		data
	);
};
export const getArticletagstagsqueryArticleSingleByTagId = (tag_id: number) => {
	return axios.get<{ status: number; message: string; content: AT_QueryArticleSingleByTagIdResponse[] }>(
		`/article-tags/tags/queryArticleSingleByTagId?${tag_id ? 'tag_id=' + tag_id : ''}`
	);
};
export const postArticletagstagsupdate = (data: { tag_id: number; tag_name: string }) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/article-tags/tags/update`, data);
};
export const postArticletreetreeadd = (data: { treeName: string; parentId: number }) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/article-tree/tree/add`, data);
};
export const postArticletreebyIddelete = <NUDATA extends (keyof AT_ArticleTreeByIdDeleteRequest)[] = []>(
	data: U_I_NoNull<AT_ArticleTreeByIdDeleteRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/article-tree/byId/delete`, data);
};
export const postArticletreearticletreenamequery = <NUDATA extends (keyof AT_ArticleTreeArticleTreeNameQueryRequest)[] = []>(
	data: U_I_NoNull<AT_ArticleTreeArticleTreeNameQueryRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: { total: number; arr: AT_ArticleTreeArticleTreeNameQueryResponse[] } }>(
		`/article-tree/article-tree-name/query`,
		data
	);
};
export const postArticletreearticletreeidquery = (data: { articleTreeId: number }) => {
	return axios.post<{ status: number; message: string; content: AT_ArticleTreeArticleTreeNameQueryResponse[] }>(
		`/article-tree/article-tree-id/query`,
		data
	);
};
export const postArticletreearticletreeidupdate = (data: { id: number; article_tree_name: string; parent_article_tree_id: number }) => {
	return axios.post<{ status: number; message: string; content: AT_ArticleTreeArticleTreeNameQueryResponse[] }>(
		`/article-tree/article-tree-id/update`,
		data
	);
};
export const postBlogbackstagearticleallquery = <NUDATA extends (keyof AT_BlogBackstageArticleAllQueryRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleAllQueryRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: { total: number; arr: AT_BlogBackstageArticleAllQueryResponse[] } }>(
		`/blog-backstage/article/all/query`,
		data
	);
};
export const postBlogbackstagearticlequeryforarticleId = <NUDATA extends (keyof AT_BlogBackstageArticleQueryForArticleRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleQueryForArticleRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_BlogBackstageArticleQueryForArticleResponse }>(
		`/blog-backstage/article/query/for/articleId`,
		data
	);
};
export const postBlogbackstagearticlequeryforarticleTreeId = <NUDATA extends (keyof AT_BlogBackstageArticleQueryForArticleTreeIdRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleQueryForArticleTreeIdRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_BlogBackstageArticleQueryForArticleTreeIdResponse[] }>(
		`/blog-backstage/article/query/for/articleTreeId`,
		data
	);
};
export const postBlogbackstagearticlequeryforauthor = <NUDATA extends (keyof AT_BlogBackstageArticleQueryForAuthorRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleQueryForAuthorRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: { total: number; arr: AT_BlogBackstageArticleQueryForAuthorResponse[] } }>(
		`/blog-backstage/article/query/for/author`,
		data
	);
};
export const postBlogbackstagearticlestatusallquery = () => {
	return axios.post<{ status: number; message: string; content: AT_SelectListItem[] }>(`/blog-backstage/article-status/all/query`);
};
export const postBlogbackstagearticledelete = <NUDATA extends (keyof AT_BlogBackstageArticleDeleteRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleDeleteRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/delete`, data);
};
export const postBlogbackstagearticledraftadd = <NUDATA extends (keyof AT_BlogBackstageArticleDraftAddRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleDraftAddRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/draft/add`, data);
};
export const postBlogbackstagearticledraftturnwaitreview = <NUDATA extends (keyof AT_BlogBackstageArticleDraftTurnWaitReviewRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleDraftTurnWaitReviewRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/draft/turn/wait-review`, data);
};
export const postBlogbackstagearticleedit = <NUDATA extends (keyof AT_BlogBackstageArticleEditRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleEditRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/edit`, data);
};
export const postBlogbackstagearticlereject = <NUDATA extends (keyof AT_BlogBackstageArticleRejectRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleRejectRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/reject`, data);
};
export const postBlogbackstagearticlereview = <NUDATA extends (keyof AT_BlogBackstageArticleReviewRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleReviewRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/review`, data);
};
export const postBlogbackstagearticletakeback = <NUDATA extends (keyof AT_BlogBackstageArticleTakebackRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleTakebackRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/takeback`, data);
};
export const postBlogbackstagearticleadd = <NUDATA extends (keyof AT_BlogBackstageArticleAddRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageArticleAddRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/add`, data);
};
export const postBlogbackstagearticlebatchUpdate = <NUDATA extends (keyof AT_ArticleBatchUpdateTagRequest)[] = []>(
	data: U_I_NoNull<AT_ArticleBatchUpdateTagRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog-backstage/article/batchUpdate`, data);
};
export const postBlogarticlequeryforarticleId = <NUDATA extends (keyof AT_BlogBackstageQueryForArticleIdRequest)[] = []>(
	data: U_I_NoNull<AT_BlogBackstageQueryForArticleIdRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_BlogBackstageQueryForArticleIdResponse }>(
		`/blog/article/query/for/articleId`,
		data
	);
};
export const postBlogarticlequeryforarticleTreeId = <NUDATA extends (keyof AT_BlogQueryForArticleIdRequest)[] = []>(
	data: U_I_NoNull<AT_BlogQueryForArticleIdRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_BlogQueryForArticleIdResponse[] }>(`/blog/article/query/for/articleTreeId`, data);
};
export const postBlogarticleliketitlequery = <NUDATA extends (keyof AT_BlogArticleLikeTitleRequest)[] = []>(
	data: U_I_NoNull<AT_BlogArticleLikeTitleRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: { total: number; arr: AT_BlogArticleLikeTitleResponse[] } }>(
		`/blog/article/like/title/query`,
		data
	);
};
export const postBlogarticlearticleInterview = <NUDATA extends (keyof AT_BlogArticleInterviewRequest)[] = []>(
	data: U_I_NoNull<AT_BlogArticleInterviewRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/blog/article/articleInterview`, data);
};
export const postBlogarticletreeallquery = () => {
	return axios.post<{ status: number; message: string; content: AT_ArticleTreeTable[] }>(`/blog/article-tree/all/query`);
};
export const getBloghotarticlequery = (limit: number) => {
	return axios.get<{ status: number; message: string; content: AT_BlogHotArticleQueryResponse[] }>(
		`/blog/hot/article/query?${limit ? 'limit=' + limit : ''}`
	);
};
export const postBlogarticlesquerybyTagId = <NUDATA extends (keyof AT_BlogArticleQueryByTagIdRequest)[] = []>(
	data: U_I_NoNull<AT_BlogArticleQueryByTagIdRequest, NUDATA>
) => {
	return axios.post<{ status: number; message: string; content: { total: number; arr: AT_BlogArticleQueryByTagIdResponse[] } }>(
		`/blog/articles/query/byTagId`,
		data
	);
};
export const postBlogtagsquery = <NUDATA extends (keyof AT_BlogTagsQueryRequest)[] = []>(data: U_I_NoNull<AT_BlogTagsQueryRequest, NUDATA>) => {
	return axios.post<{ status: number; message: string; content: { total: number; arr: AT_BlogTagsQueryResponse[] } }>(`/blog/tags/query`, data);
};
export const getBloghottagsquery = (limit: number) => {
	return axios.get<{ status: number; message: string; content: AT_BlogHotTagsQueryResponse[] }>(
		`/blog/hot/tags/query?${limit ? 'limit=' + limit : ''}`
	);
};
export const postFileupload = <NUDATA extends (keyof AT_FileUploadRequest)[] = []>(data: U_I_NoNull<AT_FileUploadRequest, NUDATA>) => {
	return axios.post<{ status: number; message: string; content: AT_FileUploadResult[] }>(`/file/upload`, data);
};
export const getRouterconfiguserrouterquery = () => {
	return axios.get<{ status: number; message: string; content: AT_RouterQueryResponse[] }>(`/router-config/user/router/query`);
};
export const postUserdelete = <NUDATA extends (keyof AT_UserDeleteRequest)[] = []>(data: U_I_NoNull<AT_UserDeleteRequest, NUDATA>) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/user/delete`, data);
};
export const postUserlogin = <NUDATA extends (keyof AT_UserLoginRequest)[] = []>(data: U_I_NoNull<AT_UserLoginRequest, NUDATA>) => {
	return axios.post<{ status: number; message: string; content: AT_UserLoginResponse }>(`/user/login`, data);
};
export const postUserallquery = <NUDATA extends (keyof AT_UserQueryAllRequest)[] = []>(data: U_I_NoNull<AT_UserQueryAllRequest, NUDATA>) => {
	return axios.post<{ status: number; message: string; content: { total: number; arr: AT_UserQueryAllResponse[] } }>(`/user/all/query`, data);
};
export const postUserregister = <NUDATA extends (keyof AT_UserRegisterRequest)[] = []>(data: U_I_NoNull<AT_UserRegisterRequest, NUDATA>) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/user/register`, data);
};
export const postUserupdate = <NUDATA extends (keyof AT_UserUpdateRequest)[] = []>(data: U_I_NoNull<AT_UserUpdateRequest, NUDATA>) => {
	return axios.post<{ status: number; message: string; content: AT_MySQLResult[] }>(`/user/update`, data);
};
export declare interface AT_ArticleBatchUpdateTagRequest {
	tag_id: number;
	article_ids: number[];
}

export declare interface AT_QueryArticleSingleByTagIdResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章新增时间*/
	add_time: string;
	/*作者*/
	user_name: string;
}

export declare interface AT_ArticleTagAddRequest {
	id: number;
}

export declare interface AT_RouterQueryResponse {
	title: string;
	children: AT_RouterConfigUserRouterQueryResponse[];
}

export declare interface AT_FileUploadRequest {
	/*文件流*/
	file: string;
}

export declare interface AT_FileUploadResult {
	/*字段名*/
	fieldname: string;
	/*上传文件名*/
	originalname: string;
	/*文件编码*/
	encoding: string;
	/*文件类型*/
	mimetype: string;
	/*保存路径*/
	destination: string;
	/*保存文件名*/
	filename: string;
	/*保存文件路径*/
	path: string;
	/*文件大小*/
	size: number;
}

export declare interface AT_BlogBackstageArticleDraftTurnWaitReviewRequest {
	/*文章id*/
	articleId: number;
}

export enum AT_UserStanding {
	普通用户 = 1,
	管理员 = 2,
}

export enum AT_ArticleStatus {
	草稿 = 1,
	待审 = 2,
	公开 = 3,
	私有 = 4,
	驳回 = 5,
}

export declare interface AT_SelectListItem {
	/*文本*/
	label: string;
	/*值*/
	value: number;
}

export declare interface AT_BlogBackstageArticleEditRequest {
	/*编辑文章的id*/
	articleId: number;
	/*编辑文章的标题*/
	title: string;
	/*编辑文章的内容*/
	content: string;
	/*编辑文章的内容（包含html标签元素）*/
	content_html: string;
	/*文章树id*/
	article_tree_id: number;
	/*文章标签列表*/
	articleTags: number[];
}

export declare interface AT_RouterMeta {
	/*是否缓存路由组件*/
	keepAlive: boolean;
	/*是否是系统业务页面*/
	systemPage: boolean;
	/*页面标题*/
	title: string;
}

export declare interface AT_RouterConfigUserRouterQueryResponse {
	/*路由路径*/
	path: string;
	/*路由组件名*/
	componentName: string;
	meta: AT_RouterMeta;
	/*路由Name*/
	name: string;
}

export declare interface AT_ArticleTagsTagsQueryResponse {
	/*标签id*/
	id: number;
	/*标签名称*/
	tag_name: string;
}

export declare interface AT_ArticleTagsTagsQueryRequest {
	/*要获取的页数*/
	pageIndex: number;
	/*每页显示的标签数量*/
	pageSize: number;
	/*标签名tagName查询*/
	tagName: string;
}

export declare interface AT_UserQueryAllResponse {
	/*用户id*/
	id: number;
	/*用户名*/
	user_name: string;
	/*用户密码*/
	pass_word: string;
	/*用户code*/
	user_code: string;
	/*用户类型id*/
	user_standing_id: number;
	/*用户类型名称*/
	standing_name: string;
	/*用户类型值*/
	standing_value: AT_UserStanding;
}

export declare interface AT_UserQueryAllRequest {
	/*要获取的页数*/
	pageIndex: number;
	/*每页显示的用户数量*/
	pageSize: number;
}

export declare interface AT_UserLoginResponse {
	/*用户id*/
	id: number;
	/*用户token*/
	token: string;
	/*用户名*/
	user_name: string;
	/*用户Code*/
	user_code: string;
	/*用户身份*/
	standing: AT_UserStanding;
}

export declare interface AT_UserLoginRequest {
	/*用户名*/
	userName: string;
	/*加密密码*/
	passWord: string;
}

export declare interface AT_BlogHotTagsQueryResponse {
	/*标签id*/
	id: number;
	/*标签下文章数量*/
	article_count: number;
	/*标签名称*/
	tag_name: string;
}

export declare interface AT_BlogTagsQueryResponse {
	/*标签id*/
	id: number;
	/*标签名称*/
	tag_name: string;
}

export declare interface AT_BlogTagsQueryRequest {
	/*要获取的页数*/
	pageIndex: number;
	/*每页显示的标签数量*/
	pageSize: number;
	/*标签名tagName查询*/
	tagName: string;
}

export declare interface AT_BlogArticleQueryByTagIdResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*文章发布时间*/
	add_time: string;
}

export declare interface AT_BlogArticleQueryByTagIdRequest {
	/*要获取的页数*/
	pageIndex: number;
	/*每页显示的文章数量*/
	pageSize: number;
	/*标签id tagId查询*/
	tagId: number;
}

export declare interface AT_BlogHotArticleQueryResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*作者id*/
	author: number;
	/*作者名*/
	author_name: string;
	/*文章发布时间*/
	add_time: string;
	/*文章标签*/
	tags: string;
}

export declare interface AT_BlogArticleInterviewRequest {
	/*文章id*/
	articleId: number;
}

export declare interface AT_BlogArticleLikeTitleResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*作者id*/
	author: number;
	/*作者名称*/
	author_name: string;
	/*文章发布时间*/
	add_time: string;
	/*文章标签*/
	tags: string;
}

export declare interface AT_BlogArticleLikeTitleRequest {
	/*要获取的页数*/
	pageIndex: number;
	/*每页显示的文章数量*/
	pageSize: number;
	/*文章标题模糊查询*/
	title: string;
}

export declare interface AT_BlogQueryForArticleIdResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*文章发布时间*/
	add_time: string;
	/*文章标签*/
	tags: string;
}

export declare interface AT_BlogQueryForArticleIdRequest {
	/*文章树id*/
	article_tree_id: number;
}

export declare interface AT_BlogBackstageQueryForArticleIdResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*作者id*/
	author: number;
	/*作者名称*/
	author_name: string;
	/*文章发布时间*/
	add_time: string;
	/*文章的内容*/
	content: string;
	/*文章的内容（包含html标签元素）*/
	content_html: string;
	/*文章标签*/
	tags: string;
}

export declare interface AT_BlogBackstageQueryForArticleIdRequest {
	/*文章id*/
	articleId: number;
}

export declare interface AT_BlogBackstageArticleAddRequest {
	/*新增文章的标题*/
	title: string;
	/*新增文章的内容*/
	content: string;
	/*新增文章的内容（包含html标签元素）*/
	content_html: string;
	/*文章树id*/
	article_tree_id: number;
	articleTags: number[];
}

export declare interface AT_BlogBackstageArticleTakebackRequest {
	/*文章id*/
	articleId: number;
}

export declare interface AT_BlogBackstageArticleReviewRequest {
	/*文章id*/
	articleId: number;
}

export declare interface AT_BlogBackstageArticleRejectRequest {
	/*文章id*/
	articleId: number;
}

export declare interface AT_BlogBackstageArticleDraftAddRequest {
	/*新增文章的标题*/
	title: string;
	/*新增文章的内容*/
	content: string;
	/*新增文章的内容（包含html标签元素）*/
	content_html: string;
	/*文章树id*/
	article_tree_id: number;
	articleTags: number[];
}

export declare interface AT_BlogBackstageArticleDeleteRequest {
	/*文章id*/
	articleId: number;
}

export declare interface AT_BlogBackstageArticleQueryForAuthorResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*文章发布时间*/
	add_time: string;
	/*文章标签*/
	tags: string;
}

export declare interface AT_BlogBackstageArticleQueryForAuthorRequest {
	/*要获取的页数*/
	pageIndex: number;
	/*每页显示的文章数量*/
	pageSize: number;
	/*作者id*/
	author: number;
}

export declare interface AT_BlogBackstageArticleQueryForArticleTreeIdResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*文章发布时间*/
	add_time: string;
	/*文章标签*/
	tags: string;
}

export declare interface AT_BlogBackstageArticleQueryForArticleTreeIdRequest {
	/*文章树id*/
	article_tree_id: number;
}

export declare interface AT_BlogBackstageArticleQueryForArticleResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章内容*/
	content: string;
	/*文章内容HTML格式*/
	content_html: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*作者id*/
	author: number;
	/*作者名称*/
	author_name: string;
	/*文章发布时间*/
	add_time: string;
	/*文章标签拼接*/
	tag_names: string;
	/*文章标签id拼接*/
	tag_ids: string;
	/*文章标签列表*/
	tags: AT_SelectListItem[];
	/*文章所属目录id*/
	article_tree_id: number;
	/*文章所属目录名称*/
	article_tree_name: string;
}

export declare interface AT_BlogBackstageArticleQueryForArticleRequest {
	/*文章id*/
	articleId: number;
}

export declare interface AT_BlogBackstageArticleAllQueryResponse {
	/*文章id*/
	id: number;
	/*文章标题*/
	title: string;
	/*文章阅读量*/
	reading_quantity: number;
	/*文章发布时间*/
	add_time: string;
	/*文章标签*/
	tags: string;
	/*状态名称*/
	status_name: string;
	/*状态值*/
	status_value: AT_ArticleStatus;
	/*作者id*/
	author: number;
	/*作者名称*/
	author_name: string;
}

export declare interface AT_BlogBackstageArticleAllQueryRequest {
	/*要获取的页数*/
	pageIndex: number;
	/*每页显示的文章数量*/
	pageSize: number;
}

export declare interface AT_ArticleTreeArticleTreeNameQueryResponse {
	/*文章树id*/
	id: number;
	/*文章树名称*/
	article_tree_name: string;
	/*父级文章树id*/
	parent_article_tree_id: number;
}

export declare interface AT_ArticleTreeArticleTreeNameQueryRequest {
	/*要获取的页数*/
	pageIndex: number;
	/*每页显示的文章树数量*/
	pageSize: number;
	/*文章树名称articleTreeName*/
	articleTreeName: string;
}

export declare interface AT_ArticleTreeByIdDeleteRequest {
	/*文章树id*/
	article_tree_id: number;
}

export declare interface AT_UserRegisterRequest {
	/*用户名*/
	userName: string;
	/*加密密码*/
	passWord: string;
}

export declare interface AT_UserUpdateRequest {
	/*用户id*/
	author: number;
	/*加密密码*/
	passWord: string;
	/*邮箱*/
	email: string;
	/*是否接收邮件*/
	isReceiveEmail: number;
}

export declare interface AT_UserDeleteRequest {
	/*用户id*/
	author: number;
}

export declare interface AT_ArticleTreeTable {
	/*文章树id*/
	id: number;
	/*文章树标题*/
	article_tree_name: string;
	/*父级文章树*/
	parent_article_tree_id: string;
}

export declare interface AT_MySQLResult {
	/*描述*/
	fieldCount: number;
	/*描述*/
	affectedRows: number;
	/*描述*/
	insertId: number;
	/*描述*/
	info: string;
	/*描述*/
	serverStatus: number;
	/*描述*/
	warningStatus: number;
	/*描述*/
	changedRows: number;
}
