import express from "express";
import q2m from 'query-to-mongo';
import mongoose from 'mongoose';
import articlesModel from "./articles-schema.js";

// const cloudinaryStorage = new CloudinaryStorage({
//     cloudinary: v2,
//     params: {
//       folder: "movie-strive-netflix",
//     },
//   });
// const uploader = multer({ storage: cloudinaryStorage });

const articlesRouter = express.Router();

//  ARTICLES ROUTES *******-------->>>>*<<<<--------******

//GET all articles
articlesRouter.get("/", async (req, res, next) => {
  try {
    const articles = await articlesModel.find();
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
});
//GET article BY ID
articlesRouter.get("/:id", async (req, res, next) => {
  try {
    const article = await articlesModel.findById(req.params.id);
    if (article) {
      res.status(200).send(article);
    } else {
      const error = new Error();
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next("While reading articles list a problem occurred!", error);
  }
});

//POST new article
articlesRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new articlesModel(req.body);
    const { _id } = await newArticle.save();

    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

//POST IMG for article
articlesRouter.post("/upload", async (req, res, next) => {
  // try {
  //   const newArticle = new articlesModel(req.body)
  //   const { _id } = await newArticle.save()
  //   res.status(201).send(_id)
  // } catch (error) {
  //   next(error)
  // }
});

//PUT edit article
articlesRouter.put("/:id", async (req, res, next) => {
  try {
    const article = await articlesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (article) {
      res.send(article);
    } else {
      const error = new Error(`Article with id ${req.params.id} not found`);
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE article
articlesRouter.delete("/:id", async (req, res, next) => {
  try {
    const article = await articlesModel.findByIdAndDelete(req.params.id);
    if (article) {
      res.status(204).send("Deleted");
    } else {
      const error = new Error(`Article with id ${req.params.id} not found`);
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

//  /ARTICLES/REVIEWS ROUTES *******-------->>>>*<<<<--------******

//GET all reviews for specific article
articlesRouter.get("/:id/reviews", async (req, res, next) => {
  try {
    const reviews = await articlesModel.findById(req.params.id, {
      reviews: 1,
    });
    if (reviews) {
      res.status(200).send(reviews);
    } else {
      const error = new Error(
        `not Reviews for this article with id ${req.params.id}`
      );
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//GET review by ID for specific article
articlesRouter.get("/:id/reviews/:reviewID", async (req, res, next) => {
  try {
    const { reviews } = await articlesModel.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) }, 
      // Here^ I need to use mongoose.Types.ObjectId(req.params.id) from mongoose to parse this string in params to type object_id in mongoDB
      { reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewID) },
        },
      }
    );
    if (reviews && reviews.length > 0 ) {
      res.status(200).send(reviews[0])
    } else {
      const error = new Error(
        `review with id ${req.params.reviewID} not found`
      );
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//POST new review
articlesRouter.post("/:id/reviews", async (req, res, next) => {
  try {
    const newReview = req.body;
    const updatedArticles = await articlesModel.findByIdAndUpdate(
      req.params.id,
      { $push: {
          reviews: newReview,
        },
      },
      { runValidators: true, new: true, projection: { reviews: 1 } }
    );
    if (updatedArticles) {
      res.status(201).send({message: "new review in this article", data: updatedArticles})
    } else {
      const error = new Error(
        `error in post new review`
      );
      error.statusCode = 400;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//PUT edit review
articlesRouter.put("/:id/reviews/:reviewID", async (req, res, next) => {
  try {
    const modifiedReview = await articlesModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
        "reviews._id": mongoose.Types.ObjectId(req.params.reviewID),
      },
      { $set: { "reviews.$": req.body } }, // $<-- THIS IS A PLACEHOLDER FOR INDEX IN ARRAYS; The concept of the $ is pretty similar as having something like const $ = array.findIndex(el => el._id === req.params.reviewID)
      {
        runValidators: true,
        new: true,
      }
    )

    if (modifiedReview) {
      res.status(200).send(modifiedReview)
    } else {
      const error = new Error()
      error.statusCode = 400
      next(error)
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//DELETE review
articlesRouter.delete("/:id/reviews/:reviewID", async (req, res, next) => {
  try {
    const modifiedArticle = await articlesModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          reviews: { _id: mongoose.Types.ObjectId(req.params.reviewID) },
        },
      },
      {
        new: true,
      }
    )
    res.status(204).send()
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default articlesRouter;
