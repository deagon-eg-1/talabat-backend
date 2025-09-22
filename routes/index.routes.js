const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/user/routes/auth.routes");
const restaurantRoutes = require("../modules/restaurant/routes/restaurant.routes");
const menuRoutes = require("../modules/restaurant/routes/menu.routes");

router.use("/auth", authRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/menu", menuRoutes);

module.exports = router;
