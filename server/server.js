import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
