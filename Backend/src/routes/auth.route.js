import express from "express";

const authRouter = express.Router();

authRouter.get("/signup", (req, res, next) => {
  res.send("Signup routed");
});

authRouter.get("/login", (req, res, next) => {
  res.send("login routed");
});

authRouter.get("/logout", (req, res, next) => {
  res.send("logout routed");
});

export default authRouter;
