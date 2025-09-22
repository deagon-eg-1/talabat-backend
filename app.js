const express = require("express");
const morgan = require("morgan");
const globalRoutes = require("./routes/index.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1", globalRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ status: "fail", message: "Route not found" });
});


module.exports = app;
