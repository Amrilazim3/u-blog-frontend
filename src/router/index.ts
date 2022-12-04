import { createRouter, createWebHistory } from "@ionic/vue-router";
import {
	RouteRecordRaw,
	NavigationGuardNext,
	RouteLocationNormalized,
} from "vue-router";
import HomePage from "@/views/HomePage.vue";
import RegisterPage from "@/views/Auth/RegisterPage.vue";
import LoginPage from "@/views/Auth/LoginPage.vue";
import MainPage from "@/views/MainPage.vue";
import auth from "@/middleware/auth";

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
		path: "/app/",
		component: MainPage,
		meta: {
			middleware: auth,
		},
		children: [
			{
				path: "",
				redirect: "/app/explore",
			},
			{
				path: "explore",
				component: () => import("@/views/Blog/ExplorePage.vue"),
			},
			{
				path: "users/:user/posts/:post",
				component: () => import("@/views/Blog/ViewPostPage.vue"),
			},
			{
				path: "chat",
				component: () => import("@/views/Chat/IndexPage.vue"),
			},
			{
				path: "profile",
				component: () => import("@/views/Profile/IndexPage.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

function nextFactory(
	context: any,
	middleware: ((context: any) => NavigationGuardNext)[],
	index: number
) {
	const subsequentMiddleware = middleware[index];

	if (!subsequentMiddleware) return context.next;

	return (...parameters: any[]) => {
		context.next(...parameters);
		const nextMiddleware = nextFactory(context, middleware, index);
		subsequentMiddleware({ ...context, next: nextMiddleware });
	};
}

router.beforeEach(
	(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		if (to.meta.middleware) {
			const middleware = Array.isArray(to.meta.middleware)
				? to.meta.middleware
				: [to.meta.middleware];

			const context = {
				from,
				next,
				router,
				to,
			};

			const nextMiddleware = nextFactory(context, middleware, 1);

			return middleware[0]({ ...context, next: nextMiddleware });
		}

		return next();
	}
);

export default router;
