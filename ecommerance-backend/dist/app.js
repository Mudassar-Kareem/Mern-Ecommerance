import express from "express";
const port = process.env.PORT || 4000;
import UserRoute from "./routes/User.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middleware/error.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/orders.js";
import couponRoute from "./routes/coupon.js";
import dashboardRoute from "./routes/stats.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";
config({
    path: "./.env"
});
const Url = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
connectDB(Url);
export const nodeCache = new NodeCache();
export const stripe = new Stripe(stripeKey);
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("Api is runnung");
});
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", couponRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is running  on http://localhost:${port}`);
});
