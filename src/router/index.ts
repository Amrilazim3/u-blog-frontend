import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import RegisterPage from "@/views/Auth/RegisterPage.vue";
import LoginPage from "@/views/Auth/LoginPage.vue";
import ExplorePage from "@/views/Blog/ExplorePage.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		name: "Home",
		component: HomePage,
	},
	{
		path: "/register",
		name: "Register",
		component: RegisterPage,
	},
	{
		path: "/login",
		name: "Login",
		component: LoginPage,
	},
	{
		path: "/explore",
		name: "Explore",
		component: ExplorePage,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;