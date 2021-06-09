import express from "express"
import UserModel from "./userModel.js"
import articlesModel from "../articles/articles-schema.js";
import { jwtAuthMiddleware, adminOnly } from "../../Common/auth/index.js"

const adminsRouter = express.Router()


adminsRouter.get("/", jwtAuthMiddleware, adminOnly, async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

//  ARTICLES ADMIN ROUTES *******-------->>>>*<<<<--------******

//GET all articles
adminsRouter.get("/",jwtAuthMiddleware, adminOnly, async (req, res, next) => {
    try {
      const articles = await articlesModel.find().populate("author");
      res.status(200).send(articles);
    } catch (error) {
      next(error);
    }
  });

export default adminsRouter
