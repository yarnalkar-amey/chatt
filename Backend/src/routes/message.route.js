import e from "express";
import {getUsersForSidebar, getMessages, sendMessage} from "../controllers/message.controller.js"
import {protectRoute} from "../middleware/protectRoute.js";

const messageRouter = e.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter;
