import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import articlesRouter from "./Components/articles/index.js";
import { notFoundErrorHandler,
    badRequestErrorHandler,
    forbiddenErrorHandler,
    catchAllErrorsHandler,} from "./Common/errorHandlerGeneral.js";

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

server.use("/articles", articlesRouter);


//GENERAL ERRORS
server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorsHandler);



console.log(listEndpoints(server));

mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
