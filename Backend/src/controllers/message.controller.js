import UserModel from "../models/User.model.js";
import MessageModel from "../models/Message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const filteredUsers = await UserModel.find({
      _id: { $ne: currentUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("GetAll Users Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const userToChat = req.params.id;
    const senderId = req.user._id;

    const messages = await MessageModel.find({
      $or: [
        { senderId: senderId, recieverId: userToChat },
        { senderId: userToChat, recieverId: senderId }
      ]
    })

    return res.status(200).json({
      success: true,
      messages
    });
  } catch (error) {
    console.error("Get Messages Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

import cloudinary from "../lib/cloudinary.js";
import MessageModel from "../models/Message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    // Validate input
    if (!text && !image) {
      return res.status(400).json({ success: false, message: "Message text or image is required." });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat_images",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new MessageModel({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: implement realtime functionality with socket.io

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Send Message Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


