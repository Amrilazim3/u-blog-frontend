<template>
	<ion-page>
		<ion-content>
			<ion-tabs>
				<ion-router-outlet></ion-router-outlet>
				<ion-tab-bar slot="bottom">
					<ion-tab-button tab="explore" href="/app/explore">
						<ion-icon :icon="mapOutline" />
						<ion-label>Explore</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="chat" href="/app/chat">
						<ion-icon :icon="chatbubblesOutline" />
						<ion-label>Chats</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="profile" href="/app/account/profile">
						<ion-icon :icon="personCircleOutline" />
						<ion-label>Profile</ion-label>
					</ion-tab-button>
				</ion-tab-bar>
			</ion-tabs>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import {
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonContent,
	IonLabel,
	IonIcon,
	IonPage,
	IonRouterOutlet,
} from "@ionic/vue";
import { mapOutline, chatbubblesOutline, personCircleOutline } from "ionicons/icons";
</script>
