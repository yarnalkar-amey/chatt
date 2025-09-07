import { useState } from "react";
import { Eye, EyeOff, MessageSquare } from "lucide-react";
import { notify } from "../components/Notify";
import WaitingStatus from "../components/WaitingStatus";
import { useAuthStore } from "../../store/useAuthStore"; // adjust path

export default function LoginPage() {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const validateFormFields = () => {
    const { email, password } = formData;
    if (!email || !password) {
      notify("error", "Please fill all the required information.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notify("error", "Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      notify("error", "Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateFormFields()) return;
    await login(formData);
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 py-12">
        <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-gray-400 mb-8">
          Log in to your account and continue chatting with your friends.
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full mt-2 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-white focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-white focus:outline-none transition"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-gray-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
          >
            {isLoggingIn ? (
              <WaitingStatus show={true} message="Logging In" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-white font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-col md:w-1/2 items-center justify-center bg-black border-l border-gray-800 px-6">
        <div className="flex items-center justify-center gap-2">
          <MessageSquare className="w-10 h-10 text-white" strokeWidth={4} />
          <h1 className="text-5xl font-bold tracking-wide">Chatty</h1>
        </div>
        <p className="mt-4 text-gray-400 text-lg max-w-md text-center">
          A minimal chat platform designed for speed, simplicity, and seamless
          conversations.
        </p>
      </div>
    </div>
  );
}
