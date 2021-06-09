import atob from "atob";
import UserModel from "../../Routes/users/userModel.js";
import { verifyJWT } from "./tools.js"



//-----> ************* BASIC AUTH **************** <-------------//

// export const basicAuthMiddleware = async (req, res, next) => {
//   if (!req.headers.authorization) {
//     // if you don't provide credentials you are getting a 401
//     const error = new Error("Please provide auth!");
//     error.statusCode = 401;
//     next(error);
//   } else {
//     const decoded = atob(req.headers.authorization.split(" ")[1]);
//     const [email, password] = decoded.split(":");

//     // check the credentials

//     const user = await UserModel.checkCredentials(email, password);
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       const error = new Error("Credentials are wrong");
//       error.statusCode = 401;
//       next(error);
//     }
//   }
// };


//-----> ************* JWT AUTH **************** <-------------//
export const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = await verifyJWT(token)
    const user = await UserModel.findOne({
      _id: decoded._id,
    })

    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (e) {
    console.log(e)
    const err = new Error("Please authenticate")
    err.statusCode = 401
    next(err)
  }
}


export const adminOnly = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    const error = new Error("Admin Only");
    error.statusCode = 403;
    next(error);
  }
};
