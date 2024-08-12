const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { successResponse } = require("../utils/responseHelpers");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    successResponse(res, users, "Data retrieved successfully.");
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    successResponse(res, user, "Data retrieved successfully.");
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User.findById(req.params.id);

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = hashedPassword;
    user.isAdmin = req.body.isAdmin;

    await user.save();
    successResponse(res, user, "User updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
  } catch (err) {
    next(err);
  }

  successResponse(res, null, "User deleted successfully");
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
