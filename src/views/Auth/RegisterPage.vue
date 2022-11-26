<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>U-Blog</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<div id="container">
				<form>
					<strong class="ion-text-uppercase"
						>Create new account</strong
					>
					<FormKit
						v-for="t in inputTypes"
						:key="t"
						:label="`This is a ${t} input`"
						:type="t"
						:placeholder="`${t} input placeholder`"
						:options="inputOptions[t] ? inputOptions[t] : null"
						:help="`Help text for the ${t} input`"
						:multiple="t === 'file' ? true : undefined"
						:disabled="t === 'date' ? true : undefined"
						:validation="
							t === 'email' ? 'required|email' : 'required'
						"
						:validation-visibility="
							t === 'email' ? 'live' : 'blur'
						"
						:validation-label="t"
					/>
					<h1>abah bas</h1>
				</form>
			</div>
		</ion-content>

		<ion-footer>
			<ion-toolbar>
				<ion-title>Footer</ion-title>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script lang="ts">
import {
	IonContent,
	IonHeader,
	IonFooter,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
	name: "RegisterPage",
	components: {
		IonContent,
		IonHeader,
		IonFooter,
		IonPage,
		IonTitle,
		IonToolbar,
	},
	data() {
		return {
			inputTypes: [
				"button",
				"checkbox",
				"color",
				"date",
				"datetime-local",
				"email",
				"file",
				"month",
				"number",
				"password",
				"radio",
				"range",
				"search",
				"select",
				"submit",
				"tel",
				"text",
				"textarea",
				"time",
				"url",
				"week",
			],
			inputOptions: {
				checkbox: [
					"I like Tailwind",
					"I also like FormKit",
					"I like other things too",
				],
				radio: [
					"I like Tailwind",
					"I like FormKit",
					"I like everything",
				],
				select: [
					"I like Tailwind",
					"I like FormKit",
					"I like everything",
				],
			},
		};
	},
});
</script>

<style scoped>
#container {
	text-align: center;

	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}

#container strong {
	font-size: 20px;
	line-height: 26px;
}

#container p {
	font-size: 16px;
	line-height: 22px;

	color: #8c8c8c;

	margin: 0;
}

#container a {
	text-decoration: none;
}
</style>
