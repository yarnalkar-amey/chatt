import { useState } from "react";
import { Eye, EyeOff, MessageSquare } from "lucide-react";
import { notify } from "../components/Notify";
import { useAuthStore } from "../../store/useAuthStore";
import WaitingStatus from "../components/WaitingStatus";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {signup, isSigningUp} = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateFormFields = (e) => {
    e.preventDefault();

    const { fullName, email, password } = formData;

    // 1️⃣ Check required fields
    if (!fullName || !email || !password) {
      notify("error", "Please fill all the required information.");
      return false;
    }

    // 2️⃣ Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notify("error", "Please enter a valid email address.");
      return false;
    }

    // 3️⃣ Password validation (optional)
    if (password.length < 6) {
      notify("error", "Password must be at least 6 characters long.");
      return false;
    }

    // ✅ If all validations pass
    return true;
  };

  const handleSubmit = async(e) => {

    const success = validateFormFields(e);

    if(success){
      await signup(formData);
    }

  }
  

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Left Side - Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 py-12">
        {/* Logo / Branding */}

        {/* Title + Subtitle */}
        <h2 className="text-3xl font-semibold mb-2">Create Account</h2>
        <p className="text-gray-400 mb-8">
          Join us today and start chatting instantly with your friends.
        </p>

        {/* Signup Form */}
        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              name="fullName"
              className="w-full mt-2 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-white focus:outline-none transition"
              onChange={(e) =>
                setFormData((data) => ({ ...data, fullName: e.target.value }))
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData((data) => ({ ...data, email: e.target.value }))
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
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((data) => ({ ...data, password: e.target.value }))
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all"
            onClick={(e) => handleSubmit(e)}
          >
           {isSigningUp == true ? <WaitingStatus show={true} message="Signing You in"/> : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-8 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-white font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden md:flex flex-col md:w-1/2 items-center justify-center bg-black border-l border-gray-800 px-6">
        <h1 className="text-5xl font-extrabold tracking-wide">
          {" "}
          <div className="flex items-center gap-2">
            <MessageSquare className="w-10 h-10 text-white" strokeWidth={4} />
            <h1 className="text-5xl font-bold tracking-wide">Chatty</h1>
          </div>
        </h1>
        <p className="mt-4 text-gray-400 text-lg max-w-md text-center">
          A minimal chat platform designed for speed, simplicity, and seamless
          conversations.
        </p>
      </div>
    </div>
  );
}
