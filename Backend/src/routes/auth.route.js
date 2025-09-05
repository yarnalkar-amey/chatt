import express from "express";
import { signupController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup",signupController);

export default authRouter;
