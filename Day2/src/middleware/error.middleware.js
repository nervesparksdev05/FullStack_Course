const { ApiError } = require("../utils/ApiError");

function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;

  // Keep response consistent
  const payload = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (err.details) payload.details = err.details;

  // Optional: show stack only in development
  if (process.env.NODE_ENV === "development") payload.stack = err.stack;

  res.status(status).json(payload);
}

module.exports = { notFound, errorHandler };
