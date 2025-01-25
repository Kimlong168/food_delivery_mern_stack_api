const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const { authenticateToken } = require("../middlewares/authMiddleware");
const protectRoutes = require("../middlewares/protectRoutesMiddleware");

const {
  validateOrderBody,
  validationMiddleware,
} = require("../utils/validationHelpers");

router.get("/", authenticateToken, protectRoutes, orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post(
  "/",
  authenticateToken,
  validateOrderBody(),
  validationMiddleware,
  orderController.createOrder
);
router.put(
  "/:id",
  authenticateToken,
  protectRoutes,
  validateOrderBody(),
  validationMiddleware,
  orderController.updateOrder
);
router.delete(
  "/:id",
  authenticateToken,
  protectRoutes,
  orderController.deleteOrder
);

module.exports = router;
