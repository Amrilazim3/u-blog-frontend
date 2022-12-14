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
								<div class="flex space-x-1">
									<p
										class="text-gray-900"
										@click="
											router.push(
												`/app/users/${data?.post?.['user']['id']}/profile`
											)
										"
									>
										{{ data?.post?.["user"]["name"] }}
									</p>
									<p>-</p>
									<template v-if="isFollow">
										<span
											class="text-red-500"
											@click="unfollow"
											>unfollow</span
										>
									</template>
									<template v-else>
										<span
											class="text-blue-500"
											@click="follow"
											>follow</span
										>
									</template>
								</div>
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
									<template v-if="isLiked">
										<ion-icon
											:icon="heart"
											class="w-7 h-7 fill-red-500"
											@click="unlikePost"
										></ion-icon>
									</template>
									<template v-else>
										<ion-icon
											:icon="heartOutline"
											class="w-7 h-7"
											@click="likePost"
										></ion-icon>
									</template>
									<ion-icon
										:icon="chatboxOutline"
										class="w-7 h-7"
										@click="openCommentModal"
									></ion-icon>
									<ion-modal :is-open="isOpenCommentModal">
										<ion-header>
											<ion-toolbar>
												<ion-title class="font-semibold"
													>Comments</ion-title
												>
												<ion-buttons slot="end">
													<ion-button
														@click="
															isOpenCommentModal = false
														"
														>Close</ion-button
													>
												</ion-buttons>
											</ion-toolbar>
										</ion-header>
										<ion-content class="ion-padding">
											<div class="relative h-full">
												<template
													v-for="comment in data.comments"
													:key="comment['id']"
												>
													<div class="py-3">
														<div
															class="flex justify-between mb-2"
														>
															<h2
																class="text-blue-500 text-sm"
															>
																{{
																	comment[
																		"user"
																	]["name"]
																}}
															</h2>
															<small
																class="text-sm font-light"
																>{{
																	comment[
																		"created_at"
																	]
																}}</small
															>
														</div>
														<div
															class="flex justify-between"
														>
															<p class="text-sm">
																{{
																	comment[
																		"message"
																	]
																}}
															</p>
															<template
																v-if="
																	comment[
																		'user_id'
																	] ==
																	auth?.status
																		?.user
																		?.id
																"
															>
																<ion-icon
																	:icon="
																		trashOutline
																	"
																	class="w-4 h-4"
																	@click="
																		deleteComment(
																			comment[
																				'id'
																			]
																		)
																	"
																></ion-icon>
															</template>
														</div>
													</div>
												</template>

												<div
													class="absolute inset-x-0 bottom-0 pb-10"
												>
													<FormKit
														type="text"
														name="name"
														suffix-icon="submit"
														v-model="commentMsg"
														@suffix-icon-click="
															comment
														"
														placeholder="Enter your comment"
													/>
												</div>
											</div>
										</ion-content>
									</ion-modal>
								</div>
							</div>
							<div
								class="flex space-x-2 text-gray-800 font-light text-sm"
							>
								<span
									>{{
										data?.post?.["likes_count"]
									}}
									likes</span
								>
								<span @click="openCommentModal"
									>{{
										data?.post?.["comments_count"]
									}}
									comments</span
								>
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
	IonModal,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonIcon,
} from "@ionic/vue";
import {
	chevronBackOutline,
	reorderTwoOutline,
	chatboxOutline,
	heart,
	heartOutline,
	trashOutline,
} from "ionicons/icons";
import router from "@/router";
import { useRoute } from "vue-router";
import { useHeaders } from "@/composables/headers";
import { useAuthStore } from "@/stores/auth";
import { inject, reactive, ref } from "vue";

const axios: any = inject("axios");

const route = useRoute();

const auth = useAuthStore();

const isLiked = ref(false);

const isFollow = ref(false);

const isOpenCommentModal = ref(false);

const commentMsg = ref("");

const data = reactive({
	post: null,
	comments: null,
});

onIonViewWillEnter(async () => {
	await getPost();
	await getLikePostCondition();
	await getComments();
});

const getPost = async () => {
	try {
		const getRes = await axios.get(
			`users/${route.params.user}/posts/${route.params.post}`,
			useHeaders()
		);

		isFollow.value = getRes.data.isFollow;
		data.post = getRes.data.post;
	} catch (error: any) {
		console.log(error);
	}
};

const likePost = async () => {
	try {
		const likeRes = await axios.post(
			`/posts/${route.params.post}/likes`,
			null,
			useHeaders()
		);

		if (likeRes.data.success) {
			isLiked.value = !isLiked.value;
		}
	} catch (error: any) {
		console.log(error);
	}
};

const unlikePost = async () => {
	try {
		const deleteRes = await axios.delete(
			`/posts/${route.params.post}/likes`,
			useHeaders()
		);

		if (deleteRes.data.success) {
			isLiked.value = !isLiked.value;
		}
	} catch (error: any) {
		console.log(error);
	}
};

const getLikePostCondition = async () => {
	try {
		const checkLikeRes = await axios.get(
			`/posts/${route.params.post}/likes`,
			useHeaders()
		);

		if (checkLikeRes.data.success) {
			isLiked.value = !isLiked.value;
		}
	} catch (error: any) {
		console.log(error);
	}
};

const openCommentModal = () => {
	isOpenCommentModal.value = true;
};

const comment = async () => {
	if (commentMsg.value.length > 0) {
		try {
			const postCommentRes = await axios.post(
				`/posts/${route.params.post}/comments`,
				{ message: commentMsg.value },
				useHeaders()
			);

			if (postCommentRes.data.success) {
				commentMsg.value = "";

				getComments();
			}
		} catch (error: any) {
			console.log(error);
		}
	}
};

const deleteComment = async (commentId: number) => {
	try {
		const deleteCommentRes = await axios.delete(
			`/posts/${route.params.post}/comments/${commentId}`,
			useHeaders()
		);

		if (deleteCommentRes.data.success) {
			getComments();
		}
	} catch (error: any) {
		console.log(error);
	}
};

const getComments = async () => {
	try {
		const getCommentsRes = await axios.get(
			`/posts/${route.params.post}/comments`,
			useHeaders()
		);

		data.comments = getCommentsRes.data.comments;
	} catch (error: any) {
		console.log(error);
	}
};

const follow = async () => {
	const followRes = await axios.post(
		`/users/${route.params.user}/follow`,
		null,
		useHeaders()
	);

	if (followRes.data.success) {
		isFollow.value = true;
	}
};

const unfollow = async () => {
	const unfollowRes = await axios.delete(
		`/users/${route.params.user}/follow`,
		useHeaders()
	);

	if (unfollowRes.data.success) {
		isFollow.value = false;
	}
};
</script>
