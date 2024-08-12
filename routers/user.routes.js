const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const { authenticateToken } = require("../middlewares/authMiddleware");
const protectRoutes = require("../middlewares/protectRoutesMiddleware");

const {
  validateUserBody,
  validationMiddleware,
} = require("../utils/validationHelpers");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.put(
  "/:id",
  authenticateToken,
  validateUserBody(),
  validationMiddleware,
  userController.updateUser
);

router.delete(
  "/:id",
  authenticateToken,
  protectRoutes,
  userController.deleteUser
);

module.exports = router;
