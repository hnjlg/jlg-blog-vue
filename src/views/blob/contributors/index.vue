<template>
	<div class="blob-contributors-container">
		<water-fall
			v-slot="slotProps"
			:data="data"
			:config="{
				columns: [1, 2, 3],
				gap: [24, 12, 6],
				medias: [640, 1024, 1280],
			}"
		>
			<div>{{ slotProps.data }}</div>
			<contributor-card></contributor-card>
		</water-fall>
	</div>
</template>

<script setup lang="ts">
import WaterFall from '@/components/water-fall/index.vue';
import ContributorCard from './components/contributor-card/index.vue';
defineOptions({
	name: 'BlobContributors',
});

const data = [{ a: 1 }, { a: 2 }, { a: 3 }];
</script>
