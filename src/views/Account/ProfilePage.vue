<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="p-4">
				<h1 class="text-2xl font-semibold mb-6">My Profile</h1>
				<div class="flex space-x-6">
					<div class="w-36">
						<img
							:src="
								auth.status.user?.profileImage
									? auth.status.user.profileImage
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
						{{ auth.status.user?.name }}
					</h2>
					<p class="text-sm">
						{{
							auth.status.user?.bio
								? auth.status.user.bio
								: "No bio yet"
						}}
					</p>
				</div>
				<div class="mt-5">
					<button
						class="w-full rounded-md outline outline-gray-400 py-1"
					>
						edit profile
					</button>
				</div>
				<template v-if="postStore.data.hasPosts">
					<div class="space-y-5 mt-10">
						<template v-for="post in postStore.data.posts" :key="post.id">
							<div
								class="space-y-3 bg-gray-100 hover:bg-gray-50 rounded-md p-2.5"
								@click="router.push(`/app/account/posts/${post['id']}/show`)"
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
										<p>15 likes</p>
									</div>
									<h2 class="text-lg font-semibold">
										{{ post["title"] }}
									</h2>
								</div>
							</div>
						</template>
					</div>
				</template>
				<template v-else>
					<div class="mt-10">
						<h1 class="text-lg">No post created</h1>
					</div>
				</template>
				<PaginationPage :links="postStore.data.links" />
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";
import router from "@/router";

const auth = useAuthStore();

const postStore = usePostStore();

onIonViewWillEnter(async () => {
	getPosts();
});

const getPosts = async () => {
	await postStore.getPosts("/user/posts");
}
</script>
