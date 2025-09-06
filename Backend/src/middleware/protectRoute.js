import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js"; // don't forget .js if using ESM

export const protectRoute = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorised - No token found." });
  }

  try {
    // verify & decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user without password
    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // attach user to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorised - Invalid or expired token." });
  }
};
