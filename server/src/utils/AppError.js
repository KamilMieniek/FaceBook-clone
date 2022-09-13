class AppError {
  constructor(errorType, description) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.errorType = errorType;
  }
}

// ========================================================
// Exports
// ========================================================
export default AppError;
