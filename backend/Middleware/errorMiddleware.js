const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errMessage = err.message || "Something went wrong!";

  res.status(statusCode).json({
    message: errMessage,
  });
};

export default errorHandler;
