import { defineStore } from 'pinia';

const useBlobStore = defineStore('blobStore', {
	state: () => ({
		userInfo: localStorage.getItem('blog-backend-userInfo') === 'undefined' ? '' : JSON.parse(localStorage.getItem('blog-backend-userInfo') ?? '{}'),
	}),
	getters: {},
	actions: {
		changeUserInfo(userInfo) {
			this.userInfo = userInfo;
			localStorage.setItem('blog-backend-userInfo', JSON.stringify(userInfo));
		},
		clearUserInfo() {
			this.userInfo = undefined;
			localStorage.removeItem('blog-backend-userInfo');
		},
	},
});

export default useBlobStore;
