import express from "express";
import { loginController, logoutController, signupController, checkController } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const authRouter = express.Router();

authRouter.post("/signup",signupController);

authRouter.post("/login",loginController);

authRouter.get("/logout", logoutController);

authRouter.get("/check",protectRoute,checkController)

export default authRouter;
