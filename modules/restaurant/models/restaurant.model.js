const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    "name":{
        type: String,
        required: true,
    },
    "address": {
        type: String,
        required: true,
    },
    "phone":{
        type: String,
        required: true,
    },
    "description":{
        type: String,
        required: true,
    },
    "logo": {
        type: String,
        required: true,
    },
    "ownerId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // كل مطعم ليه صاحب واحد فقط
    },
    "slug": {
        type: String,
        lowercase: true,
    },
},{ timestamps: true })

module.exports = mongoose.model("RestaurantModel", restaurantSchema);