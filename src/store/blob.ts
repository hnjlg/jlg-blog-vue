import { I_BlobUser } from '@/api/blob';
import { T_MenuItem } from '@/views/blob/home/components/menu/type';
import { defineStore } from 'pinia';

const useBlobStore = defineStore<
	string,
	{
		userInfo: I_BlobUser | null;
	},
	{
		blobMenu: (state: { userInfo: I_BlobUser | null }) => T_MenuItem[];
	},
	{
		changeUserInfo: (userInfo: I_BlobUser | null) => void;
	}
>('blobStore', {
	state: () => ({
		userInfo: localStorage.getItem('blob-userInfo') === 'undefined' ? '' : JSON.parse(localStorage.getItem('blob-userInfo') ?? '{}'),
	}),
	getters: {
		blobMenu: (state) => {
			if (state.userInfo?.isAdmin === 0) {
				return [
					{
						level: 1,
						title: 'Primary Function',
					},
					{
						level: 2,
						pathName: 'model-prediction',
					},
					{
						level: 2,
						pathName: 'data-analysis',
					},
					{
						level: 2,
						pathName: 'individual-center',
					},
					{
						level: 1,
						title: 'Other',
					},
					{
						level: 2,
						pathName: 'about-the-project',
					},
				];
			} else if (state.userInfo?.isAdmin === 1) {
				return [
					{
						level: 1,
						title: 'Primary Function',
					},
					{
						level: 2,
						pathName: 'sample-management',
					},
					{
						level: 2,
						pathName: 'user-management',
					},
					{
						level: 2,
						pathName: 'log-management',
					},
					{
						level: 2,
						pathName: 'system-monitoring',
					},
					{
						level: 1,
						title: 'Other',
					},
					{
						level: 2,
						pathName: 'about-the-project',
					},
				];
			} else {
				return [
					{
						level: 2,
						pathName: 'about-the-project',
					},
					{
						level: 2,
						pathName: 'blob-404',
					},
				];
			}
		},
	},
	actions: {
		changeUserInfo(userInfo: I_BlobUser) {
			this.userInfo = userInfo;
			localStorage.setItem('blob-userInfo', JSON.stringify(userInfo));
		},
	},
});

export default useBlobStore;
