const User = require("../models/user.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

// @desc Register new user
// @route POST /api/auth/register
// @access Public

exports.createUser = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12);
  const role = req.body.role || "user";

  const user = await User.create({
    name,
    userName,
    email,
    password: hashedPassword,
    role,
  });
  res.status(201).json({
    status: "success",
    data: user,
  });
});

// @desc login user
// @route POST /api/auth/login
// @access Public

exports.loginUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findEmail = await User.findOne({ email });
  if (!findEmail) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const passwordValid = await bcrypt.compare(password, findEmail.password);

  if (passwordValid) {
    const token = jwt.sign(
      { id: findEmail._id, role: findEmail.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      status: "success",
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

// @desc Delete user
// @route DELETE /api/auth/user/:id
// @access Private, Admin only
exports.deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndDelete(userId);

  res.json({
    status: "success",
    message: "User deleted successfully",
  });
});

// @desc Get all users
// @route GET /api/auth/users
// @access Private, Admin only
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

// @desc Get single user by ID
// @route GET /api/auth/user/:id
// @access Private (Admin or user owner)
exports.getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

// @desc Update user profile
// @route PUT /api/auth/user/update/:id
// @access Private (Admin or user owner)
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // Check if the user exists
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Check if the user is trying to update their own profile or an admin is updating a user
  const updatedData = {
    name: req.body.name || user.name,
    email: req.body.email || user.email,
    role: req.body.role || user.role,
  };

  await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  // Fetch the updated user data
  res.status(200).json({
    status: "success",
    data: updatedData,
  });
});

// @desc Delete own user account
// @route DELETE /api/auth/user/delete/:id
// @access Private (Owner only)
exports.deleteOwnAccount = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndDelete(userId);

  res.status(200).json({
    status: "success",
    message: "Account deleted successfully",
  });
});

// @desc update password own account
// @route PUT /api/auth/user/update-password/:id
// @access Private (Owner only)
exports.updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Both current and new passwords are required" });
  }

  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the current password matches the stored password
  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }

  // Hash the new password and update it
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedNewPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
  });
});
