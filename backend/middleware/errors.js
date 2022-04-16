const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    //MONGOOSE Errors
    //ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found. Invalid: " + err.path;
      error = new ErrorHandler(message, 400);
    }
    //ValidationError
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //Duplicate key error
    if (err.code === 11000) {
      const message = "Duplicate " + Object.keys(err.keyValue) + " entered";
      error = new ErrorHandler(message, 400);
    }

    //JWT Token Handler
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try again";
      error = new ErrorHandler(message, 400);
    }

    //JWT Token Handler Expire
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired.";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
