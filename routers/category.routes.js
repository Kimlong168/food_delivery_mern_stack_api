const express = require("express");

const router = express.Router();
const { upload } = require("../data/service");
const { authenticateToken } = require("../middlewares/authMiddleware");
const protectRoutes = require("../middlewares/protectRoutesMiddleware");

const fileUploadValidation = require("../middlewares/fileUploadMiddleware");
const {
  validateCategoryBody,
  validationMiddleware,
} = require("../utils/validationHelpers");
const CategoryController = require("../controllers/category.controller");

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post(
  "/",
  authenticateToken,
  protectRoutes,
  // upload.single("image"),
  // fileUploadValidation,
  validateCategoryBody(),
  validationMiddleware,
  CategoryController.createCategory
);
router.put(
  "/:id",
  authenticateToken,
  protectRoutes,
  upload.single("image"),
  validateCategoryBody(),
  validationMiddleware,
  CategoryController.updateCategory
);
router.delete(
  "/:id",
  authenticateToken,
  protectRoutes,
  CategoryController.deleteCategory
);

module.exports = router;
