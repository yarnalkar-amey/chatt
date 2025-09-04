import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel; // ✅ JavaScript export
