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
		post: null,
	});

	const clearData = () => {
		data.hasPosts = false;
		data.links = null;
		data.posts = null;
		data.post = null;
	};

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

	const getSinglePost = async (route: string) => {
		try {
			const fetchRes = await axios.get(route, useHeaders());

			if (fetchRes.data.post) {
				data.post = fetchRes.data.post;
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	return { data, clearData, getPosts, getSinglePost };
});
