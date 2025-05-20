class HttpError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = HttpError;
