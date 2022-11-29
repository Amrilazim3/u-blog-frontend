<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div
				class="min-h-screen min-w-full flex flex-col justify-center items-center"
			>
				<FormKit
					type="form"
					submit-label="Register"
					@submit="register"
					form-class="$reset w-96"
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
						validation="required"
					/>
					<FormKit
						type="password"
						name="password_confirm"
						label="Password Confirmation"
						placeholder="Re-enter your password"
						validation="required|confirm"
					/>
					<FormKit
						type="submit"
						label="Register"
						input-class="$reset w-full text-white p-3 border rounded-md bg-blue-500 hover:bg-blue-600"
					/>
					<p class="text-sm">
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
import { onMounted } from "vue";

const register = () => {
	console.log("hello world");
};

onMounted(() => {
	console.log(process.env.VUE_APP_API_KEY);
});
</script>
