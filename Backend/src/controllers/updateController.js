import cloudinary from "../lib/cloudinary.js";
import UserModel from "../models/User.model.js";

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body; // 👈 profilePic should come from client body (base64 or URL)
    const userId = req.user._id; // 👈 comes from your auth middleware

    //  Validate
    if (!profilePic) {
      return res.status(400).json({ success: false, message: "Profile pic is required." });
    }

    //  Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pics",
    });

    //  Update user profile
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePic: cloudinaryResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Pic Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
