const restaurantModel = require("../../modules/restaurant/models/restaurant.model");

exports.checkRestaurantExists = async (req, res, next) => {
  const restaurantId = req.params.id || req.body.restaurant;

  const restaurant = await restaurantModel.findById(restaurantId);
  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: "Restaurant not found",
    });
  }
  req.restaurant = restaurant; // 👉 إضافي
  next();
};

// @desc Restrict access to owner or admin users
// @route Middleware
// @access Private
exports.restrictToOwnerOrAdmin = async (req, res, next) => {
  const restaurant = req.restaurant;

  const isOwner = String(req.user.id) === String(restaurant.ownerId);
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      message:
        "Access denied: Only admin or restaurant owner can access this route.",
    });
  }

  next();
};
