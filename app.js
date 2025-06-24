// app.js
console.log("🚀 App file loaded...");
const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./shared/utils/AppError");
const globalErrorHandler = require("./shared/middlewares/error.middleware");

const globalRoutes = require("./routes/index.routes")
// تقدر تضيف مطاعم ودليفري وأدمن بعد كده

// const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1",globalRoutes);

// Route not found
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;