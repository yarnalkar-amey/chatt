import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Settings, LogOut, UserRoundPen } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[70%] lg:w-[60%] 
                    backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl 
                    shadow-[0_8px_25px_rgba(255,255,255,0.15)] transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-3">
        
        {/* Left Side - Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <MessageSquare className="w-7 h-7 text-white group-hover:text-gray-200 transition-colors" />
          <span className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors">
            Chatty
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Settings */}
          <button
            onClick={() => navigate("/settings")}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
          >
            <Settings className="w-6 h-6 text-white" />
          </button>

          {/* Profile */}
          {authUser && (
            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
            >
              <UserRoundPen className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Logout / Login Button */}
          {authUser ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
            >
              <LogOut className="w-6 h-6 text-white" />
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-1.5 rounded-xl bg-white text-black font-semibold shadow-lg 
                         hover:bg-gray-200 transition-all"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
