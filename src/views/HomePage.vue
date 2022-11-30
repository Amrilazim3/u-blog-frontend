<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="grid h-screen place-items-center">
				<div>
					<strong class="text-gray-900 font-semibold text-xl"
						>Welcome to U-Blog App</strong
					>
					<div>
						<p class="text-gray-800 text-center">
							Start with
							<router-link to="/register" class="text-blue-500"
								>new account</router-link
							>
						</p>
						<h4 class="text-center">OR</h4>
						<p class="text-center">
							<router-link to="/login" class="text-blue-500"
								>login</router-link
							>
							<span> to existing account</span>
						</p>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonPage } from "@ionic/vue";
</script>
