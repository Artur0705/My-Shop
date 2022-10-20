const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config/connection.js");

const userRoute = require("./routes/userRoute.js");
const productRoute = require("./routes/productRoute.js");
const orderRoute = require("./routes/orderRoute.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});
