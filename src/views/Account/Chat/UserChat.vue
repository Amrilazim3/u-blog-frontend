<template>
	<ion-page>
		<ion-header>
			<ion-toolbar class="px-2">
				<div class="flex space-x-3">
					<ion-icon
						:icon="chevronBack"
						class="w-4 h-4 self-center"
						@click="router.back()"
					></ion-icon>
					<h2
						@click="
							router.push(`/app/users/${data.user.id}/profile`)
						"
					>
						{{ data.user.name }}
					</h2>
				</div>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="p-4">
				<template v-for="chat in data.chats" :key="chat.id">
					<template v-if="chat.user_id_to !== auth!.status!.user!.id">
						<div class="flex items-end justify-end mb-3">
							<div
								class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
							>
								<div>
									<span
										class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
										>{{ chat.message }}</span
									>
								</div>
							</div>
							<img
								:src="
									auth.status.user?.profileImage
										? auth.status.user?.profileImage
										: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg'
								"
								alt="My profile"
								class="w-6 h-6 rounded-full order-2"
							/>
						</div>
					</template>
					<template v-else>
						<div class="flex items-end mb-3">
							<div
								class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
							>
								<div>
									<span
										class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
										>{{ chat.message }}</span
									>
								</div>
							</div>
							<img
								:src="data.user.profile_image_url"
								alt="user profile"
								class="w-6 h-6 rounded-full order-1"
							/>
						</div>
					</template>
				</template>
				<div class="absolute inset-x-0 bottom-0 px-2.5">
					<FormKit
						type="text"
						name="name"
						suffix-icon="submit"
						v-model="message"
						@suffix-icon-click="submit"
						placeholder="Send a message"
					/>
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
	IonIcon,
	onIonViewWillEnter,
} from "@ionic/vue";
import { chevronBack } from "ionicons/icons";
import router from "@/router";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
import { inject } from "vue";
import { useHeaders } from "@/composables/headers";
import { useAuthStore } from "@/stores/auth";

const axios: any = inject("axios");

const route = useRoute();

const auth = useAuthStore();

interface Data {
	user: any;
	chats: any;
}

const message = ref("");

const data: Data = reactive({
	user: {
		name: "username",
	},
	chats: null,
});

onIonViewWillEnter(() => {
	getChats();
});

const getChats = async () => {
	const getChatsRes = await axios.get(
		`/account/chats/${route.params.user}`,
		useHeaders()
	);

	data.user = getChatsRes.data.user;
	data.chats = getChatsRes.data.chats;
};

const submit = async () => {
	const submitRes = await axios.post(
		"/account/chats",
		{ message: message.value, to: route.params.user },
		useHeaders()
	);

    if (submitRes.data.success) {
        const chatObj = {
            id: submitRes.data.chat.id,
            message: submitRes.data.chat.message,
            user_id_to: submitRes.data.chat.user_id_to,
        }

        data.chats.push(chatObj);

        message.value = "";
    }
};
</script>
