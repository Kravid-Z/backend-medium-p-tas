import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import mainRouter from "./Routes/index.js";
import cors from "cors";
import passport from "passport";
import oauth from "./Common/auth/oauth.js";
import cookieParser from "cookie-parser";
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorsHandler,
  unauthorizedErrorHandler,
} from "./Common/errorHandlerGeneral.js";

const server = express();
const port = process.env.PORT || 5000;

// server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(passport.initialize());

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
