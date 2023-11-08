<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import useTestStore from '@/store/index';

const testStore = useTestStore();
ElMessage({
	message: 'Congrats, this is a success message.',
	type: 'success',
});
const a = ref(1);
console.log(import.meta.env.VITE_APP_ENV);
</script>

<template>
	<div style="border: 1px solid red; width: 100vw; height: 100vh">
		{{ testStore.count }}
		{{ testStore.doubleCount }}
		<el-button @click="testStore.changeCount(++testStore.count)">按钮</el-button>
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
		{{ a }}
	</div>
	<HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
