import { useAuthStore } from "@/stores/auth"

export const useHeaders = (): object => {
    return {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${useAuthStore().status.token}`
        },
    }
}