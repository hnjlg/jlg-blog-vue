import { I_MenuItem } from '@/views/blob/home/components/menu/type';
import { defineStore } from 'pinia';

const useTestStore = defineStore<
	string,
	{
		userInfo: {
			createTime: string;
			updateTime: string;
			userName: string;
			passWord: string;
			email: string;
			address: string;
			age: number;
			phone: number;
			isAdmin?: 0 | 1;
		};
	},
	{
		blobMenu: (state: {
			userInfo: {
				createTime: string;
				updateTime: string;
				userName: string;
				passWord: string;
				email: string;
				address: string;
				age: number;
				phone: number;
				isAdmin?: 0 | 1;
			};
		}) => I_MenuItem[];
	}
>('blobStore', {
	state: () => ({
		userInfo: {
			createTime: '2023-11-18T07:33:36.000+00:00',
			updateTime: '2023-11-18T07:33:38.000+00:00',
			userName: 'disaster',
			passWord: '123456',
			email: '123456@qq.com',
			address: '美利坚合众国',
			age: 100,
			phone: 17369427086,
		},
	}),
	getters: {
		blobMenu: (state) => {
			if (state.userInfo.isAdmin === 0) {
				return [
					{
						level: 1,
						title: 'Primary Function',
					},
					{
						level: 2,
						title: '模型预测',
						pathName: 'model-prediction',
						icon: 'undraw_articles_wbpb_svg',
					},
					{
						level: 2,
						title: '数据分析',
						pathName: 'data-analysis',
						icon: 'undraw_blog_post_re_fy5x_svg',
					},
					{
						level: 2,
						title: '个人中心',
						pathName: 'individual-center',
						icon: 'undraw_body_text_re_9riw_svg',
					},
					{
						level: 1,
						title: 'Other',
					},
					{
						level: 2,
						title: 'About The Project',
						pathName: 'about-the-project',
						icon: 'undraw_publish_article_re_3x8h_svg',
					},
				];
			} else if (state.userInfo.isAdmin === 1) {
				return [
					{
						level: 1,
						title: 'Primary Function',
					},
					{
						level: 2,
						title: '样本管理',
						pathName: 'sample-management',
						icon: 'undraw_my_personal_files_re_3q0p_svg',
					},
					{
						level: 2,
						title: '用户管理',
						pathName: 'user-management',
						icon: 'undraw_online_article_re_daq5_svg',
					},
					{
						level: 2,
						title: '日志管理',
						pathName: 'log-management',
						icon: 'undraw_online_articles_re_yrkj_svg',
					},
					{
						level: 2,
						title: '系统监控',
						pathName: 'system-monitoring',
						icon: 'undraw_online_information_re_erks_svg',
					},
					{
						level: 1,
						title: 'Other',
					},
					{
						level: 2,
						title: 'About The Project',
						pathName: 'about-the-project',
						icon: 'undraw_publish_article_re_3x8h_svg',
					},
				];
			} else {
				return [
					{
						level: 1,
						title: 'Primary Function',
					},
					{
						level: 2,
						title: '模型预测',
						pathName: 'model-prediction',
						icon: 'undraw_articles_wbpb_svg',
					},
					{
						level: 2,
						title: '数据分析',
						pathName: 'data-analysis',
						icon: 'undraw_blog_post_re_fy5x_svg',
					},
					{
						level: 2,
						title: '个人中心',
						pathName: 'individual-center',
						icon: 'undraw_online_information_re_erks_svg',
					},
					{
						level: 2,
						title: '样本管理',
						pathName: 'sample-management',
						icon: 'undraw_articles_wbpb_svg',
					},
					{
						level: 2,
						title: '用户管理',
						pathName: 'user-management',
						icon: 'undraw_blog_post_re_fy5x_svg',
					},
					{
						level: 2,
						title: '日志管理',
						pathName: 'log-management',
						icon: 'undraw_body_text_re_9riw_svg',
					},
					{
						level: 2,
						title: '系统监控',
						pathName: 'system-monitoring',
						icon: 'undraw_online_information_re_erks_svg',
					},
					{
						level: 1,
						title: 'Other',
					},
					{
						level: 2,
						title: 'About The Project',
						pathName: 'about-the-project',
						icon: 'undraw_publish_article_re_3x8h_svg',
					},
					{
						level: 2,
						title: '404',
						pathName: 'c',
					},
				];
			}
		},
	},
	actions: {},
});

export default useTestStore;
