const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");
const {
  validateProductBody,
  validationMiddleware,
} = require("../utils/validationHelpers");
const fileUploadValidation = require("../middlewares/fileUploadMiddleware");
const { authenticateToken } = require("../middlewares/authMiddleware");
const protectRoutes = require("../middlewares/protectRoutesMiddleware");
const { upload } = require("../data/service");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post(
  "/",
  authenticateToken,
  protectRoutes,
  upload.single("image"),
  fileUploadValidation,
  validateProductBody(),
  validationMiddleware,
  productController.createProduct
);
router.put(
  "/:id",
  authenticateToken,
  protectRoutes,
  upload.single("image"),
  validateProductBody(),
  validationMiddleware,
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticateToken,
  protectRoutes,
  productController.deleteProduct
);

module.exports = router;
