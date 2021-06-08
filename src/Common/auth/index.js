import atob from "atob";
import UserModel from "../../Routes/users/userModel.js";

export const basicAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    // if you don't provide credentials you are getting a 401
    const error = new Error("Please provide auth!");
    error.statusCode = 401;
    next(error);
  } else {
    const decoded = atob(req.headers.authorization.split(" ")[1]);
    const [email, password] = decoded.split(":");

    // check the credentials

    const user = await UserModel.checkCredentials(email, password);
    if (user) {
      req.user = user;
      next();
    } else {
      const error = new Error("Credentials are wrong");
      error.statusCode = 401;
      next(error);
    }
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    const error = new Error("Admin Only");
    error.statusCode = 403;
    next(error);
  }
};
