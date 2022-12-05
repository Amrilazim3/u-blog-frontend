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
				<div class="space-y-5 mt-10">
					<div
						class="space-y-3 bg-gray-100 hover:bg-gray-50 rounded-md p-2.5"
					>
						<div class="flex justify-center">
							<img
								src="https://picsum.photos/id/28/400/400"
								class="rounded-md object-fill"
								alt="thumb pic"
							/>
						</div>
						<div>
							<div
								class="flex justify-between mb-3 text-sm font-light"
							>
								<p>posted 2 days ago</p>
								<p>15 likes</p>
							</div>
							<h2 class="text-lg font-semibold">
								Title of this post
							</h2>
						</div>
					</div>
					<div
						class="space-y-3 bg-gray-100 hover:bg-gray-50 rounded-md p-2.5"
					>
						<div class="flex justify-center">
							<img
								src="https://picsum.photos/id/33/400/400"
								class="rounded-md object-fill"
								alt="thumb pic"
							/>
						</div>
						<div>
							<div
								class="flex justify-between mb-3 text-sm font-light"
							>
								<p>posted 2 days ago</p>
								<p>15 likes</p>
							</div>
							<h2 class="text-lg font-semibold">
								Title of this post
							</h2>
						</div>
					</div>
					<div
						class="space-y-3 bg-gray-100 hover:bg-gray-50 rounded-md p-2.5"
					>
						<div class="flex justify-center">
							<img
								src="https://picsum.photos/id/30/400/400"
								class="rounded-md object-fill"
								alt="thumb pic"
							/>
						</div>
						<div>
							<div
								class="flex justify-between mb-3 text-sm font-light"
							>
								<p>posted 2 days ago</p>
								<p>15 likes</p>
							</div>
							<h2 class="text-lg font-semibold">
								Title of this post
							</h2>
						</div>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent } from "@ionic/vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const auth = useAuthStore();
</script>
