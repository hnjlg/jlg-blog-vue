import { gsap } from 'gsap';
import { RouteMeta } from 'vue-router';

export const currentShow = ref<'content-background' | 'content'>('content');

export const blobHomeContentBackgroundHandleClick = (meta: RouteMeta) => {
	nextTick(() => {
		const BackgroundDivElement = document.getElementById('blob-home-content-background');
		const DivElement = document.getElementById('blob-home-content');
		const RightContent = document.getElementById('blob-home-content-right-content');
		if (RightContent) {
			gsap.fromTo(RightContent, { y: 100 }, { y: 0, duration: 0.6 });
		}
		if (!BackgroundDivElement || !DivElement) {
			return;
		}
		if (meta.backgroundShow && currentShow.value === 'content') {
			gsap.fromTo(BackgroundDivElement, { zIndex: 1, rotate: '8deg', duration: 1 }, { zIndex: 2, rotate: '-2deg', duration: 1 });
			gsap.fromTo(DivElement, { zIndex: 2, rotate: '-2deg', duration: 1 }, { zIndex: 1, rotate: '8deg', duration: 1 });
			currentShow.value = 'content-background';
		}
		if (!meta.backgroundShow && currentShow.value === 'content-background') {
			gsap.fromTo(BackgroundDivElement, { zIndex: 2, rotate: '-2deg', duration: 1 }, { zIndex: 1, rotate: '8deg', duration: 1 });
			gsap.fromTo(DivElement, { zIndex: 1, rotate: '8deg', duration: 1 }, { zIndex: 2, rotate: '-2deg', duration: 1 });
			currentShow.value = 'content';
		}
	});
};
