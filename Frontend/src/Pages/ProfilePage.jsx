import { Camera, Mail } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import ProfilePicModal from "../components/ProfilePicModal";
import { getMemberSince } from "../lib/prodileUtils";

export default function ProfilePage() {
  const { authUser } = useAuthStore();
  const [wantTo, setWanto] = useState(false);

  console.log(authUser)

  // ✅ Always reflect latest profile picture from Zustand
  const profilePic = authUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <div className="relative w-full max-w-md group">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-3xl opacity-50"></div>

        <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all duration-500 p-8 flex flex-col items-center text-center">
          
          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine"></div>

          {/* Profile Picture */}
          <div className="relative group/avatar">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/20 shadow-xl cursor-pointer transition-transform duration-300 group-hover/avatar:scale-105">
              <img
                src={profilePic}  // ✅ Always shows latest image
                alt="Profile"
                className="w-full h-full object-cover transition-opacity duration-300 group-hover/avatar:opacity-70"
              />
            </div>

            {/* Camera Overlay */}
            <div
              onClick={() => setWanto(true)}
              className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <Camera size={28} className="text-white" />
              <span className="absolute bottom-3 text-white text-xs bg-black/60 px-3 py-1 rounded-full shadow-md">
                Change Photo
              </span>
            </div>
          </div>

          {/* Full Name */}
          <h2 className="mt-6 text-2xl font-bold tracking-wide text-white">
            {authUser?.fullName}
          </h2>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 text-gray-300 mt-1">
            <Mail size={16} />
            <span>{authUser?.email}</span>
          </div>

          {/* Member Since & Status */}
          <div className="flex justify-between items-center w-full bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl px-5 py-3 mt-8 shadow-inner">
            <div className="flex flex-col text-left">
              <span className="text-gray-400 text-xs">Member Since</span>
              <span className="text-white font-medium">
                {getMemberSince(authUser?.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.9)]"></span>
              <span className="text-sm text-gray-300">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Pic Modal */}
      <ProfilePicModal isOpen={wantTo} onClose={() => setWanto(false)} />

      {/* Shine Animation */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(12deg);
          }
          100% {
            transform: translateX(200%) skewX(12deg);
          }
        }
        .animate-shine {
          animation: shine 1.2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
