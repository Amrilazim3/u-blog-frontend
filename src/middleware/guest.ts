import { useAuthStore } from "@/stores/auth";

const auth = ({ next, router }: { next: any; router: any }) => {
	if (useAuthStore().status.token !== null) {
		return router.push("/app");
	} else {
		return next();
	}
};

export default auth;
