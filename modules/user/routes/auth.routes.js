const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteOwnAccount,
  updatePassword,
} = require("../controller/auth.controlle");
const {
  verifyToken,
  restrictToAdmin,
  adminOrOwner,
} = require("../../../shared/middlewares/authMiddleware");

// register and login router
router.post("/register", createUser);
router.post("/login", loginUser);

// dashboard route
//  test the JWT token by accessing this route after logging in
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome, authorized user!", user: req.user });
});

// delete user route
router.delete("/deleteUser/:id", verifyToken, restrictToAdmin, deleteUser);

// get all users route
router.get("/allUsers", verifyToken, restrictToAdmin, getAllUsers);

// get single user route
router.get(
  "/user/account-information/:id",
  verifyToken,
  adminOrOwner,
  getSingleUser
);

// update user profile route
router.put(
  "/user/update/owner-account/:id",
  verifyToken,
  adminOrOwner,
  updateUserProfile
);

// delete own account route
router.delete(
  "/user/delete/owner-account/:id",
  verifyToken,
  adminOrOwner,
  deleteOwnAccount
);

// update password route
router.put(
  "/user/update/password/owner-account/:id",
  verifyToken,
  adminOrOwner,
  updatePassword
);

console.log("📁 Loaded auth.routes with router stack:", router.stack.map(r => r.route && r.route.path));
module.exports = router;

