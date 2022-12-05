<template>
	<ion-page>
		<ion-header>
			<ion-toolbar class="py-4 pr-4">
				<div class="flex justify-between">
					<ion-title
						class="max-w-fit py-2 px-3 bg-blue-500 rounded-tr-xl rounded-br-xl text-white font-semibold"
						>U-Blog</ion-title
					>
					<div>
					</div>
					<div class="h-6 w-6 self-center">
						<template v-if="auth.status.user?.profileImage">
							<img src="https://xsgames.co/randomusers/assets/avatars/male/17.jpg" alt="profile pic" class="object-cover rounded-md">
						</template>
						<template v-else>
							<ion-icon :icon="personCircleOutline" class="h-full w-full"></ion-icon>
						</template>
					</div>
				</div>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
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
					<div class="flex space-x-4">
						<div
							class="w-36 h-36 cursor-pointer flex-shrink-0"
							@click="router.push('/app/users/1/posts/4')"
						>
							<img
								src="https://picsum.photos/id/28/400/400"
								class="rounded-md object-fill w-full h-full"
								alt="thumb pic"
							/>
						</div>
						<div class="flex flex-col space-y-2 w-40">
							<h1
								class="text-lg font-semibold cursor-pointer"
								@click="router.push('/app/users/1/posts/4')"
							>
								Where we going
							</h1>
							<small class="text-blue-500">Kamarul azman</small>
							<small>10 likes</small>
						</div>
					</div>
					<div class="flex space-x-4">
						<div
							class="w-36 h-36 flex-shrink-0"
							@click="router.push('/app/users/1/posts/4')"
						>
							<img
								src="https://picsum.photos/id/30/400/400"
								class="rounded-md object-fill w-full h-full"
								alt="thumb pic"
							/>
						</div>
						<div class="flex flex-col space-y-2 w-40">
							<h1
								class="text-lg font-semibold"
								@click="router.push('/app/users/1/posts/4')"
							>
								Let's have a coffe
							</h1>
							<small class="text-blue-500">Mira azmah</small>
							<small>10 likes</small>
						</div>
					</div>
					<div class="flex space-x-4">
						<div class="w-36 h-36 flex-shrink-0">
							<img
								src="https://picsum.photos/id/41/400/400"
								class="rounded-md object-fill w-full h-full"
								alt="thumb pic"
							/>
						</div>
						<div class="flex flex-col space-y-2 w-40">
							<h1 class="text-lg font-semibold">
								Let's go to the town old town road yeah yeahhh
							</h1>
							<small class="text-blue-500">Rahman auf</small>
							<small>10 likes</small>
						</div>
					</div>
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
} from "@ionic/vue";
import { add, personCircleOutline } from "ionicons/icons";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const createPost = () => {
	router.push("/account/posts/create");
};
</script>
