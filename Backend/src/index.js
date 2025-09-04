import dotenv from "dotenv";
dotenv.config(); // MUST be at the very top

import express from "express";
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use("/api/auth", authRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
});
