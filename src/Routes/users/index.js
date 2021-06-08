import express from "express"
import UserModel from "./userModel.js"
import { basicAuthMiddleware} from "../../Common/auth/index.js"

const usersRouter = express.Router()


usersRouter.get("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    await req.user.deleteOne()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

usersRouter.put("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    console.log(req.body)

    // req.user.name = req.body.name

    const updates = Object.keys(req.body)

    updates.forEach(u => (req.user[u] = req.body[u]))

    await req.user.save()

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default usersRouter
