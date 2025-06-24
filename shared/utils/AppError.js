// shared/utils/AppError.js

class AppError extends Error {
    constructor(message, statusCode) {
      super(message); // بنرسل الرسالة للأب (Error class)
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true; // ده خطأ "متوقع"، مش خلل داخلي
  
      Error.captureStackTrace(this, this.constructor); // بيدي Stack نظيف
    }
  }
  
  module.exports = AppError;