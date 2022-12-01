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
						v-model="form.name"
					/>
					<FormKit
						type="email"
						name="email"
						label="Email address"
						placeholder="Enter your email address"
						validation="required|email"
						v-model="form.email"
					/>
					<FormKit
						type="password"
						name="password"
						label="Password"
						placeholder="Enter your password"
						validation="required|length:6"
						v-model="form.password"
					/>
					<FormKit
						type="password"
						name="password_confirm"
						label="Password Confirmation"
						placeholder="Re-enter your password"
						validation="required|confirm"
						v-model="form.password_confirm"
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
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue-demi";
import router from "@/router";

interface Form {
	name: string;
	email: string;
	password: string;
	password_confirm: string;
}

const auth = useAuthStore();

const form: Form = reactive({
	name: "",
	email: "",
	password: "",
	password_confirm: "",
});

const save = async (data: any, node: any) => {
	const form = data;

	const registerStatus = await auth.register(form, node);

	if (registerStatus == 200) {
		router.push("/explore");
	}
};
</script>
