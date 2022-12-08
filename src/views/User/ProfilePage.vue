<template>
	<ion-page>
		<ion-content :fullscreen="true" ref="contentSection">
			<div class="px-4 pb-4 mt-4">
				<ion-icon :icon="arrowBackOutline" class="w-5 h-5 mb-1" @click="router.back()"></ion-icon>
				<div class="flex space-x-6">
					<div class="w-36">
						<img
							:src="
								data?.user?.['profile_image_url']
									? data?.user?.['profile_image_url']
									: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg'
							"
							alt="profile pic"
							class="object-fill rounded-full w-full h-full"
						/>
					</div>
					<div class="w-full">
						<li class="flex space-x-4">
							<ul class="flex flex-col text-center font-semibold">
								100
								<span class="font-normal">follwers</span>
							</ul>
							<ul class="flex flex-col text-center font-semibold">
								100
								<span class="font-normal">following</span>
							</ul>
							<ul class="flex flex-col text-center font-semibold">
								100
								<span class="font-normal">posts</span>
							</ul>
						</li>
					</div>
				</div>
				<div class="mt-4">
					<h2 class="text-lg font-semibold">
						{{ data?.user?.['name'] }}
					</h2>
					<p class="text-sm">
						{{
							data?.user?.['bio']
								? data?.user?.['bio']
								: "No bio yet"
						}}
					</p>
				</div>
				<div class="mt-5">
					<button
						class="w-full bg-blue-500 text-white rounded-md outline-none py-1"
					>
						follow
					</button>
				</div>
				<template v-if="data.hasPosts">
					<div class="space-y-5 mt-10">
						<template v-for="post in data.posts" :key="post.id">
							<div
								class="space-y-3 bg-gray-100 hover:bg-gray-50 rounded-md p-2.5"
								@click="
									router.push(
										`/app/users/${data?.user?.['id']}/posts/${post['id']}/show`
									)
								"
							>
								<div class="flex justify-center">
									<img
										:src="post['thumbnail_url']"
										class="rounded-md object-fill"
										alt="thumb pic"
									/>
								</div>
								<div>
									<div
										class="flex justify-between mb-3 text-sm font-light"
									>
										<p>
											posted on {{ post["created_at"] }}
										</p>
										<p>{{ post["likes_count"] }} likes</p>
									</div>
									<h2 class="text-lg font-semibold">
										{{ post["title"] }}
									</h2>
								</div>
							</div>
						</template>
						<PaginationPage
							:links="data.links"
							@paginate-next="getNextPosts"
						/>
					</div>
				</template>
				<template v-else>
					<div class="mt-10">
						<h1 class="text-lg">No post created</h1>
					</div>
				</template>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonIcon, onIonViewWillEnter } from "@ionic/vue";
import { arrowBackOutline } from "ionicons/icons";
import router from "@/router";
import { useRoute } from "vue-router";
import { inject, reactive, ref } from "vue";
import { useHeaders } from "@/composables/headers";

const route = useRoute();

const axios: any = inject("axios");

const contentSection: any = ref(null);

const data = reactive({
	hasPosts: false,
	links: null,
	posts: null,
	user: null,
});

onIonViewWillEnter(async () => {
	await getPosts();
});

const getPosts = async () => {
	try {
		const getRes = await axios.get(
			`users/${route.params.user}/posts`,
			useHeaders()
		);

		if (getRes.status == 200) {
			data.user = getRes.data.user;
			if (getRes.data.posts.data.length > 0) {
				data.hasPosts = true;
				data.posts = getRes.data.posts.data;
				data.links = getRes.data.posts.links;
			}
		}
	} catch (error: any) {
		console.log(error);
	}
};

const getNextPosts = async (link: string) => {
	try {
		const nextPostsRes = await axios.get(link, useHeaders());

		if (nextPostsRes.status == 200) {
			contentSection?.value?.$el?.scrollToPoint?.(0, 11, 1000);

			if (nextPostsRes.data.posts.data.length > 0) {
				data.hasPosts = true;
				data.posts = nextPostsRes.data.posts.data;
				data.links = nextPostsRes.data.posts.links;
			}
		}
	} catch (error: any) {
		console.log(error);
	}
};
</script>
