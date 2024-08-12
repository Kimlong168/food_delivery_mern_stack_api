const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./data/database");
const { blacklistedTokens } = require("./middlewares/authMiddleware");
const { errorResponse } = require("./utils/responseHelpers");

const categoryRoutes = require("./routers/category.routes");
const productRoutes = require("./routers/product.routes");
const orderRoutes = require("./routers/order.routes");
const userRoutes = require("./routers/user.routes");
const authRoutes = require("./routers/auth.routes");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, 500, "Something went wrong");
});

// Token blacklist cleanup
const BLACKLIST_CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour
setInterval(() => {
  blacklistedTokens.clear();
}, BLACKLIST_CLEANUP_INTERVAL);

db.connect(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
