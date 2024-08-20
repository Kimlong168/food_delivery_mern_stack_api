const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");

const {
  validateUserBody,
  validationMiddleware,
} = require("../utils/validationHelpers");

router.post(
  "/register",
  validateUserBody(),
  validationMiddleware,
  authController.register
);

router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/refresh-token", authenticateToken, authController.refreshToken);

module.exports = router;
