import { useHeaders } from "@/composables/headers";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { axiosInstance } from "../main";

export const usePostStore = defineStore("post", () => {
	const axios = axiosInstance;

	const data = reactive({
		hasPosts: false,
		links: null,
		posts: null,
	});

	const getPosts = async (route: string) => {
		try {
			const fetchRes = await axios.get(route, useHeaders());

			if (fetchRes.data.posts.data.length > 0) {
				data.links = fetchRes.data.posts.links;
				data.hasPosts = true;
				data.posts = fetchRes.data.posts.data;
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	return { data, getPosts };
});
