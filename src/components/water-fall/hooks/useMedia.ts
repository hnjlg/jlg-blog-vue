import { reactive, onUnmounted } from 'vue';
import { PropConfigType } from '../type';

export function useMediaValues(config: PropConfigType) {
	const info = reactive({
		columns: 1,
		gap: 1,
	});

	const { columns, gap, medias } = config;
	if (!medias) {
		return setInfo(0);
	}

	const mediaQueries = medias.map((media) => window.matchMedia(`(min-width: ${media}px)`));

	const onSizeChange = () => {
		let matches = 0;

		mediaQueries.forEach((mediaQuery) => {
			mediaQuery.matches && matches++;
		});

		const idx = Math.min(mediaQueries.length - 1, matches);
		setInfo(idx);
	};

	onSizeChange();

	mediaQueries.forEach((mediaQuery) => {
		mediaQuery.addEventListener('change', onSizeChange);
	});

	onUnmounted(() => {
		mediaQueries.forEach((mediaQuery) => {
			mediaQuery.removeEventListener('change', onSizeChange);
		});
	});

	function setInfo(idx: number) {
		info.columns = columns[idx];
		info.gap = gap[idx];
		return info;
	}

	return info;
}
