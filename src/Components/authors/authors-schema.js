import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AuthorsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    articles: [{ type: Schema.Types.ObjectId, ref: "Articles" }],
  },
  { timestamps: true }
);

export default model("Authors", AuthorsSchema);
