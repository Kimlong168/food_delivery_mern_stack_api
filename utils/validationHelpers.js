const { body, validationResult } = require("express-validator");

// Validation rules for category and product
const validateCategoryBody = () => {
  return [
    body("name").notEmpty().withMessage("Category name is required."),
    body("description").optional().isString(),
  ];
};

// Validation rules for product
const validateProductBody = () => {
  return [
    body("name").notEmpty().withMessage("Product name is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number."),
    body("category").notEmpty().withMessage("Product category is required."),
    body("description").optional().isString(),
  ];
};

// validation rules for order

const validateOrderBody = () => {
  return [
    body("user").notEmpty().withMessage("User are required."),
    body("products").notEmpty().withMessage("Products are required."),
    // body("products.*.product")
    //   .notEmpty()
    //   .withMessage("Product ID is required.")
    //   .isMongoId()
    //   .withMessage("Product ID must be a valid MongoID."),
    // body("products.*.quantity")
    //   .notEmpty()
    //   .withMessage("Product quantity is required.")
    //   .isInt({ gt: 0 })
    //   .withMessage("Product quantity must be a positive number."),
    body("totalPrice")
      .notEmpty()
      .withMessage("Total price is required.")
      .isFloat({ gt: 0 })
      .withMessage("Total price must be a positive number."),
  ];
};

// validation rules for user

const validateUserBody = () => {
  return [
    body("name").notEmpty().withMessage("Name is required."),
    body("email").notEmpty().withMessage("Email is required.").isEmail(),
    body("password").notEmpty().withMessage("Password is required."),
    body("isAdmin")
      .optional()
      .isBoolean()
      .withMessage("isAdmin must be a boolean."),
  ];
};

// Middleware to handle validation results
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      error: {
        code: "VALIDATION_ERROR",
        message: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      },
    });
  }
  next();
};

module.exports = {
  validateCategoryBody,
  validateProductBody,
  validationMiddleware,
  validateOrderBody,
  validateUserBody,
};
