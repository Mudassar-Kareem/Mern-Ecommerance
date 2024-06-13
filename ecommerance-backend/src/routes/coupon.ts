import express from "express";
import { allCoupon, couponDelete, createPaymentIntent, discount, newCoupon } from "../controllers/coupon.js";
import { adminOnly } from "../middleware/auth.js";

const app = express.Router();
app.post("/create", createPaymentIntent);
app.post("/coupon/new",newCoupon);
app.get("/coupon/all",adminOnly,allCoupon);
app.delete("/coupon/:id", adminOnly, couponDelete)
app.get("/discount", discount)
export default app;