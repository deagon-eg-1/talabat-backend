// import the express router
const express = require("express");
const router = express.Router();

// import the restaurant controller and middlewares
const {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurant,
} = require("../controller/restaurant.controller");
const {
  restrictToAdmin,
  restrictToOwnerOrAdmin,
} = require("../../../shared/middlewares/authMiddleware");
const {
  checkRestaurantExists,
} = require("../../../shared/middlewares/restaurant.middleware");

// @desc Create a new restaurant
// @route POST /api/restaurants/createRestaurant
// @access Private (Admin only)
router.post(
  "/createRestaurant",
  restrictToAdmin,
  createRestaurant
);

// @desc update a restaurant
// @route PUT /api/restaurants/updateRestaurant/:id
// @access Private (Admin only or Restaurant Owner)
router.put(
  "/updateRestaurant/:id",
  checkRestaurantExists,
  restrictToOwnerOrAdmin,
  updateRestaurant
);

// @desc delete a restaurant
// @route DELETE /api/restaurants/deleteRestaurant/:id
// @access Private (Admin only or Restaurant Owner)
router.delete(
  "/deleteRestaurant/:id",
  checkRestaurantExists,
  restrictToOwnerOrAdmin,
  deleteRestaurant
);

// @desc get restaurant
// @route DELETE /api/restaurants/getRestaurants/:id
// @access Private (Admin only or Restaurant Owner)
router.get(
  "/getRestaurant/:id",
  checkRestaurantExists,
  restrictToOwnerOrAdmin,
  getRestaurant
);

// export the router
console.log("📁 Loaded restaurant.routes with paths:", router.stack.map(r => r.route && r.route.path));
module.exports = router;
