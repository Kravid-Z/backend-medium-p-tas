import express from "express";
import q2m from "query-to-mongo";
import mongoose from "mongoose";
import AuthorsModel from "./authors-schema.js";
import { jwtAuthMiddleware} from "../../Common/auth/index.js"

// const cloudinaryStorage = new CloudinaryStorage({
//     cloudinary: v2,
//     params: {
//       folder: "movie-strive-netflix",
//     },
//   });
// const uploader = multer({ storage: cloudinaryStorage });

const authorsRouter = express.Router();

//  AUTHORS ROUTES *******-------->>>>*<<<<--------******

//GET all authors
authorsRouter.get("/", jwtAuthMiddleware , async (req, res, next) => {
  try {
    const authors = await AuthorsModel.find().populate("articles");
    res.status(200).send(authors);
  } catch (error) {
    next(error);
  }
});
//GET author BY ID
authorsRouter.get("/:id", jwtAuthMiddleware , async (req, res, next) => {
  try {
    const author = await AuthorsModel.findById(req.params.id);
    if (author) {
      res.status(200).send(author);
    } else {
      const error = new Error();
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next("While reading authors list a problem occurred!", error);
  }
});

//POST new author
authorsRouter.post("/", jwtAuthMiddleware , async (req, res, next) => {
  try {
    const newAuthor = new AuthorsModel(req.body);
    const { _id } = await newAuthor.save();

    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

//POST IMG for Author
authorsRouter.post("/upload", jwtAuthMiddleware , async (req, res, next) => {
  // try {
  //   const newAuthor = new AuthorsModel(req.body)
  //   const { _id } = await newAuthor.save()
  //   res.status(201).send(_id)
  // } catch (error) {
  //   next(error)
  // }
});

//PUT edit author
authorsRouter.put("/:id", jwtAuthMiddleware , async (req, res, next) => {
  try {
    const author = await AuthorsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (author) {
      res.send(author);
    } else {
      const error = new Error(`author with id ${req.params.id} not found`);
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE author
authorsRouter.delete("/:id", jwtAuthMiddleware , async (req, res, next) => {
  try {
    const author = await AuthorsModel.findByIdAndDelete(req.params.id);
    if (author) {
      res.status(204).send("Deleted");
    } else {
      const error = new Error(`author with id ${req.params.id} not found`);
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
