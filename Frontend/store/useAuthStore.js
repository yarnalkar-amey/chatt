import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfilePic: false,

    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data})
        } catch (error) {
            console.log("Error:", error.response.data.message);  // 👈 your message
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    }
}))