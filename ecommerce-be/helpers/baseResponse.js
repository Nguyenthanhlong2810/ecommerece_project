class BaseResponse {
  constructor(statusCode, message, result) {
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
  }
}

module.exports = BaseResponse;
