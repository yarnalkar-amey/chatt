import dotenv from "dotenv";
dotenv.config(); // MUST be at the very top

import express from "express";
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //parses json
app.use(cookieParser())

// Middleware
app.use("/api/auth", authRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
});

