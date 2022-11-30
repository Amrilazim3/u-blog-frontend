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
						validation="required"
						v-model="form.password"
					/>
					<FormKit
						type="password"
						name="password_confirm"
						label="Password Confirmation"
						placeholder="Re-enter your password"
						validation="required|confirm"
						v-model="form.passwordConfirm"
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
import { setErrors } from "@formkit/vue";
import router from "@/router";

interface Form {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
}

const auth = useAuthStore();

const form: Form = reactive({
	name: "",
	email: "",
	password: "",
	passwordConfirm: "",
});

const save = async () => {
	const registerRes = await auth.register(form);

	if (registerRes.status == 422) {
		setErrors(
			"register-form",
			[registerRes.data.message],
			registerRes.data.errors
		);
		return;
	}

	router.push("/explore");
};
</script>
