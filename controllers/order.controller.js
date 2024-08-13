const Order = require("../models/order.model");

const { successResponse } = require("../utils/responseHelpers");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      .exec();
    successResponse(res, orders, "Data retrieved successfully.");
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product")
      .exec();
    successResponse(res, order, "Data retrieved successfully");
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  const order = new Order({
    user: req.body.user,
    products: req.body.products,
    totalPrice: req.body.totalPrice,
  });

  try {
    await order.save();
  } catch (err) {
    next(err);
  }

  successResponse(res, order, "Order created successfully");
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    // order.user = req.body.user;
    // order.products = req.body.products;
    // order.totalPrice = req.body.totalPrice;
    order.status = req.body.status;

    await order.save();
    successResponse(res, order, "Order updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
  } catch (err) {
    next(err);
  }
  successResponse(res, null, "Order deleted successfully");
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
