import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import articlesRouter from "./Components/articles/index.js"

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

server.use("/articles", articlesRouter)


console.log(listEndpoints(server))

mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port)
    })
  )
  .catch(err => console.log(err))