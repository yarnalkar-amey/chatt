import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";
import { notify } from "../src/components/Notify";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfilePic: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error:", error.response?.data?.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data.data });
      notify(
        "success",
        `Your account created successfully ${res.data.data.fullName}`
      );
    } catch (error) {
      notify("error", error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data.data });
      notify("success", `Welcome Back ${res.data.data.fullName}`);
    } catch (error) {
      notify("error", error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      notify("success", res.data?.message || "Logged out successfully.");
    } catch (error) {
      notify("error", error.response?.data?.message || "Logout failed.");
    }
  },

  updateProfilePic: async ({ profilePic }) => {
    set({ isUpdatingProfilePic: true });

    try {
      //  Send proper body { profilePic: ... }
      const res = await axiosInstance.put("/update/profilepic", {
        profilePic,
      });

      //  Update authUser state with the updated user object
      set({ authUser: res.data.user });

      //  Show success message
      notify("success", "Profile picture updated successfully!");
    } catch (error) {
      console.error("Profile Pic Update Error:", error);

      //  Handle errors safely
      notify(
        "error",
        error.response?.data?.message || "Failed to update profile picture."
      );
    } finally {
      set({ isUpdatingProfilePic: false });
    }
  },
}));
