<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div
				class="min-h-screen min-w-full flex flex-col justify-center items-center"
			>
				<FormKit
					type="form"
					id="login-form"
					submit-label="Login"
					@submit="login"
					form-class="$reset"
					:actions="false"
				>
					<h3 class="uppercase font-semibold text-xl mb-6 grow">
						Welcome back!
					</h3>
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
						type="submit"
						label="Login"
						input-class="$reset w-full text-white p-3 border rounded-md bg-blue-500 hover:bg-blue-600"
					/>
					<p class="text-sm">
						don't have an account?
						<router-link to="/register" class="text-blue-500"
							>Register now</router-link
						>
					</p>
				</FormKit>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { IonContent, IonPage } from "@ionic/vue";
import { reactive } from "vue";

interface Form {
	email: string;
	password: string;
}

const auth = useAuthStore();

const form: Form = reactive({
	email: "",
	password: ""	
});

const login = async (data: any, node: any) => {
	const loginRes = await auth.login(data, node);

	if (loginRes == 200) {
		router.push("/explore");
	}
};
</script>
