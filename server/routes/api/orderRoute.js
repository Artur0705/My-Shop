const express = require("express");
const Order = require("../../models/orderModel.js");
const { isAuth, isAdmin } = require("../../utils/auth.js");
const stripe = require("stripe")(process.env.STRIPE_KEY);
require("dotenv").config();
console.log(process.env.STRIPE_KEY);

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate("user");
  console.log(orders);
});
router.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

router.post("/", isAuth, async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id || null,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });

    const newOrderCreated = await newOrder.save();
    const products = newOrderCreated.orderItems || [];

    const line_items = [];
    for (let i = 0; i < products.length; i++) {
      console.log(products[i].image.split("/uploads"));
      const product = await stripe.products.create({
        name: products[i].name,
        description: products[i].description,
        images: [`${products[i].image}`],
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: products[i].price * 100,
        currency: "usd",
      });

      line_items.push({
        price: price.id,
        quantity: 1,
      });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/profile?received=${newOrderCreated._id}`,
      cancel_url: `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/`,
    });

    res.status(201).send({
      message: "New Order Created",
      data: newOrderCreated,
      session: session.url,
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "stripe",
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order Paid.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order not found." });
  }
});

module.exports = router;
