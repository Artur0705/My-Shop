const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config/connection.js");
const route = require("./routes/index.js");

const app = express();

app.use(bodyParser.json());
app.use(route);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../FrontEnd/build")));
}

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/../client/build")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});
