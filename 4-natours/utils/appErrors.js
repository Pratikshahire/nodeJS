class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //message is the only parameter that Error accepts

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor); //the constructor will not appear in the stack trace and pollute it
  }
}

module.exports = AppError;
