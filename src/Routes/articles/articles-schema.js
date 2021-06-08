import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewsSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

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
      name: { type: String, enum: ["horror", "romance", "fantasy", "history", "IT"] },
      img: { type: String },
    },
    author: { type: Schema.Types.ObjectId, required: true, ref: "Authors" },
    cover: { type: String },
    reviews: [reviewsSchema],
  },
  { timestamps: true }
);

export default model("Articles", articlesSchema);
