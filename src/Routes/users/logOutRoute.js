import express from "express";
import { jwtAuthMiddleware } from "../../Common/auth/index.js";

const logOutRouter = express.Router();

logOutRouter.post("/logout", jwtAuthMiddleware, async (req, res, next) => {
  try {
    req.user.refreshToken = null;
    await req.user.save();
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.send("Logged out!");
  } catch (error) {
    next(error);
  }
});

export default logOutRouter;
