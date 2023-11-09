<template>
	<div class="about-container">about</div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';

defineOptions({
	name: 'TestAbout',
});
onMounted(() => {
	console.log(gsap, 'gsap');
	gsap.to('.about-container', { duration: 1, x: 100 });
	console.log('TestAbout');
});
</script>
