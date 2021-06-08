import express from "express"
import UserModel from "./userModel.js"

const registerRoute = express.Router()

registerRoute.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const { _id } = await newUser.save()

    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})

export default registerRoute