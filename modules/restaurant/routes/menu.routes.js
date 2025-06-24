// import necessary modules
const express = require("express");
const router = express.Router();

// import the menu controller functions
const {
  createItem,
  getAllItems,
  getOneItems,
  updateItem,
  deleteItem,
} = require("../controller/menu.controller");
const {
  restrictToAdmin,
  restrictToOwnerOrAdmin,
} = require("../../../shared/middlewares/authMiddleware");
const {
  checkRestaurantExists,
} = require("../../../shared/middlewares/restaurant.middleware");

// @desc Create a new menu item
// @route POST /api/menu/:restaurantId/create
// @access Private
router.post(
  "/:restaurantId/create",
  checkRestaurantExists,
  restrictToOwnerOrAdmin,
  createItem
);

// @desc update item
// @route put /:restaurantId/updateItem/:itemId
// @access Private
router.put(
  "/:restaurantId/updateItem/:itemId",
  checkRestaurantExists,
  restrictToOwnerOrAdmin,
  updateItem
);

// @desc delete menu item
// @route put /:restaurantId/deleteItem/:itemId
// @access Private
router.delete(
  "/:restaurantId/deleteItem/:itemId",
  checkRestaurantExists,
  restrictToOwnerOrAdmin,
  deleteItem
);

// @desc get all items in menu
// @route get /api/menu/:restaurantId/getAllItems
// @access Private
router.get(
  "/:restaurantId/getAllItems",
  checkRestaurantExists,
  restrictToOwnerOrAdmin,
  getAllItems
);

// @desc get one item in menu
// @route get /:restaurantId/getOneItems/:itemId
// @access Private
router.get(
  "/:restaurantId/getOneItems/:itemId",
  checkRestaurantExists,
  restrictToOwnerOrAdmin,
  getOneItems
);

console.log("📁 Loaded menu.routes with paths:", router.stack.map(r => r.route && r.route.path));
module.exports = router;