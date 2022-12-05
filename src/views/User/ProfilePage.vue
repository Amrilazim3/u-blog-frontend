<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>U-Blog</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="p-4">
				<h1 class="text-2xl font-semibold">Profile</h1>
				<button
					@click="logout"
					class="border-2 border-black bg-gray-100 p-4 rounded-md text-xl text-blue-500"
				>
					logout
				</button>
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
} from "@ionic/vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const auth = useAuthStore();

const logout = async () => {
	const logoutRes = await auth.logout();

	if (logoutRes == 200) {
		router.push("/login");
	}
};
</script>
