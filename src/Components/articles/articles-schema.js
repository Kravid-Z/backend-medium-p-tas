import mongoose from "mongoose";

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
    author: {
      name: { type: String },
      img: { type: String },
    },
    cover: { type: String },
  },
  { timestamps: true }
);

export default model("Articles", articlesSchema);
