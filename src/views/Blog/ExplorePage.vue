<template>
	<ion-page>
		<ion-header>
			<ion-toolbar class="py-4 pr-4">
				<div class="flex justify-between">
					<ion-title
						class="max-w-fit py-2 px-3 bg-blue-500 rounded-tr-xl rounded-br-xl text-white font-semibold"
						>U-Blog</ion-title
					>
					<div></div>
					<div class="h-6 w-6 self-center">
						<template v-if="auth.status.user?.profileImage">
							<img
								src="https://xsgames.co/randomusers/assets/avatars/male/17.jpg"
								alt="profile pic"
								class="object-cover rounded-md"
							/>
						</template>
						<template v-else>
							<img
								src="https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg"
								alt="profile icon"
							/>
						</template>
					</div>
				</div>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" ref="contentSection">
			<div class="p-6">
				<form @submit.prevent="">
					<div
						class="relative text-gray-600 focus-within:text-gray-400"
					>
						<span
							class="absolute inset-y-0 left-0 flex items-center pl-2"
						>
							<button
								type="submit"
								class="p-1 focus:outline-none focus:shadow-outline"
							>
								<svg
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									viewBox="0 0 24 24"
									class="w-6 h-6"
								>
									<path
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									></path>
								</svg>
							</button>
						</span>
						<input
							type="search"
							name="search"
							class="py-2 text-sm min-w-full text-gray-900 bg-gray-100 rounded-full pl-10 focus:outline-none"
							placeholder="Search..."
							autocomplete="off"
						/>
					</div>
				</form>

				<div class="flex justify-between mt-10 px-4">
					<button class="hover:font-bold">Featured</button>
					<button class="hover:font-bold">Latest</button>
					<button class="hover:font-bold">Trending</button>
				</div>

				<!-- blog posts list -->
				<div class="mt-14 space-y-10">
					<template v-if="data.hasPosts">
						<template v-for="post in data.posts" :key="post.id">
							<div class="flex space-x-4">
								<div
									class="w-36 h-36 cursor-pointer flex-shrink-0"
									@click="
										showSinglePost(
											post['id'],
											post['user']['id']
										)
									"
								>
									<img
										:src="post['thumbnail_url']"
										class="rounded-md object-fill w-full h-full"
										alt="thumb pic"
									/>
								</div>
								<div class="flex flex-col space-y-2 w-40">
									<h1
										class="text-lg font-semibold cursor-pointer"
										@click="
											showSinglePost(
												post['id'],
												post['user']['id']
											)
										"
									>
										{{ post["title"] }}
									</h1>
									<small class="text-blue-500">{{
										post["user"]["name"]
									}}</small>
									<small>10 likes</small>
								</div>
							</div>
						</template>
						<PaginationPage
							:links="data.links"
							@paginate-next="getNextPosts"
						/>
					</template>
					<template v-else>
						<h1 class="text-lg font-semibold">No post available</h1>
					</template>
				</div>

				<div class="mb-20 bottom-0 right-5 fixed">
					<ion-fab horizontal="end" @click="createPost">
						<ion-fab-button>
							<ion-icon :icon="add"></ion-icon>
						</ion-fab-button>
					</ion-fab>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonFab,
	IonFabButton,
	IonIcon,
	onIonViewWillEnter,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref, inject } from "vue";
import { useHeaders } from "@/composables/headers";

const auth = useAuthStore();

const axios: any = inject("axios");

const data = reactive({
	hasPosts: false,
	links: null,
	posts: null,
});

const contentSection: any = ref(null);

onIonViewWillEnter(async () => {
	await getPosts();
});

const getPosts = async () => {
	try {
		const getRes = await axios.get("/posts", useHeaders());

		if (getRes.status == 200) {
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

const showSinglePost = (postId: number, userId: number) => {
	if (userId == auth?.status?.user?.id) {
		router.push(`/app/account/posts/${postId}/show`);
		return;
	}

	router.push(`/app/users/${userId}/posts/${postId}/show`);
};

const createPost = () => {
	router.push("/account/posts/create");
};
</script>
