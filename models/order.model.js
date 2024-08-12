const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
