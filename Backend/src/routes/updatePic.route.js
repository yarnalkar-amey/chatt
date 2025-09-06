import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { updateProfilePic } from "../controllers/updateController";

const updatePicRouter = express();

updatePicRouter.put("/profilepic", protectRoute, updateProfilePic)