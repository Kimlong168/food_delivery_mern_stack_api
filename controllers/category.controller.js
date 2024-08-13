const Category = require("../models/category.model");
const { successResponse } = require("../utils/responseHelpers");
const { uploadImage, replaceImage } = require("../utils/uploadImage");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    successResponse(res, categories, "Data retrieved successfully.");
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    successResponse(res, category, "Data retrieved successfully.");
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  const image = await uploadImage(req.file.path);

  const category = new Category({
    name: req.body.name,
    image: image.secure_url,
    description: req.body.description,
  });
  try {
    await category.save();
  } catch (err) {
    next(err);
  }
  successResponse(res, category, "Category created successfully");
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (req.file) {
      const image = await replaceImage(category.image, req.file.path);
      category.image = image.secure_url;
    }

    category.name = req.body.name;
    category.description = req.body.description;

    await category.save();
    successResponse(res, category, "Category updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
  } catch (err) {
    next(err);
  }
  successResponse(res, null, "Category deleted successfully");
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
