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
						@click="goBack"
					></ion-icon>
					<ion-icon
						:icon="reorderTwoOutline"
						@click="openPopover"
						class="w-7 h-7 rounded bg-gray-50"
					></ion-icon>
					<ion-popover
						:is-open="isOpenPopover"
						@didDismiss="isOpenPopover = false"
					>
						<div class="p-3 space-y-2 flex flex-col">
							<button @click="editPost">Edit</button>
							<button class="text-red-500" @click="deletePost">
								Delete
							</button>
						</div>
					</ion-popover>
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
										v-if="auth.status.user?.profileImage"
									>
										<img
											:src="
												auth.status.user?.profileImage
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
									class="text-blue-500"
									@click="router.push('/app/account/profile')"
								>
									{{ auth.status.user?.name }}
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
								<!-- feature work -->
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
							<!-- use other relationship in the future -->
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
import {
	IonPage,
	IonContent,
	onIonViewWillEnter,
	IonPopover,
	toastController,
} from "@ionic/vue";
import {
	chevronBackOutline,
	reorderTwoOutline,
	chatboxOutline,
	heartCircleOutline,
} from "ionicons/icons";
import router from "@/router";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useHeaders } from "@/composables/headers";
import { useToast } from "@/composables/toast";
import { reactive, ref } from "vue";
import { inject } from "vue";

const route = useRoute();

const auth = useAuthStore();

const toast = useToast(toastController);

const axios: any = inject("axios");

const isOpenPopover = ref(false);

const data = reactive({
	post: null,
});

onIonViewWillEnter(async () => {
	await getPost();
});

const goBack = () => {
	router.back();
};

const openPopover = () => {
	isOpenPopover.value = true;
};

const getPost = async () => {
	try {
		const getRes = await axios.get(
			`account/posts/${route.params.post}`,
			useHeaders()
		);

		data.post = getRes.data.post;
	} catch (error: any) {
		console.log(error);
	}
};

const editPost = () => {
	isOpenPopover.value = false;

	router.push(`/account/posts/${data?.post?.["id"]}/edit`);
};

const deletePost = async () => {
	try {
		const deleteRes = await axios.delete(
			`account/posts/${data?.post?.["id"]}`,
			useHeaders()
		);

		if (deleteRes.data.success) {
			isOpenPopover.value = false;

			router.back();

			setTimeout(function () {
				toast.createToast(
					"Post deleted",
					3000,
					"top",
					"primary",
					"font-semibold text-white"
				);
			}, 1000);
		}
	} catch (error: any) {
		console.log(error);
	}
};
</script>
