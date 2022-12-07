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
						:src="data?.post?.['thumbnail_url']"
						class="object-contain"
						alt="thumb pic"
					/>
				</div>
				<div class="p-4 space-y-4">
					<div class="space-y-5">
						<div class="flex justify-between">
							<div class="flex space-x-3">
								<div class="h-6 w-6">
									<template
										v-if="
											data?.post?.['user'][
												'profile_image_url'
											]
										"
									>
										<img
											:src="
												data?.post?.['user'][
													'profile_image_url'
												]
											"
											alt="profile pic"
											class="object-cover rounded-md"
										/>
									</template>
									<template v-else>
										<img
											src="https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg"
											alt="profile pic"
											class="object-cover rounded-md"
										/>
									</template>
								</div>
								<p
									class="text-gray-900"
									@click="
										router.push(
											`/app/users/${data?.post?.['user']['id']}/profile`
										)
									"
								>
									{{ data?.post?.["user"]["name"] }} -
									<span class="text-blue-500">follow</span>
								</p>
							</div>
							<span class="text-sm font-light"
								>posted on
								{{ data?.post?.["created_at"] }}</span
							>
						</div>
						<div>
							<div class="flex justify-between w-full">
								<h2 class="text-lg font-semibold w-3/4">
									{{ data?.post?.["title"] }}
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
						<p class="text-gray-700">
							{{ data?.post?.["content"] }}
						</p>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";
import {
	chevronBackOutline,
	reorderTwoOutline,
	personCircleOutline,
	chatboxOutline,
	heartCircleOutline,
} from "ionicons/icons";
import router from "@/router";
import { useRoute } from "vue-router";
import { useHeaders } from "@/composables/headers";
import { inject, reactive, ref } from "vue";

const axios: any = inject("axios");

const route = useRoute();

const isOpenPopover = ref(false);

const data = reactive({
	post: null,
});

onIonViewWillEnter(async () => {
	await getPost();
});

const getPost = async () => {
	try {
		const getRes = await axios.get(
			`users/${route.params.user}/posts/${route.params.post}`,
			useHeaders()
		);

		data.post = getRes.data.post;
	} catch (error: any) {
		console.log(error);
	}
};
</script>
