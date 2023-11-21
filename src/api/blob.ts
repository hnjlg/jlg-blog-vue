import request from '@/request/blob';

export declare interface I_BlobUser extends I_RegisterModel {
	createTime: string;
	updateTime: string;
}

export declare interface I_RegisterModel {
	id: string;
	userName: string;
	passWord: string;
	surePassWord?: string;
	email: string;
	address?: string;
	age?: number;
	phone: number | null;
	isAdmin: 0 | 1 | 2;
	token: string;
}

export const blobRegister = (data: I_RegisterModel) => {
	return request.post<{
		status: boolean;
		code: 200 | 500;
		data: I_BlobUser;
		msg: string;
	}>('/analysis/application/account/register', data);
};

export declare interface I_LoginModel {
	userName: string;
	passWord: string;
}

export const blobLogin = (data: I_LoginModel) => {
	return request.post<{
		status: boolean;
		code: 200 | 500;
		data: I_BlobUser;
		msg: string;
	}>('/analysis/application/account/login', data);
};

export declare interface I_ModelModel {
	id?: string;
	createTime: string;
	updateTime: string;
	userId: string;
	context: string;
	aspectTerm: string;
	image: string;
	result: '消极' | '中性' | '积极';
}

export const blobModelQuery = (pageNo: number, pageSize: number, data?: Partial<I_ModelModel>) => {
	return request.post<{
		status: boolean;
		code: 200 | 500;
		data: {
			records: I_ModelModel[];
			total: number;
			size: number;
			current: number;
			orders: [];
			optimizeCountSql: boolean;
			searchCount: boolean;
			countId: null | number;
			maxLimit: null | number;
			pages: number;
		};
		msg: string;
	}>(`/analysis/application/model/query?pageNo=${pageNo}&pageSize=${pageSize}`, data);
};

export const blobModelDelete = (row: I_ModelModel) => {
	return request.post<{ code: 200 | 500; data: string; msg: string; status: true }>('/analysis/application/model/delete', row);
};

export const blobGetCsInfo = () => {
	return request.get('/analysis/application/monitor/getCsInfo');
};

export const blobAccountQuery = (pageNo: number, pageSize: number, data?: I_RegisterModel) => {
	return request.post<{
		status: boolean;
		code: 200 | 500;
		data: {
			records: I_RegisterModel[];
			total: number;
			size: number;
			current: number;
			orders: [];
			optimizeCountSql: boolean;
			searchCount: boolean;
			countId: null | number;
			maxLimit: null | number;
			pages: number;
		};
		msg: string;
	}>(`/analysis/application/account/query?pageNo=${pageNo}&pageSize=${pageSize}`, data);
};

export const blobAccountDelete = (row: { id: I_RegisterModel['id'] }) => {
	return request.post<{ code: 200 | 500; data: string; msg: string; status: true }>('/analysis/application/account/delete', row);
};

export declare interface I_LogModel {
	id: string;
	operate: string;
	userId: number;
	userName: string;
}

export const blobLogQuery = (pageNo: number, pageSize: number, data?: I_LogModel) => {
	return request.post<{
		status: boolean;
		code: 200 | 500;
		data: {
			records: I_LogModel[];
			total: number;
			size: number;
			current: number;
			orders: [];
			optimizeCountSql: boolean;
			searchCount: boolean;
			countId: null | number;
			maxLimit: null | number;
			pages: number;
		};
		msg: string;
	}>(`/analysis/application/log/query?pageNo=${pageNo}&pageSize=${pageSize}`, data);
};

export declare interface I_DataAnalysisData {
	all: number;
	analysis: { result: I_ModelModel['result']; num: number }[];
}

export const blobDataAnalysis = () => {
	return request.get<{ code: 200 | 500; data: I_DataAnalysisData; msg: string }>('/analysis/application/data/analysis');
};

export const blobModelInsert = (
	data: I_ModelModel & {
		createTime?: string;
		updateTime?: string;
	}
) => {
	return request.post<{ code: 200 | 500; data: string; msg: string; status: true }>('/analysis/application/model/insert', data);
};

export const blobAccountUpdate = (data: Partial<I_RegisterModel>) => {
	return request.post('/analysis/application/account/update', data);
};
