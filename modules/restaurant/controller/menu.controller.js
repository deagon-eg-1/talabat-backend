const MenuItem = require("../models/menuItem.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc Create a new menu item
// @route POST /api/menu/:restaurantId/create
// @access Private
exports.createItem = asyncHandler(async (req, res) => {
  const { name, price, category, image } = req.body;
  const restaurantId = req.params.restaurantId;

  const item = await MenuItem.create({
    name,
    price,
    category,
    image,
    restaurant: restaurantId,
    slug: slugify(name),
  });
  res.status(201).json({
    success: true,
    message: "Menu item created successfully",
    item,
  });
});

// @desc update menu item
// @route PUT /api/menu/:restaurantId/updateItem/:itemId
// @access Private
exports.updateItem = asyncHandler(async (req, res) => {
  // find the restaurant by id
  const item = await MenuItem.findByIdAndUpdate(
    req.params.itemId, // تأكد إن ID جاي من params مش body
    {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      restaurant: req.body.restaurant,
    },
    { new: true, runValidators: true }
  );

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  // ✅ رد النجاح
  res.status(200).json({
    success: true,
    message: "item updated successfully",
    item,
  });
});

// @desc delete menu item
// @route DELETE /api/menu/:restaurantId/deleteItem/:itemId
// @access Private
exports.deleteItem = asyncHandler(async (req, res) => {
  // find the restaurant by id
  const item = await MenuItem.findByIdAndDelete(req.params.itemId);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  // ✅ رد النجاح
  res.status(200).json({
    success: true,
    message: "item delelte successfully",
    item,
  });
});

// @desc get all items in menu
// @route get /api/menu/:restaurantId/getAllItems
// @access Private
exports.getAllItems = asyncHandler(async (req, res) => {
  // find the restaurant by id
  const items = await MenuItem.find({ restaurant: req.params.restaurantId });

  if (!items) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  // ✅ رد النجاح
  res.status(200).json({
    success: true,
    message: "get all items in menu successfully",
    totalItems: items.length,
    item,
  });
});

// @desc get one item in menu
// @route GET /api/menu/:restaurantId/getOneItems/:itemId
// @access Private
exports.getOneItems = asyncHandler(async (req, res) => {
  // find the restaurant by id
  const item = await MenuItem.findOne({
    _id: req.params.itemId,
    restaurant: req.params.restaurantId,
  });

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  // ✅ رد النجاح
  res.status(200).json({
    success: true,
    message: "get one item in menu successfully",
    item,
  });
});
