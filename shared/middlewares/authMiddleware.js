const jwt = require("jsonwebtoken");
const restaurantModel = require("../../modules/restaurant/models/restaurant.model");

// @desc Verify JWT token
// @route Middleware
// @access Private
// ---------------> get the token from the Authorization header
exports.verifyToken = (req, res, next) => {
  const Authorization = req.headers.authorization;
  if (!Authorization) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const token = Authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT Verify Error:", error.message); // اطبع الخطأ
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
};

// @desc Restrict access to admin users only
// @route Middleware
// @access Private
// ---------------> check if the user has admin role
exports.restrictToAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only." });
  }
  next();
};

// @desc Allow access to owner or admin users
// @route Middleware
// @access Private
// ---------------> check if the user is the owner or an admin
exports.adminOrOwner = (req, res, next) => {
  const userId = req.params.id;
  const isOwner = String(req.user.id) === String(userId);
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      message: "Access denied: Only admin or owner can access this route.",
    });
  }

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
