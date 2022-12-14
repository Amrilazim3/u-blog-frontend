import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { useHeaders } from "@/composables/headers";
import { axiosInstance } from "../main";

interface Status {
	token: string | null;
	user: User | null;
}

interface User {
	id: number;
	name: string;
	email: string;
	profileImage: string;
	bio: string;
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
				id: 0,
				name: "",
				email: "",
				isVerifiedEmail: false,
				profileImage: "",
				bio: ""
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
			try {
				const response = await axios.get("logout", useHeaders());

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
					id: userData.user.id,
					name: userData.user.name,
					email: userData.user.email,
					isVerifiedEmail:
						userData.user.email_verified_at == null ? false : true,
					profileImage: userData.user.profile_image_url,
					bio: userData.user.bio,
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
