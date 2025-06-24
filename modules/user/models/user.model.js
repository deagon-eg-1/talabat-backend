const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", 'restaurantOwner', "admin"],
    default: "user",
  },
  slug: {
    type: String,
    lowercase: true,
  },
});
module.exports = mongoose.model("User", userSchema);
