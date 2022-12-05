<template>
	<ion-page>
		<ion-content>
			<div class="min-w-full">
				<div
					class="absolute top-4 px-3 min-w-full flex justify-between"
				>
					<ion-icon
						:icon="chevronBackOutline"
						class="w-6 h-6 rounded bg-gray-50"
						@click="router.back()"
					></ion-icon>
					<ion-icon
						:icon="reorderTwoOutline"
						class="w-7 h-7 rounded bg-gray-50"
					></ion-icon>
				</div>
				<div class="flex justify-center">
					<img
						src="https://picsum.photos/id/28/500/500"
						class="object-contain"
						alt="thumb pic"
					/>
				</div>
				<div class="p-4 space-y-4">
					<div class="space-y-5">
						<div class="flex space-x-3">
							<ion-icon
								:icon="personCircleOutline"
								class="self-center w-6 h-6"
							/>
							<p class="text-blue-500">
								Jane doe
								<span
									class="text-gray-900 font-extralight text-sm"
									>- follow</span
								>
							</p>
						</div>
						<div>
							<div class="flex justify-between">
								<h2 class="text-lg font-semibold">
									View other user post
								</h2>
								<div class="space-x-1.5">
									<ion-icon
										:icon="heartCircleOutline"
										class="w-7 h-7 fill-red-500"
									></ion-icon>
									<ion-icon
										:icon="chatboxOutline"
										class="w-7 h-7"
									></ion-icon>
								</div>
							</div>
							<div
								class="flex space-x-2 text-gray-800 font-light text-sm"
							>
								<span>1000 likes</span>
								<span>100 comments</span>
							</div>
						</div>
					</div>
					<div class="space-y-2">
						<p class="text-gray-800">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Quibusdam autem dolor nihil quas commodi, eius
							quae, omnis maiores velit culpa expedita repudiandae
							beatae id cum perspiciatis debitis harum a rem?
						</p>
						<p class="text-gray-800">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Quibusdam autem dolor nihil quas commodi, eius
							quae, omnis maiores velit culpa expedita repudiandae
							beatae id cum perspiciatis debitis harum a rem?
						</p>
						<p class="text-gray-800">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Quibusdam autem dolor nihil quas commodi, eius
							quae, omnis maiores velit culpa expedita repudiandae
							beatae id cum perspiciatis debitis harum a rem?
						</p>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent } from "@ionic/vue";
import {
	chevronBackOutline,
	reorderTwoOutline,
	personCircleOutline,
	chatboxOutline,
	heartCircleOutline,
} from "ionicons/icons";
import router from "@/router";
</script>
