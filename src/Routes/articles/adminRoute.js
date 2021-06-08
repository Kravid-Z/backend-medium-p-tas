import express from "express";
import articlesModel from "./articles-schema.js";
import { basicAuthMiddleware, adminOnly } from "../../Common/auth/index.js"



const adminArticlesRouter = express.Router();

//  ARTICLES ROUTES *******-------->>>>*<<<<--------******

//GET all articles
adminArticlesRouter.get("/",basicAuthMiddleware, adminOnly, async (req, res, next) => {
  try {
    const articles = await articlesModel.find().populate("author");
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
});

export default adminArticlesRouter