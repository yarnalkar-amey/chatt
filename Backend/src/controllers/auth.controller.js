import { signupValidator } from "../Validators/auth.validator.js";
import { hashPassword } from "../lib/hashPassword.js";
import { generateToken } from "../lib/jwt.js";
import UserModel from "../models/User.model.js";

export const signupController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if(!fullName ||  !email || !password){
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    // ✅ validate inputs
    const { error } = signupValidator.validate({ fullName, email, password });
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }

    // ✅ check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "User already exists." });
    }

    // ✅ hash password
    const hashedPassword = await hashPassword(password);

    // ✅ create new user
    const newUser = new UserModel({
      fullName, // keep same casing as your schema
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ generate token & set cookie
    generateToken(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
