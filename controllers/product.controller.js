const Product = require("../models/product.model");
const { successResponse } = require("../utils/responseHelpers");
const { uploadImage, replaceImage } = require("../utils/uploadImage");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category").exec();
    successResponse(res, products, "Data retrieved successfully.");
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .exec();
    successResponse(res, product, "Data retrieved successfully.");
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  const image = await uploadImage(req.file.path);

  const product = new Product({
    name: req.body.name,
    image: image.secure_url,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
  });

  try {
    await product.save();
  } catch (err) {
    next(err);
  }

  successResponse(res, product, "Product created successfully");
};

const updateProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);

    if (req.file) {
      const image = await replaceImage(product.image, req.file.path);
      product.image = image.secure_url;
    }
    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    await product.save();
  } catch (err) {
    next(err);
  }
  successResponse(res, product, "Product updated successfully");
};

const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
  } catch (err) {
    next(err);
  }
  successResponse(res, null, "Product deleted successfully");
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
