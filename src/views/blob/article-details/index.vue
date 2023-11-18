<template>
	<div>文章详情页面{{ route.query.id }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
defineOptions({
	name: 'ArticleDetails',
});

const route = useRoute();
</script>
