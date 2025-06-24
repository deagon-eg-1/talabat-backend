const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Menu item name is required"],
  },
  description: String,
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    enum: ["main", "drink", "dessert", "side"],
    default: "main",
  },
  image: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },sleg:{
    type:String
  }
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
