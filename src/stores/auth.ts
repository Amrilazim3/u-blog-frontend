import { defineStore } from "pinia";

export const useAuthStore = defineStore("main", {
	state: () => {
		return {
			isLoggedIn: false,
			user: {
				name: null,
				email: null,
				token: null,
			},
		};
	},
});
