import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import mainRouter from "./Routes/index.js";
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorsHandler,
  unauthorizedErrorHandler,
} from "./Common/errorHandlerGeneral.js";

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

server.use("/medium", mainRouter);

//GENERAL ERRORS
server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorsHandler);

mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.table(listEndpoints(server));
      console.log(
        "\u001b[" +
          35 +
          "m" +
          "Server is running on port: " +
          port +
          "\u001b[0m"
      );
    })
  )
  .catch((err) => console.log(err));
