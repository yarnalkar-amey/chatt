import dotenv from "dotenv";
dotenv.config(); // MUST be at the very top

import express from "express";
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import updatePicRouter from "./routes/updatePic.route.js";
import messageRouter from "./routes/message.route.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //parses json
app.use(cookieParser())

// Middleware
app.use("/api/auth", authRouter);
app.use("/api/update", updatePicRouter);
app.use("/api/message", messageRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
});

