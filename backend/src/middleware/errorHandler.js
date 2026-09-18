export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.fromEntries(
        Object.entries(err.errors).map(([key, value]) => [key, value.message])
      ),
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ message: `${field} is already in use` });
  }

  res.status(status).json({
    message: err.message || "Server error",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
