<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="p-4">
				<h1 class="text-2xl font-semibold">Chats</h1>
				<div
					class="relative mt-2 text-gray-600 focus-within:text-gray-400"
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
						placeholder="Search existing person to chat"
						autocomplete="off"
					/>
				</div>
				<div class="space-y-3 mt-4 w-full divide-y divide-gray-300">
					<template
						v-for="(user , index) in data.users"
						:key="user?.id"
					>
						<div class="flex space-x-4 pt-2" @click="router.push(`/account/chats/${user.engaged_id}`)">
							<img
								:src="
									user?.following?.profile_image_url
										? user?.following?.profile_image_url
										: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg'
								"
								alt="profile image"
								class="h-10 w-10 object-cover rounded-full"
							/>
							<div>
								<h3>{{ user?.following?.name }}</h3>
								<p class="text-sm text-gray-500">
									{{ data.chats[index]?.message == null ? 'Tap here to start chat' : data.chats[index]?.message }} 
								</p>
							</div>
						</div>
					</template>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import {
	IonPage,
	IonContent,
	onIonViewWillEnter,
} from "@ionic/vue";
import router from "@/router";
import { inject, reactive } from "vue";
import { useHeaders } from "@/composables/headers";

interface Data {
	users: any;
	chats: any;
}

const data: Data = reactive({
	users: null,
	chats: null,
});

const axios: any = inject("axios");

onIonViewWillEnter(() => {
	getChats();
});

const getChats = async () => {
	const getChatsRes = await axios.get("/account/chats", useHeaders());

	data.users = getChatsRes.data.users;
	data.chats = getChatsRes.data.chats;
};
</script>
