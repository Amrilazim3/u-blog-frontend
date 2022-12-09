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
					<div class="self-center">
						<template v-if="auth.status.user?.profileImage">
							<img
								:src="auth.status.user?.profileImage"
								alt="profile pic"
								class="object-cover rounded-md h-6 w-6"
								@click="openPopover"
							/>
						</template>
						<template v-else>
							<img
								src="https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg"
								alt="profile icon"
								class="object-cover rounded-md h-6 w-6"
								@click="openPopover"
							/>
						</template>
					</div>
					<ion-popover
						:is-open="isOpenPopover"
						:event="event"
						@didDismiss="isOpenPopover = false"
					>
						<ion-content class="ion-padding">
							<button
								class="w-full text-left text-sm font-semibold rounded-md text-gray-800 hover:bg-blue-100 p-1.5"
								@click="
									isOpenPopover = false;
									router.push('/app/account/profile');
								"
							>
								Profile
							</button>
							<button
								class="w-full text-left text-sm font-semibold rounded-md text-red-500 hover:bg-blue-100 p-1.5"
								@click="logout"
							>
								Logout
							</button>
						</ion-content>
					</ion-popover>
				</div>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" ref="contentSection">
			<div class="p-6">
				<div class="relative text-gray-600 focus-within:text-gray-400">
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
						class="py-2 text-sm min-w-full text-gray-900 bg-gray-100 rounded-full pl-10 focus:outline-none z-10"
						placeholder="Search..."
						autocomplete="off"
						@keyup="search($event)"
						@focus="search($event)"
						@click="OpenSearchPopover"
					/>
				</div>
				<ion-popover
					:is-open="isOpenSearchPopover"
					:event="event"
					@didDismiss="isOpenSearchPopover = false"
					size="cover"
				>
					<ion-content class="ion-padding">
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
								class="py-2 text-sm min-w-full text-gray-900 bg-gray-100 rounded-full pl-10 focus:outline-none z-10"
								placeholder="Search..."
								autocomplete="off"
								@keyup="search($event)"
								@focus="search($event)"
								@click="OpenSearchPopover"
							/>
						</div>
						<div class="mt-3 space-y-3 divide-y-2 divide-gray-500">
							<div class="space-y-1 divide-y divide-gray-300">
								<h3 class="text-sm font-semibold">Users</h3>
								<template
									v-if="
										searchData.users !== null &&
										searchData?.users?.length !== 0
									"
								>
									<template
										v-for="user in searchData.users"
										:key="user.id"
									>
										<div
											class="pt-2 text-sm flex space-x-3"
											@click="
												visitProfilePage(user['id']);
												isOpenSearchPopover = false;
											"
										>
											<img
												:src="
													user['profile_image_url']
														? user['profile_image_url']
														: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg'
												"
												alt="profile image"
												class="w-8 h-8 object-cover"
											/>
											<p class="self-center">
												{{ user["name"] }}
											</p>
										</div>
									</template>
								</template>
								<template v-else>
									<h3 class="pt-2 text-sm">No results</h3>
								</template>
							</div>
							<div class="space-y-1 divide-y divide-gray-300">
								<h3 class="mt-2 text-sm font-semibold">
									Posts
								</h3>
								<template
									v-if="
										searchData.posts !== null &&
										searchData?.posts?.length !== 0
									"
								>
									<template
										v-for="post in searchData.posts"
										:key="post.id"
									>
										<div
											class="pt-2 text-sm flex"
											@click="
												showSinglePost(
													post['id'],
													post['user_id']
												);
												isOpenSearchPopover = false;
											"
										>
											<p>{{ post["title"] }}</p>
										</div>
									</template>
								</template>
								<template v-else>
									<h3 class="pt-2 text-sm">No results</h3>
								</template>
							</div>
						</div>
					</ion-content>
				</ion-popover>

				<div class="flex justify-between mt-10 px-4">
					<button
						class="hover:font-bold"
						:class="isActiveFeatured ? 'font-bold' : ''"
						@click="featuredPosts"
					>
						Featured
					</button>
					<button
						class="hover:font-bold"
						:class="isActiveLatest ? 'font-bold' : ''"
						@click="latestPosts"
					>
						Latest
					</button>
					<button
						class="hover:font-bold"
						:class="isActiveTrending ? 'font-bold' : ''"
						@click="trendingPosts"
					>
						Trending
					</button>
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
										class="rounded-md object-cover w-full h-full"
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
									<small
										class="text-blue-500"
										@click="
											visitProfilePage(post['user']['id'])
										"
										>{{ post["user"]["name"] }}</small
									>
									<small
										>{{ post["likes_count"] }} likes</small
									>
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
	IonPopover,
	onIonViewWillEnter,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref, inject } from "vue";
import { useHeaders } from "@/composables/headers";
import { debounce } from "vue-debounce";

const auth = useAuthStore();

const axios: any = inject("axios");

const data = reactive({
	hasPosts: false,
	links: null,
	posts: null,
});

const isActiveFeatured = ref(false);
const isActiveLatest = ref(false);
const isActiveTrending = ref(false);

type SearchData = {
	posts: any;
	users: any;
};

const searchData: SearchData = reactive({
	posts: null,
	users: null,
});

const contentSection: any = ref(null);

const event = ref();

const isOpenPopover = ref(false);

const isOpenSearchPopover = ref(false);

onIonViewWillEnter(async () => {
	await getPosts();
});

const getPosts = async () => {
	try {
		const getRes = await axios.get("/posts", useHeaders());

		if (getRes.status == 200) {
			isActiveFeatured.value = false;
			isActiveLatest.value = false;
			isActiveTrending.value = false;

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

const featuredPosts = async () => {
	try {
		const getRes = await axios.get("/posts/featured", useHeaders());

		if (getRes.status == 200) {
			isActiveFeatured.value = true;
			isActiveLatest.value = false;
			isActiveTrending.value = false;

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

const latestPosts = async () => {
	try {
		const getRes = await axios.get("/posts/latest", useHeaders());

		if (getRes.status == 200) {
			isActiveFeatured.value = false;
			isActiveLatest.value = true;
			isActiveTrending.value = false;

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

const trendingPosts = async () => {
	try {
		const getRes = await axios.get("/posts/trending", useHeaders());

		if (getRes.status == 200) {
			isActiveFeatured.value = false;
			isActiveLatest.value = false;
			isActiveTrending.value = true;

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

const visitProfilePage = (userId: number) => {
	if (userId == auth?.status?.user?.id) {
		router.push("/app/account/profile");
		return;
	}

	router.push(`/app/users/${userId}/profile`);
};

const createPost = () => {
	router.push("/account/posts/create");
};

const search = debounce(async (event: any) => {
	const searchRes = await axios.get(
		`/explore/search?search=${event.target.value}`,
		useHeaders()
	);

	if (searchRes.status == 200) {
		searchData.posts = searchRes.data.posts.data;
		searchData.users = searchRes.data.users.data;
	}
}, 500);

const openPopover = (e: Event) => {
	event.value = e;
	isOpenPopover.value = true;
};

const OpenSearchPopover = (e: Event) => {
	event.value = e;
	isOpenSearchPopover.value = true;
};

const logout = async () => {
	const logoutRes = await auth.logout();

	if (logoutRes == 200) {
		isOpenPopover.value = false;

		router.push("/login");
	}
};
</script>
