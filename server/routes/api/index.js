const express = require("express");

const router = express.Router();

const orderRoute = require("./orderRoute.js");
const productRoute = require("./productRoute.js");
// const uploadRoute = require("./uploadRoute.js");
const userRoute = require("./userRoute.js");

// router.use("/uploads", uploadRoute);
router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoute);

module.exports = router;
