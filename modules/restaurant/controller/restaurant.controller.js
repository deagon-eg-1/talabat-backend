// importing necessary modules (schema, slugify, async handler)
const restaurantModel = require("../models/restaurant.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc Create a new restaurant
// @route POST /api/restaurants
// @access Private (Admin)
exports.createRestaurant = asyncHandler(async (req, res) => {
  // calling the restaurant model to create a new restaurant
  const { name, description, address, phone, logo, ownerId } = req.body;

  // optional check to prevent duplicate restaurant names
  const existingRestaurant = await restaurantModel.findOne({ name });
  if (existingRestaurant) {
    return res.status(400).json({
      success: false,
      message: "Restaurant with this name already exists",
    });
  }
  // create a new restaurant
  const restaurant = await restaurantModel.create({
    name,
    description,
    address,
    phone,
    logo,
    ownerId,
    slug: slugify(name),
  });
  res.status(201).json({
    success: true,
    message: "Restaurant created successfully",
    restaurant,
  });
});

// @desc update a restaurant
// @route PUT /api/restaurants/:id
// @access Private (Admin or restaurant Owner)
exports.updateRestaurant = asyncHandler(async (req, res) => {
  // find the restaurant by id
  const restaurant = await restaurantModel.findByIdAndUpdate(
    req.params.id, // تأكد إن ID جاي من params مش body
    {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      phone: req.body.phone,
      logo: req.body.logo,
    },
    { new: true, runValidators: true }
  );

  // ✅ رد النجاح
  res.status(200).json({
    success: true,
    message: "Restaurant updated successfully",
    restaurant,
  });
});

// @desc delete a restaurant
// @route DELETE /api/restaurants/:id
// @access Private (Admin or restaurant Owner)
exports.deleteRestaurant = asyncHandler(async (req, res) => {
  // find the restaurant by id and delete it
  const restaurant = await restaurantModel.findByIdAndDelete(req.params.id);

  // ✅ رد النجاح
  res.status(200).json({
    success: true,
    message: "Restaurant deleted successfully",
  });
});

// @desc Get restaurants
// @route GET /api/restaurant
// @access Public
exports.getRestaurant = asyncHandler(async (req, res) => {
  // find restaurants
  const restaurant = await restaurantModel.findById(req.params.id);

  // ✅ رد النجاح
  res.status(200).json({
    success: true,
    message: "Restaurants fetched successfully",
    restaurant,
  });
});
