import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { updateProfilePic } from "../controllers/updateController.js";

const updatePicRouter = express();

updatePicRouter.put("/profilepic", protectRoute, updateProfilePic);

export default updatePicRouter;