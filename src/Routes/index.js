import express from "express";
import articlesRouter from "./articles/index.js";
import authorsRouter from "./authors/index.js";
import usersRoute from "./users/index.js";
import registerRoute from "./users/registerRoute.js";
import loginAndRefreshRoute from "./users/loginRoute.js";
import logOutRoute from "./users/logOutRoute.js";
import adminRoute from "./users/adminRoute.js";

const mainRouter = express.Router();

mainRouter.use("/register", registerRoute);
mainRouter.use("/", loginAndRefreshRoute);
mainRouter.use("/", logOutRoute);
mainRouter.use("/me", usersRoute);
mainRouter.use("/me/admin", adminRoute);
mainRouter.use("/me/articles", articlesRouter);
mainRouter.use("/me/authors", authorsRouter);
// mainRouter.use("/me/reviews", reviewsRoute);
// mainRouter.use("/me/categories", categoriesRoute);

export default mainRouter;
