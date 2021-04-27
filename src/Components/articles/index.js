import express from "express"

import articlesModel from "./articles-schema.js"

const articlesRouter = express.Router()

articlesRouter.get("/", async (req, res, next) => {
  try {
    const articles = await articlesModel.find()
    res.status(200).send(articles)
  } catch (error) {
    next(error)
  }
})

articlesRouter.get("/:id", async (req, res, next) => {
  try {
    const article = await articlesModel.findById(req.params.id)
    if (article) {
      res.status(200).send(article)
    } else {
      const error = new Error()
      error.statusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading articles list a problem occurred!",error)
  }
})

articlesRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new articlesModel(req.body)
    const { _id } = await newArticle.save()

    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})

articlesRouter.put("/:id", async (req, res, next) => {
  try {
    const article = await articlesModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    })
    if (article) {
      res.send(article)
    } else {
      const error = new Error(`Article with id ${req.params.id} not found`)
      error.statusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

articlesRouter.delete("/:id", async (req, res, next) => {
  try {
    const article = await articlesModel.findByIdAndDelete(req.params.id)
    if (article) {
      res.status(204).send("Deleted")
    } else {
      const error = new Error(`Article with id ${req.params.id} not found`)
      error.statusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

export default articlesRouter