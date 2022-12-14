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
import guest from "@/middleware/guest";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/home",
		meta: {
			middleware: guest,
		},
	},
	{
		path: "/home",
		name: "Home",
		component: HomePage,
		meta: {
			middleware: guest,
		},
	},
	{
		path: "/register",
		name: "Register",
		component: RegisterPage,
		meta: {
			middleware: guest,
		},
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
				path: "users/:user/posts/:post/show",
				component: () => import("@/views/User/Post/ShowPage.vue"),
			},
			{
				path: "users/:user/profile",
				component: () => import("@/views/User/ProfilePage.vue"),
			},
			{
				path: "account/chats",
				component: () => import("@/views/Account/Chat/IndexPage.vue"),
			},
			{
				path: "account/profile",
				component: () => import("@/views/Account/ProfilePage.vue"),
			},
			{
				path: "account/profile/edit",
				component: () => import("@/views/Account/EditPage.vue"),
			},
			{
				path: "account/posts/:post/show",
				component: () => import("@/views/Account/Post/ShowPage.vue"),
			}
		],
	},
	{
		path: "/account/chats/:user",
		name: "User Chat",
		component: () => import("@/views/Account/Chat/UserChat.vue"),
	},
	{
		path: "/account/posts/create",
		name: "Create Post",
		component: () => import("@/views/Account/Post/CreatePage.vue"),
	},
	{
		path: "/account/posts/:post/edit",
		name: "Edit Post",
		component: () => import("@/views/Account/Post/EditPage.vue"),
	}
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
