import express from "express";
import UserModel from "../users/userModel.js";
import { authenticate, refreshToken } from "../../Common/auth/tools.js";

const loginAndRefreshRouter = express.Router();

loginAndRefreshRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.checkCredentials(email, password);
    const tokens = await authenticate(user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});

loginAndRefreshRouter.post("/refreshToken", async (req, res, next) => {
  const oldRefreshToken = req.body.refreshToken;
  if (!oldRefreshToken) {
    const err = new Error("Refresh token missing");
    err.statusCode = 400;
    next(err);
  } else {
    try {
      const newTokens = await refreshToken(oldRefreshToken);
      res.send(newTokens);
    } catch (error) {
      console.log(error);
      const err = new Error(error);
      err.statusCode = 401;
      next(err);
    }
  }
});

export default loginAndRefreshRouter;
