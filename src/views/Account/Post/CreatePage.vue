<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="p-4">
				<FormKit
					type="form"
					id="login-form"
					submit-label="Login"
					@submit="save"
					form-class="$reset"
					:actions="false"
					:disabled="isLoading"
				>
					<div class="flex space-x-3 mb-10">
						<ion-icon
							:icon="chevronBackOutline"
							class="h-5 w-5 self-center"
							@click="router.back()"
						></ion-icon>
						<h1 class="text-xl font-semibold">New Post</h1>
					</div>
					<FormKit
						type="text"
						name="title"
						label="Title"
						placeholder="Enter your post title"
						validation="required"
					/>
					<FormKit
						type="textarea"
						name="content"
						label="Content"
						placeholder="Tell your story here"
						validation="required"
					/>
					<FormKit
						type="file"
						name="thumbnail"
						label="Thumbnail"
						validation="required"
						accept=".jpg,.png,.pdf"
					/>
                    <div class="flex justify-between text-sm mb-10">
						<button @click="router.back()">Cancel</button>
						<button
							class="text-white bg-blue-500 py-2 px-4 rounded-md flex"
						>
							Post
							<template v-if="isLoading">
								<svg
									class="animate-spin h-5 w-5 fill-white ml-3"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"
									/>
								</svg>
							</template>
						</button>
					</div>
				</FormKit>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonIcon, toastController } from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import router from "@/router";
import { inject, ref } from "vue";
import { useHeaders } from "@/composables/headers";
import { useToast } from "@/composables/toast";

const axios: any = inject("axios");

const isLoading = ref(false);

const toast = useToast(toastController);

const save = async (data: any, node: any) => {
	isLoading.value = true;

	const form = new FormData();
	form.append("title", data.title);
	form.append("content", data.content);
	data.thumbnail.forEach((fileItem: any) => {
		form.append("thumbnail", fileItem.file);
	});

	try {
		const response = await axios.post("/user/posts", form, useHeaders());

		if (response.data.status) {
			isLoading.value = false;

			router.push("/app/explore");

			setTimeout(function () {
				toast.createToast("Post created", 3000, "top", "primary", "font-semibold text-white");
			}, 1000);
		}
	} catch (error: any) {
		node.setErrors(
			[error.response.data.message],
			error.response.data.errors
		);
	}
};
</script>
