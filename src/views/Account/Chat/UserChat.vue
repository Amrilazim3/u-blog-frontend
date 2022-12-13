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
					<h2>Ammar asri</h2>
				</div>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="p-4">
				<h1>Chat page</h1>
				<!-- create button at bottom -->
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
import { reactive } from "vue";
import { inject } from "vue";

const axios: any = inject("axios");

interface Data {
	chats: any;
}

const data: Data = reactive({
	chats: null,
});

onIonViewWillEnter(() => {
	console.log("get chats");
});

const getChats = async () => {
	// const getChatsRes = await
};
</script>
