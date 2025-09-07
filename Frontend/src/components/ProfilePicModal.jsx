import { useState } from "react";
import { X, Camera } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfilePicModal({ isOpen, onClose }) {
  const [preview, setPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const { updateProfilePic, isUpdatingProfilePic } = useAuthStore();

  if (!isOpen) return null;

  const handleFileChange = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfilePic({ profilePic: base64Image });
      onClose();
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-black/80 rounded-2xl shadow-2xl border border-white/10 p-6 transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white text-center mb-2">
          Update Profile Picture
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Choose a new profile picture and give your profile a fresh look.
        </p>

        {/* Image Upload Section */}
        <div className="flex flex-col items-center">
          <div className="relative group/avatar w-32 h-32">
            {/* Preview Image */}
            <img
              src={preview}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-white/10 shadow-lg transition-transform duration-300 group-hover/avatar:scale-105"
            />

            {/* Camera Overlay */}
            <label
              htmlFor="profile-pic-input"
              className="absolute inset-0 rounded-full flex flex-col items-center justify-center 
                         bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 
                         cursor-pointer"
            >
              <Camera size={28} className="text-white" />
              <span className="absolute bottom-3 text-white text-xs bg-black/60 px-3 py-1 rounded-full shadow-md">
                Change Photo
              </span>
            </label>

            {/* Hidden File Input */}
            <input
              id="profile-pic-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center min-w-[130px]"
            onClick={handleFileChange}
            disabled={isUpdatingProfilePic}
          >
            {isUpdatingProfilePic ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
