class CustomAPIError extends Error {
  constructor(msg, status) {
    super(msg);
    this.statusCode = status;
  }
}

module.exports = CustomAPIError;
