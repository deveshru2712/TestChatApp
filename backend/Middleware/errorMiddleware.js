const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errMessage = err.message || "Something went wrong!";

  res.status(statusCode).json({
    message: errMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export default errorHandler;
