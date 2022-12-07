<template>
	<div v-if="links?.length > 3">
		<div class="flex flex-wrap mt-8 cursor-pointer justify-center">
			<template v-for="link in links" :key="link">
				<div
					v-if="link['url'] === null"
					class="mr-1 mb-1 px-4 py-3 text-sm cursor-not-allowed leading-4 text-gray-400 border rounded"
					v-html="link['label']"
				/>

				<button
					v-else
					class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-indigo-200 focus:border-primary focus:text-primary"
					:class="{ 'bg-indigo-200': link['active'] }"
					@click="$emit('paginateNext', link['url'])"
					v-html="link['label']"
				/>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
	links: Object,
});
</script>
