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
				>
                    <div class="flex space-x-3 mb-10">
                        <ion-icon :icon="chevronBackOutline" class="h-5 w-5 self-center" @click="router.back()"></ion-icon>
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
					/>
                    <div class="flex justify-between text-sm mb-10">
						<button @click="router.back()">Cancel</button>
						<button
							class="text-white bg-blue-500 py-1 px-4 rounded-lg"
						>
							Post
						</button>
					</div>
				</FormKit>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import {
	IonPage,
	IonContent,
    IonIcon
} from "@ionic/vue";
import { useAuthStore } from "@/stores/auth";
import { chevronBackOutline } from "ionicons/icons";
import router from "@/router";

const save = () => {
    console.log('save');
}
</script>
