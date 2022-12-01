import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { useHeaders } from "@/composables/headers";
import { axiosInstance } from "../main";

interface Status {
	token: string | null;
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
	password_confirm?: string;
}

export const useAuthStore = defineStore(
	"auth",
	() => {
		const axios = axiosInstance;

		const status: Status = reactive({
			token: null,
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
		const register = async (form: Form, node: any) => {
			try {
				const response = await axios.post("register", form);

				setUser(response.data);

				return response.status;
			} catch (error: any) {
				node.setErrors(
					[error.response.data.message],
					error.response.data.errors
				);

				return error.response.status;
			}
		};

		const login = async (form: Form, node: any) => {
			try {
				const response = await axios.post("login", form);

				setUser(response.data);

				return response.status;
			} catch (error: any) {
				node.setErrors(
					[error.response.data.message],
					error.response.data.errors
				);

				return error.response.status;
			}
		};

		const logout = async () => {
			console.log("first");

			console.log(axios);

			try {
				const response = await axios.get("logout", useHeaders());

				console.log("asdadasd");

				if (response.data.success) {
					setUser({
						token: null,
						user: null,
					});
				}

				return response.status;
			} catch (error: any) {
				return error.response.status;
			}
		};

		const setUser = (userData: any) => {
			status.token = userData.token;

			if (userData.user == null) {
				status.user = null;
			}

			if (userData.user) {
				status.user = {
					name: userData.user.name,
					email: userData.user.email,
					isVerifiedEmail:
						userData.user.email_verified_at == null ? false : true,
				};
			}
		};

		if (localStorage.getItem("authState")) {
			const newAuth = JSON.parse(localStorage.getItem("authState") || "");

			setUser(newAuth);
		}

		return { status, register, login, logout };
	},
	{
		persist: true,
	}
);
