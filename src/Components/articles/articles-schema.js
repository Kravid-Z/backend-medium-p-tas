import mongoose from "mongoose";
import reviewsSchema from "./reviews-schema.js";

const { Schema, model } = mongoose;

const articlesSchema = new Schema(
  {
    headLine: {
      type: String,
      required: true,
    },
    subHead: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      name: { type: String },
      img: { type: String },
    },
    author: [{ type: Schema.Types.ObjectId, required: true, ref: "Authors" }],
    cover: { type: String },
    reviews: [reviewsSchema],
  },
  { timestamps: true }
);

export default model("Articles", articlesSchema);
