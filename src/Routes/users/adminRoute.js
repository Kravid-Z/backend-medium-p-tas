import express from "express"
import UserModel from "./userModel.js"
import { basicAuthMiddleware, adminOnly } from "../../Common/auth/index.js"

const adminsRouter = express.Router()


adminsRouter.get("/", basicAuthMiddleware, adminOnly, async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

export default adminsRouter