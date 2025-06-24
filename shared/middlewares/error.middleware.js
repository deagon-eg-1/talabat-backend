// shared/middlewares/error.middleware.js

const AppError = require("../utils/AppError");

const errorMiddleware = (err, req, res, next) => {
  // لو مفيش كود خطأ، خلي 500 (خطأ في السيرفر)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // سجل الخطأ في الكونسول – مفيد وقت التطوير
  console.error("🔥 Error:", err);

  // إرسال الاستجابة للمستخدم
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = errorMiddleware;