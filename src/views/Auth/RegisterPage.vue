<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div
				class="min-h-screen min-w-full flex flex-col justify-center items-center"
			>
				<FormKit
					type="form"
					id="register-form"
					submit-label="Register"
					@submit="save"
					form-class="$reset"
					:actions="false"
				>
					<h3 class="uppercase font-semibold text-xl mb-6 grow">
						Create your account
					</h3>
					<FormKit
						type="text"
						name="name"
						label="Name"
						placeholder="Enter your name"
						validation="required"
					/>
					<FormKit
						type="email"
						name="email"
						label="Email address"
						placeholder="Enter your email address"
						validation="required|email"
					/>
					<FormKit
						type="password"
						name="password"
						label="Password"
						placeholder="Enter your password"
						validation="required|length:6"
					/>
					<FormKit
						type="password"
						name="password_confirm"
						label="Password Confirmation"
						placeholder="Re-enter your password"
						validation="required|confirm"
					/>
					<button
						type="submit"
						class="flex justify-center w-full text-white p-2.5 border rounded-md bg-blue-500 hover:bg-blue-600"
					>
						Register
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
					<p class="text-sm mt-3">
						already have an account?
						<router-link to="/login" class="text-blue-500"
							>login here</router-link
						>
					</p>
				</FormKit>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonPage } from "@ionic/vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import { ref } from "vue";

const auth = useAuthStore();

const isLoading = ref(false);

const save = async (data: any, node: any) => {
	isLoading.value = true;

	const registerStatus = await auth.register(data, node);

	if (registerStatus == 422) {
		isLoading.value = false;
	}

	if (registerStatus == 200) {
		isLoading.value = false;

		router.push("/app");
	}
};
</script>
