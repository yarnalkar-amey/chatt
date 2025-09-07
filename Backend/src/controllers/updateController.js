import cloudinary from "../lib/cloudinary.js";
import UserModel from "../models/User.model.js";

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body; // base64 image from client
    const userId = req.user._id; // comes from auth middleware

    // 1️⃣ Validate input
    if (!profilePic) {
      return res.status(400).json({ 
        success: false, 
        message: "Profile picture is required." 
      });
    }

    // 2️⃣ Find user first (optional but better for clear errors)
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found." 
      });
    }

    // 3️⃣ Delete old profile picture from Cloudinary if exists
    if (user.profilePic) {
      // Extract public_id from Cloudinary URL
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profile_pics/${publicId}`);
    }

    // 4️⃣ Upload new profile picture to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pics",
      transformation: [
        { width: 500, height: 500, crop: "fill" }, // ✅ Auto-resize & crop
        { quality: "auto" }, // ✅ Optimize image quality
        { fetch_format: "auto" }, // ✅ Serve as WebP/AVIF for better performance
      ],
    });

    // 5️⃣ Update user profile in DB
    user.profilePic = cloudinaryResponse.secure_url;
    await user.save();

    // 6️⃣ Send response
    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully.",
      user,
    });

  } catch (error) {
    console.error("Update Profile Pic Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};
