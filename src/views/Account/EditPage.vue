<template>
	<ion-page>
		<ion-content>
			<div class="p-4">
				<FormKit
					type="form"
					id="register-form"
					submit-label="Register"
					@submit="save"
					form-class="$reset"
					:actions="false"
				>
					<div class="flex space-x-3 mb-10">
						<ion-icon
							:icon="chevronBackOutline"
							class="h-5 w-5 self-center"
							@click="router.back()"
						></ion-icon>
						<h1 class="text-xl font-semibold">Edit Profile</h1>
					</div>
					<div class="flex space-x-4 mb-3">
						<div class="w-16 h-16 flex-none">
							<img
								:src="previewImageURL"
								alt="profile image"
								class="object-cover h-10 w-10 rounded-full"
							/>
						</div>
						<div class="shrink">
							<FormKit
								type="file"
								name="profile_image"
								:value="
									auth?.status?.user?.profileImage
										? [{ name: 'profile-image' }]
										: ''
								"
								@change="updateProfileImage($event)"
								accept=".jpg,.png,.pdf"
								@file-remove-icon-click="removePreviewImage"
							/>
						</div>
					</div>
					<FormKit
						type="text"
						name="name"
						label="Name"
						placeholder="Enter your name"
						:value="auth?.status?.user?.name"
						validation="required"
					/>
					<FormKit
						type="email"
						name="email"
						label="Email address"
						placeholder="Enter your email address"
						:value="auth?.status?.user?.email"
						validation="required|email"
					/>
					<FormKit
						type="textarea"
						name="bio"
						label="Bio"
						placeholder="Enter your bio"
						:value="auth?.status?.user?.bio"
					/>
					<button
						type="submit"
						class="flex justify-center w-full text-white p-2.5 border rounded-md bg-blue-500 hover:bg-blue-600"
					>
						Save
						<template v-if="isLoading">
							<svg
								class="animate-spin self-center h-5 w-5 fill-white ml-3"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								<path
									d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"
								/>
							</svg>
						</template>
					</button>
				</FormKit>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import {
	IonPage,
	IonContent,
	IonIcon,
	onIonViewWillEnter,
	toastController,
} from "@ionic/vue";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import router from "@/router";
import { chevronBackOutline } from "ionicons/icons";
import { inject } from "vue";
import { useHeaders } from "@/composables/headers";
import { useToast } from "@/composables/toast";

const axios: any = inject("axios");

const auth = useAuthStore();

const toast = useToast(toastController);

const previewImageURL = ref(
	"https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg"
);

const isRemoveOldProfileImage = ref("false");

const newProfileImage = ref("");

const isLoading = ref(false);

onIonViewWillEnter(() => {
	if (auth?.status?.user?.profileImage) {
		previewImageURL.value = auth.status.user.profileImage;
	}
});

const save = async (data: any, node: any) => {
	const form = new FormData();
	form.append("_method", "patch");
	form.append("name", data.name);
	form.append("email", data.email);
	form.append("bio", data.bio);
	form.append("isRemoveOriginalProfileImage", isRemoveOldProfileImage.value);
	form.append(
		"originalProfileImage",
		auth?.status?.user?.profileImage ? auth?.status?.user?.profileImage : ""
	);
	form.append("newProfileImage", newProfileImage.value);

	try {
		const patchProfileRes = await axios.post(
			"/account/profile",
			form,
			useHeaders()
		);

		if (patchProfileRes.data.success) {
			const user = patchProfileRes.data.user;
			if (auth.status.user !== null) {
				auth.status.user.name = user.name;
				auth.status.user.email = user.email;
				auth.status.user.bio = user.bio;
				auth.status.user.profileImage = user.profile_image_url;
			}

			router.back();
			toast.createToast(
				"Profile updated",
				2000,
				"top",
				"success",
				"text-gray-800"
			);
		}
	} catch (error: any) {
		node.setErrors(
			[error.response.data.message],
			error.response.data.errors
		);
	}
};

const updateProfileImage = (event: any) => {
	const selectedImage = event.target.files[0];

	previewImageURL.value = URL.createObjectURL(selectedImage);
	newProfileImage.value = selectedImage;
};

const removePreviewImage = () => {
	if (auth.status.user?.profileImage) {
		isRemoveOldProfileImage.value = "true";
	}

	previewImageURL.value =
		"https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg";
};
</script>
