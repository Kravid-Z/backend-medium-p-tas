import express from "express";
import { basicAuthMiddleware} from "../Common/auth/index.js"
import articlesRouter from "./articles/index.js";
// import authorsRouter from "./authors/index.js";
import usersRoute from "./users/index.js";
import registerRoute from "./users/registerRoute.js"
import adminRoute from "./users/adminRoute.js"
import adminArticlesRoute from "./articles/adminRoute.js"



const mainRouter = express.Router();

mainRouter.use("/register", registerRoute);
mainRouter.use("/users", usersRoute);
mainRouter.use("/users/admin", adminRoute);
mainRouter.use("/users/admin", adminArticlesRoute);
// mainRouter.use("/authors", authorsRouter);
mainRouter.use("/me/articles", basicAuthMiddleware , articlesRouter);
// mainRouter.use("/reviews", reviewsRoute);
// mainRouter.use("/categories", categoriesRoute);

export default mainRouter;