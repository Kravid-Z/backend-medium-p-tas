// ERROR 404 means NOT FOUND!
export const notFoundErrorHandler = (err, req, res, next) => {
  if (err.statusCode === 404) {
    res.status(404).send(err || "Sorry nothing here ºº! !");
  } else {
    next(err); // Remember always pass down the error to other handlers
  }
};
// ERROR 400 means BAD REQUEST!
export const badRequestErrorHandler = (err, req, res, next) => {
  if (err.statusCode === 400) {
    res.status(400).send(err); // err.errorList <= This could be the format error validator in future SchemaValidator
  } else {
    next(err);
  }
};
// ERROR 401 means UNAUTHORIZED!
export const unauthorizedErrorHandler = (err, req, res, next) => {
  if (err.statusCode === 401) {
    res.status(401).send(err.message)
  } else {
    next(err)
  }
}
// ERROR 403 means FORBIDDEN!
export const forbiddenErrorHandler = (err, req, res, next) => {
  if (err.statusCode === 403) {
    res.status(403).send(err.message); // This error should be throw when ueer is not authorized still not setted
  } else {
    next(err);
  }
};
// ERROR 500 means SERIOUS PROBLEMS!

export const catchAllErrorsHandler = (err, req, res, next) => {
  res.status(500).send(err.message);
  console.log("Last Handler (500)---> ", err);
};
