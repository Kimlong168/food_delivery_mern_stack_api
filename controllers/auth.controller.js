const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseHelpers");
const { blacklistedTokens } = require("../middlewares/authMiddleware");
const { SECRET_KEY } = require("../config/config");

const register = async (req, res, next) => {
  // if already exists
  let existing;
  try {
    existing = await User.findOne({ email: req.body.email });
  } catch (err) {
    next(err);
  }

  if (existing) {
    return errorResponse(res, "User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  if (req.body.isAdmin) {
    userData.isAdmin = true;
  }

  const user = new User(userData);

  try {
    await user.save();
  } catch (err) {
    next(err);
  }

  successResponse(res, user, "User created successfully");
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, "User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return errorResponse(res, "Invalid password", 401);
  }

  // Create token
  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });

  successResponse(
    res,
    {
      user,
      token,
    },
    "User logged in successfully"
  );
};

const logout = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    blacklistedTokens.add(token);
    successResponse(res, null, "User logged out successfully");
  } else {
    errorResponse(res, "No token provided", 400);
  }
};

module.exports = { register, login, logout };
