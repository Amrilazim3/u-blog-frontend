import { defineStore } from "pinia";
import { inject, reactive, watch } from "vue";

interface Status {
	token: boolean;
	user: User | null;
}

interface User {
	name: string;
	email: string;
	isVerifiedEmail: boolean;
}

interface Form {
	name?: string;
	email: string;
	password: string;
	passwordConfirm?: string;
}

export const useAuthStore = defineStore(
	"auth",
	() => {
		const axios: any = inject("axios");

		const status: Status = reactive({
			token: false,
			user: {
				name: "",
				email: "",
				isVerifiedEmail: false,
			},
		});

		watch(
			() => status,
			(newAuth) => {
				localStorage.setItem("authState", JSON.stringify(newAuth));
			},
			{ deep: true }
		);

		/* methods */
		const register = async (form: Form) => {
			try {
				const response = await axios.post("register", form);

				setUser(response.data);

				return {
					status: response.status,
				};
			} catch (error: any) {
				return error.response;
			}
		};

		const login = (form: Form) => {
			console.log(form);
		};

		const setUser = (userData: any) => {
			status.token = userData.token;
			if (status.user !== null) {
				status.user.name = userData.user.name;
				status.user.email = userData.user.email;
				status.user.isVerifiedEmail =
					userData.user.email_verified_at == null ? false : true;
			}
		};

		if (localStorage.getItem("authState")) {
			const newAuth = JSON.parse(localStorage.getItem("authState") || "");

			setUser(newAuth);
		}

		return { status, register, login };
	},
	{
		persist: true,
	}
);
