// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const db = require("./config/dataBase");
// const globalRoutes = require("./routes/index.routes")
// const dotenv = require("dotenv").config();
// const PORT = process.env.PORT || 2003;
// const cors = require("cors");

// // database connection
// db();

// // maddleware
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors());

// // routes

// // register router
// app.use(globalRoutes);

// app.all("*", (req, res, next) => {
//   const error = new Error(`Can't find ${req.originalUrl} on this server`);
//   error.statusCode = 404;
//   next(error);
// });

// // error handling middleware
// app.use((err, req, res, next) => {
//   console.error("❌ Error caught:", err.stack); // هنا يطبع الخطأ في التيرمنال
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// // create server
// app.listen(PORT, () => {
//   console.log("app runing");
//   console.log(`http://localhost:${PORT}`);
// });














// server.js
console.log("🔥 Server file loaded...");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config.env" });

// App
const app = require("./app");
console.log("app runing")

// DB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"));

// Server start
const PORT = process.env.PORT || 2003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// التعامل مع الأخطاء غير الملتقطة (Unhandled Promise Rejections)
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});